export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Ecom";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Ecom is a modern e-commerce platform built with Next.js and React.";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: "user@example.com",
  password: "123456",
};

export const signUpDefaultValues = {
  name: "Sumon",
  email: "mkhancse@gmail.com",
  password: "123456",
  confirmPassword: "123456",
};
