import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  // await prisma.cart.deleteMany();
  // await prisma.order.deleteMany();
  // await prisma.orderItem.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded with sample data");
}

main();
