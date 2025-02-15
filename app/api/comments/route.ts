import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/app/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const { content, parentId } = await req.json();

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        userId,
        parentId: parentId || null, // Allow replies
      },
      include: {
        user: true,
        replies: true, // Use the correct field name
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const comments = await prisma.comment.findMany({
      where: { parentId: null }, // Fetch only top-level comments
      include: {
        user: true,
        replies: { // Fetch replies
          include: {
            user: true,
            // Remove likes if not part of Reply
          },
        },
        likes: {
          include: {
            user: true, // Include users who liked the comment
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}