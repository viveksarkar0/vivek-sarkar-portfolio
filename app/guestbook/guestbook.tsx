"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
// import { formatDistanceToNow } from "date-fns"
import { MessageCircle, Heart, Share2, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Comment = {
  id: string
  content: string
  createdAt: string
  user: {
    name: string | null
    image: string | null
  }
  replies?: Comment[]
}

type GuestbookProps = {
  initialComments: Comment[]
}

export function Guestbook({ initialComments }: GuestbookProps) {
  const [comments, setComments] = useState<Comment[]>(
    initialComments.map((comment) => ({
      ...comment,
      replies: comment.replies || [],
    }))
  )

  const { data: session } = useSession()
  const [newComment, setNewComment] = useState("")
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({})
  const [showReplyInput, setShowReplyInput] = useState<Record<string, boolean>>({})
  const [likes, setLikes] = useState<Record<string, boolean>>({})
  const [visibleReplies, setVisibleReplies] = useState<Record<string, number>>({})

  const handleSubmit = async (e: React.FormEvent, parentId: string | null = null) => {
    e.preventDefault()
    const commentText = parentId ? replyInputs[parentId] : newComment

    if (!commentText.trim() || !session?.user) return

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentText, parentId }),
      })

      if (response.ok) {
        const newCommentData = await response.json()
        setComments((prev) =>
          parentId
            ? prev.map((c) =>
                c.id === parentId
                  ? { ...c, replies: [...(c.replies || []), newCommentData] }
                  : c
              )
            : [newCommentData, ...prev]
        )
        
        // Clear the input after successful submission
        if (parentId) {
          setReplyInputs((prev) => ({ ...prev, [parentId]: "" }))
          setShowReplyInput((prev) => ({ ...prev, [parentId]: false }))
        } else {
          setNewComment("")
        }
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
    }
  }

  const toggleLike = (commentId: string) => {
    setLikes((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
  }

  const loadMoreReplies = (commentId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 2) + 2,
    }))
  }

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`border-b border-gray-100 dark:border-gray-800 p-4 ${isReply ? "ml-12" : ""}`}>
      <div className="flex gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={comment.user.image || "/default-avatar.png"} alt={comment.user.name || "Guest"} />
          <AvatarFallback>{comment.user.name?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{comment.user.name || "Guest"}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">·</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {/* {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })} */}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
                {session?.user && <DropdownMenuItem>Report</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="mt-2 text-gray-900 dark:text-gray-100">{comment.content}</p>
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={() => setShowReplyInput((prev) => ({ ...prev, [comment.id]: !prev[comment.id] }))}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Reply</span>
            </button>
            <button
              onClick={() => toggleLike(comment.id)}
              className={`flex items-center gap-2 ${
                likes[comment.id] ? "text-red-500" : "text-gray-500 hover:text-red-500"
              } transition-colors`}
            >
              <Heart className={`w-4 h-4 ${likes[comment.id] ? "fill-current" : ""}`} />
              <span className="text-sm">0</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          {showReplyInput[comment.id] && session?.user && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e, comment.id);
              }} 
              className="mt-4"
            >
              <div className="flex gap-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={session.user.image || "/default-avatar.png"} alt={session.user.name || "Guest"} />
                  <AvatarFallback>{session.user.name?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Post your reply"
                    value={replyInputs[comment.id] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setReplyInputs((prev) => ({
                        ...prev,
                        [comment.id]: value
                      }));
                    }}
                    className="min-h-[80px] resize-none bg-gray-100 dark:bg-gray-800 border-none rounded-lg p-2"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowReplyInput((prev) => ({ ...prev, [comment.id]: false }));
                        setReplyInputs((prev) => ({ ...prev, [comment.id]: "" }));
                      }}
                      className="rounded-full text-gray-500 hover:text-blue-500"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={!replyInputs[comment.id]?.trim()}
                      className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
          {Array.isArray(comment.replies) && comment.replies.length > 0 && (
            <div className="mt-2">
              {comment.replies.slice(0, visibleReplies[comment.id] || 2).map((reply) => (
                <CommentComponent key={reply.id} comment={reply} isReply />
              ))}
              {comment.replies.length > (visibleReplies[comment.id] || 2) && (
                <button
                  onClick={() => loadMoreReplies(comment.id)}
                  className="text-blue-500 hover:underline mt-2"
                >
                  Load more replies
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-950">
        {session?.user ? (
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <div className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={session.user.image || "/default-avatar.png"} alt={session.user.name || "Guest"} />
                  <AvatarFallback>{session.user.name?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="What's on your mind?"
                    value={newComment}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewComment(value);
                    }}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <Button 
                      type="submit" 
                      disabled={!newComment.trim()}
                      className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-4 text-center border-b border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400">Sign in to join the conversation.</p>
          </div>
        )}
        <div>
          {comments.length > 0 ? (
            comments.map((comment) => <CommentComponent key={comment.id} comment={comment} />)
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No comments yet. Start the conversation!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}