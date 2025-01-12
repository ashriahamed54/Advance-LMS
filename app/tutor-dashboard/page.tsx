"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpenIcon, MessageSquareIcon, UsersIcon, PlusCircle } from 'lucide-react'
import { Calendar } from "@/components/calendar"
import { useAuth } from "@/lib/auth-context"
import { courseData } from '@/lib/course-data'

export default function TutorDashboard() {
  const { user } = useAuth()
  const [taughtCourses, setTaughtCourses] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchTaughtCourses = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTaughtCourses(Object.values(courseData).filter(course => course.instructorId === user?.id))
    }

    if (user) {
      fetchTaughtCourses()
    }
  }, [user])

  if (!user) return null

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {taughtCourses.map(course => (
                <li key={course.id}>
                  <Link href={`/courses/${course.id}`} className="text-blue-600 hover:text-blue-800 hover:underline flex items-center">
                    <BookOpenIcon className="mr-2 h-4 w-4" />
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2">
              <Button variant="outline" onClick={() => router.push('/tutor/manage-courses')}>Manage Courses</Button>
              <Button variant="outline" onClick={() => router.push('/tutor/add-assignment')}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Assignment
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {taughtCourses.flatMap(course => 
                course.assignments.map(assignment => (
                  <li key={`${course.id}-${assignment.id}`} className="flex justify-between items-center">
                    <span>{course.title}: {assignment.title}</span>
                    <Badge variant="secondary">15 submissions</Badge>
                  </li>
                ))
              )}
            </ul>
            <div className="mt-4">
              <Button variant="outline" onClick={() => router.push('/tutor/all-assignments')}>View All Assignments</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Student Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MessageSquareIcon className="mr-2 h-4 w-4" />
                <span>New question in {taughtCourses[0]?.title} forum</span>
              </li>
              <li className="flex items-center">
                <MessageSquareIcon className="mr-2 h-4 w-4" />
                <span>Office hour request for {taughtCourses[1]?.title}</span>
              </li>
            </ul>
            <div className="mt-4">
              <Button variant="outline" onClick={() => router.push('/tutor/all-queries')}>View All Queries</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Manage your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Course Analytics</CardTitle>
            <CardDescription>Student performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {taughtCourses.map(course => (
                <li key={course.id} className="flex items-center">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  <span>{course.title}: {course.progress}% average progress</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="outline" onClick={() => router.push('/tutor/course-analytics')}>View Detailed Analytics</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

