import { PrismaClient } from "@prisma/client";

// シングルトンパターンでPrismaClientを初期化
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function connectDB() {
  try {
    await prisma.$connect();
  } catch (error) {
    throw new Error("DB接続に失敗しました");
  }
}

export { prisma };