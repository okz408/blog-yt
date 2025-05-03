import { NextRequest, NextResponse } from "next/server";
import { prisma, connectDB } from "@/lib/prismaClient";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const posts = await prisma.post.findFirst({
      where: {id: parseInt(req.url.split("/blog/")[1])}
    });
    return NextResponse.json({message: "Success", posts}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    const { title, description } = await req.json();

    await connectDB();
    const posts = await prisma.post.update({
      where: {id: parseInt(req.url.split("/blog/")[1])},
      data: { title, description }
    });
    return NextResponse.json({message: "Success", posts}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    await connectDB();
    const posts = await prisma.post.delete({
      where: {id: parseInt(req.url.split("/blog/")[1])}
    });
    return NextResponse.json({message: "Success", posts}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}