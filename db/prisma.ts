// db/prisma.ts
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import ws from "ws";

// Load environment variables
dotenv.config();

// Ensure WebSocket is set for Neon in Node.js
neonConfig.webSocketConstructor = ws;

// Check for DATABASE_URL
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env");
}

// Create adapter
const adapter = new PrismaNeon({ connectionString });

// Prevent multiple PrismaClient instances in dev
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prismaClient = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});

export const prisma = globalForPrisma.prisma ?? prismaClient;

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }
