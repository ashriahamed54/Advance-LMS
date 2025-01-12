"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { createCourse, getTutorCourses, getEnrolledStudents } from '@/lib/courseOperations'

export default function ManageCourses() {
  const [courses, setCourses] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadCourses()
    }
  }, [user])

  const loadCourses = async () => {
    if (user) {
      const tutorCourses = await getTutorCourses(user.id)
      const coursesWithStudents = await Promise.all(tutorCourses.map(async (course) => {
        const enrolledStudents = await getEnrolledStudents(course.id)
        return { ...course, enrolledStudents }
      }))
      setCourses(coursesWithStudents)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const newCourse = await createCourse({
        title,
        description,
      }, user.id)
      setCourses([...courses, newCourse])
      setTitle('')
      setDescription('')
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Manage Courses</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Create Course</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {courses.map((course: any) => (
                <li key={course.id} className="border-b pb-4">
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.description}</p>
                  <p className="mt-2">Enrollment Key: <span className="font-mono">{course.enrollmentKey}</span></p>
                  <div className="mt-2">
                    <h4 className="font-semibold">Enrolled Students:</h4>
                    <ul className="list-disc list-inside">
                      {course.enrolledStudents.map((student: any) => (
                        <li key={student.id}>{student.name}</li>
                      ))}
                    </ul>
                  </div>
                  <Button onClick={() => router.push(`/courses/${course.id}`)} className="mt-2">View Course</Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

