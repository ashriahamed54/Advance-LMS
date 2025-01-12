"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"

type Discussion = {
  id: number
  courseId: number
  title: string
  author: string
  content: string
  messages: Message[]
}

type Message = {
  id: number
  author: string
  content: string
}

type ForumsProps = {
  courseId: number
}

export function Forums({ courseId }: ForumsProps) {
  const { user } = useAuth()
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("")
  const [newDiscussionContent, setNewDiscussionContent] = useState("")
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const handleCreateDiscussion = () => {
    if (newDiscussionTitle && newDiscussionContent && user) {
      const newDiscussion: Discussion = {
        id: discussions.length + 1,
        courseId,
        title: newDiscussionTitle,
        author: user.name,
        content: newDiscussionContent,
        messages: []
      }
      setDiscussions([...discussions, newDiscussion])
      setNewDiscussionTitle("")
      setNewDiscussionContent("")
    }
  }

  const handleSendMessage = () => {
    if (newMessage && user && selectedDiscussion) {
      const newMessageObj: Message = {
        id: selectedDiscussion.messages.length + 1,
        author: user.name,
        content: newMessage
      }
      setDiscussions(discussions.map(disc => 
        disc.id === selectedDiscussion.id 
          ? { ...disc, messages: [...disc.messages, newMessageObj] }
          : disc
      ))
      setNewMessage("")
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
              <Button variant="outline" onClick={() => setSelectedDiscussion(discussion)}>
                View Discussion
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedDiscussion && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedDiscussion.title}</CardTitle>
            <CardDescription>Messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDiscussion.messages.map((message) => (
              <div key={message.id} className="border-b pb-2">
                <p className="font-semibold">{message.author}</p>
                <p>{message.content}</p>
              </div>
            ))}
            <div className="space-y-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows={2}
              />
              <Button onClick={handleSendMessage}>Send Message</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

