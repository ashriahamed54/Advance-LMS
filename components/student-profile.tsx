import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function StudentProfile() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage alt="Student" src="/avatars/student.png" />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>John Doe</CardTitle>
          <CardDescription>Computer Science Major</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>75%</span>
          </div>
          <Progress value={75} className="mt-2" />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Enrolled Courses</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Introduction to Computer Science</li>
            <li>Web Development Fundamentals</li>
            <li>Data Structures and Algorithms</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Upcoming Assignments</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>CS101 Quiz - Due in 2 days</li>
            <li>Web Dev Project - Due in 1 week</li>
          </ul>
        </div>
        <Button className="w-full">Edit Profile</Button>
      </CardContent>
    </Card>
  )
}

