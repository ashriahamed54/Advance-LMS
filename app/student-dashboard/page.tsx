"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpenIcon, MessageSquareIcon, FileIcon } from 'lucide-react'
import { Chatbot } from "@/components/chatbot"
import { Calendar } from "@/components/calendar"
import { Discussions } from "@/components/discussions"
import { useAuth } from "@/lib/auth-context"
import { getStudentCourses, enrollStudent } from '@/lib/courseOperations'

export default function StudentDashboard() {
  const { user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [enrollmentKey, setEnrollmentKey] = useState('')
  const [enrollmentError, setEnrollmentError] = useState('')

  useEffect(() => {
    if (user) {
      loadCourses()
    }
  }, [user])

  const loadCourses = async () => {
    if (user) {
      const studentCourses = await getStudentCourses(user.id)
      setEnrolledCourses(studentCourses)
    }
  }

  const handleEnroll = async () => {
    if (user) {
      try {
        const enrolledCourse = await enrollStudent(enrollmentKey, user.id)
        setEnrolledCourses([...enrolledCourses, enrolledCourse])
        setEnrollmentKey('')
        setEnrollmentError('')
      } catch (error) {
        setEnrollmentError(error.message)
      }
    }
  }

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
              {enrolledCourses.map(course => (
                <li key={course.id}>
                  <Link href={`/courses/${course.id}`} className="text-blue-600 hover:text-blue-800 hover:underline flex items-center">
                    <BookOpenIcon className="mr-2 h-4 w-4" />
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2">
              <Input
                placeholder="Enter enrollment key"
                value={enrollmentKey}
                onChange={(e) => setEnrollmentKey(e.target.value)}
              />
              <Button onClick={handleEnroll}>Enroll in Course</Button>
              {enrollmentError && <p className="text-red-500 text-sm">{enrollmentError}</p>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {enrolledCourses.flatMap(course => 
                course.assignments.map(assignment => (
                  <li key={`${course.id}-${assignment.id}`} className="flex justify-between items-center">
                    <span>{course.title}: {assignment.title}</span>
                    <Badge variant="secondary">{assignment.dueDate}</Badge>
                  </li>
                ))
              )}
            </ul>
            <div className="mt-4">
              <Button variant="outline">View All Assignments</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MessageSquareIcon className="mr-2 h-4 w-4" />
                <span>New forum post in {enrolledCourses[0]?.title}</span>
              </li>
              <li className="flex items-center">
                <FileIcon className="mr-2 h-4 w-4" />
                <span>File uploaded in {enrolledCourses[1]?.title}</span>
              </li>
            </ul>
            <div className="mt-4">
              <Button variant="outline">View All Activity</Button>
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
            <CardTitle>AI Tutor</CardTitle>
          </CardHeader>
          <CardContent>
            <Chatbot />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Discussions</CardTitle>
          <CardDescription>Engage with your peers</CardDescription>
        </CardHeader>
        <CardContent>
          <Discussions />
        </CardContent>
      </Card>
    </div>
  )
}

