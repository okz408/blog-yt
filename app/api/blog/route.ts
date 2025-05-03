import { prisma, connectDB } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const posts = await prisma.post.findMany();
    return NextResponse.json({message: "Success", posts}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const { title, description } = await req.json();

    await connectDB();
    const post = await prisma.post.create({data: {title, description}});
    return NextResponse.json({message: "Success", post}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 