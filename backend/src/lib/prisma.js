import { PrismaClient } from "../generated/prisma/index.js";

// Singleton pattern for PrismaClient to avoid multiple instances in dev.
// In development, Next.js / Node --watch hot-reloads modules, so without
// this guard a new PrismaClient is created on every reload, exhausting
// connection limits.

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
