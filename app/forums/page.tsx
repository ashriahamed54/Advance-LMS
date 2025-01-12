import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquareIcon } from 'lucide-react'

export default function ForumsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Forums</h1>
        <Button>Create New Topic</Button>
      </div>
      <div className="flex space-x-4">
        <Input placeholder="Search forums..." className="max-w-sm" />
        <Button variant="outline">Search</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Discussions</CardTitle>
          <CardDescription>Join the conversation with your peers</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start space-x-4">
              <MessageSquareIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <Link href="/forums/1" className="font-medium text-blue-600 hover:underline">
                  Tips for Effective Online Learning
                </Link>
                <p className="text-sm text-muted-foreground">Started by Alice Johnson • 12 replies • Last post 2 hours ago</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <MessageSquareIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <Link href="/forums/2" className="font-medium text-blue-600 hover:underline">
                  Career Opportunities in Computer Science
                </Link>
                <p className="text-sm text-muted-foreground">Started by Bob Smith • 8 replies • Last post 1 day ago</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <MessageSquareIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <Link href="/forums/3" className="font-medium text-blue-600 hover:underline">
                  Troubleshooting Common Coding Errors
                </Link>
                <p className="text-sm text-muted-foreground">Started by Charlie Brown • 15 replies • Last post 3 days ago</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

