import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { Guestbook } from "./guestbook";
import { getServerSession } from "next-auth/next";

export default async function GuestbookPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  const comments = await prisma.comment.findMany({
    where: { parentId: null },
    include: {
      user: true,
      replies: {
        include: {
          user: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedComments = comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
    user: {
      name: comment.user.name || "Anonymous",
      image: comment.user.image || null,
    },
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      content: reply.content,
      createdAt: reply.createdAt.toISOString(),
      user: {
        name: reply.user.name || "Anonymous",
        image: reply.user.image || null,
      },
      replies: [],
    })),
  }));

  return (
    <Guestbook
      initialComments={formattedComments}
    />
  );
}
