"use server";

import { PAGE_SIZE } from "./../constants/index";
import { PrismaClient } from "@prisma/client";
//import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { formatError } from "../utils";
import { revalidatePath } from "next/cache";
import { insertProductSchema, updateProductSchema } from "../validators";
import z from "zod";
const prisma = new PrismaClient();

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  //return convertToPlainObject(data);

  return data.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: {
      slug: slug,
    },
  });
}

export async function getAllProducts({
  query,
  page,
  limit = PAGE_SIZE,
  category,
}: {
  query: string;
  page: number;
  limit?: number;
  category?: string;
}) {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const productExist = await prisma.product.findFirst({
      where: { id: id },
    });

    if (!productExist) throw new Error("Product not found");

    await prisma.product.delete({
      where: { id: id },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product successfully deleted",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Create a product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);
    await prisma.product.create({ data: product });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) throw new Error("Product not found");

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
