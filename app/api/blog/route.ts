import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// シングルトンパターンでPrismaClientを初期化
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({message: "Success", posts}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();

    await main();
    const post = await prisma.post.create({data: {title, description}});
    return NextResponse.json({message: "Success", post}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 