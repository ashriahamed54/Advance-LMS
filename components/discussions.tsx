"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"

type Discussion = {
  id: number
  title: string
  author: string
  content: string
  replies: Reply[]
}

type Reply = {
  id: number
  author: string
  content: string
}

export function Discussions() {
  const { user } = useAuth()
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("")
  const [newDiscussionContent, setNewDiscussionContent] = useState("")

  const handleCreateDiscussion = () => {
    if (newDiscussionTitle && newDiscussionContent && user) {
      const newDiscussion: Discussion = {
        id: discussions.length + 1,
        title: newDiscussionTitle,
        author: user.name,
        content: newDiscussionContent,
        replies: []
      }
      setDiscussions([...discussions, newDiscussion])
      setNewDiscussionTitle("")
      setNewDiscussionContent("")
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Discussion</CardTitle>
          <CardDescription>Start a new topic for discussion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="discussion-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="discussion-title"
              value={newDiscussionTitle}
              onChange={(e) => setNewDiscussionTitle(e.target.value)}
              placeholder="Enter discussion title"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="discussion-content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="discussion-content"
              value={newDiscussionContent}
              onChange={(e) => setNewDiscussionContent(e.target.value)}
              placeholder="Enter discussion content"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateDiscussion}>Create Discussion</Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card key={discussion.id}>
            <CardHeader>
              <CardTitle>{discussion.title}</CardTitle>
              <CardDescription>Started by {discussion.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{discussion.content}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View Replies ({discussion.replies.length})</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

