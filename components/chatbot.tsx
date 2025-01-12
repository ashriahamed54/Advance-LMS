"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I assist you with your studies today?" }
  ])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }])
      setInput("")

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(input)
        setMessages(prev => [...prev, { role: "bot", content: aiResponse }])
      }, 1000)
    }
  }

  const generateAIResponse = (userInput: string) => {
    // This is a simple mock-up of AI response generation
    const responses = [
      "That's an interesting question. Have you considered...",
      "Based on the course material, I would suggest...",
      "Let's break this down step by step...",
      "Great question! The key concept here is...",
      "I'd recommend reviewing the section on... Does that help?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">AI Tutor</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
              <div className={`rounded-lg p-2 max-w-[80%] ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

