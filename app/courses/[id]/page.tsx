"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpenIcon, FileTextIcon, MessageSquareIcon, UploadIcon, UsersIcon, PlusCircle } from 'lucide-react'
import { useAuth } from "@/lib/auth-context"
import { courseData } from '@/lib/course-data'
import { FileUpload } from "@/components/file-upload"
import { Forums } from "@/components/forums"
import { useRouter } from 'next/navigation'
import { getEnrolledStudents } from '@/lib/courseOperations'

export default function Course({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState(courseData[params.id as keyof typeof courseData])
  const [enrolledStudents, setEnrolledStudents] = useState<any[]>([])

  useEffect(() => {
    if (user?.role === 'tutor') {
      loadEnrolledStudents()
    }
  }, [user, params.id])

  const loadEnrolledStudents = async () => {
    const students = await getEnrolledStudents(params.id)
    setEnrolledStudents(students)
  }

  const handleSubmitAssignment = async (assignmentId: number, file: File) => {
    // Simulate API call to submit assignment
    await new Promise(resolve => setTimeout(resolve, 1000))
    setCourse(prevCourse => ({
      ...prevCourse,
      assignments: prevCourse.assignments.map(assignment =>
        assignment.id === assignmentId ? { ...assignment, submitted: true, file: file.name } : assignment
      )
    }))
    alert(`Assignment "${file.name}" uploaded successfully!`)
  }

  const handleGradeAssignment = async (assignmentId: number) => {
    // Simulate API call to grade assignment
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In a real app, you would update the assignment with the actual grade
    alert(`Assignment ${assignmentId} has been graded.`)
  }

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        {user?.role === "student" && <Button>Ask AI Tutor</Button>}
        {user?.role === "tutor" && <Button>Edit Course</Button>}
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
              <p className="font-medium">Progress: {course.progress}%</p>
            </div>
            <Progress value={course.progress} className="w-1/3" />
          </div>
          <p>{course.description}</p>
        </CardContent>
      </Card>
      <Tabs defaultValue="modules">
        <TabsList>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          {user?.role === "tutor" && <TabsTrigger value="students">Students</TabsTrigger>}
        </TabsList>
        <TabsContent value="modules">
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
              <CardDescription>Your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {course.modules.map((module) => (
                  <li key={module.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpenIcon className="mr-2 h-4 w-4" />
                      <Link href={`/courses/${params.id}/modules/${module.id}`} className="text-blue-600 hover:underline">
                        {module.title}
                      </Link>
                    </div>
                    {user?.role === "student" && module.completed && <span className="text-green-500">Completed</span>}
                    {user?.role === "tutor" && <Button size="sm">Edit</Button>}
                  </li>
                ))}
              </ul>
              {user?.role === "tutor" && (
                <Button className="mt-4">Add New Module</Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>Your tasks and quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {course.assignments.map((assignment) => (
                  <li key={assignment.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      <Link href={`/courses/${params.id}/assignments/${assignment.id}`} className="text-blue-600 hover:underline">
                        {assignment.title}
                      </Link>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                      {user?.role === "student" && (
                        assignment.submitted ? (
                          <div className="flex items-center">
                            <span className="text-green-500 mr-2">Submitted: {assignment.file}</span>
                            <FileUpload onUpload={(file) => handleSubmitAssignment(assignment.id, file)} />
                          </div>
                        ) : (
                          <FileUpload onUpload={(file) => handleSubmitAssignment(assignment.id, file)} />
                        )
                      )}
                      {user?.role === "tutor" && <Button size="sm" onClick={() => handleGradeAssignment(assignment.id)}>Grade</Button>}
                    </div>
                  </li>
                ))}
              </ul>
              {user?.role === "tutor" && (
                <div className="mt-4 flex justify-between items-center">
                  <Button onClick={() => router.push(`/tutor/add-assignment?courseId=${params.id}`)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Assignment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Course materials and documents</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {course.resources.map((resource) => (
                  <li key={resource.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      <Link href={`/courses/${params.id}/resources/${resource.id}`} className="text-blue-600 hover:underline">
                        {resource.title}
                      </Link>
                    </div>
                    <Button size="sm" variant="outline">
                      <UploadIcon className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </li>
                ))}
              </ul>
              {user?.role === "tutor" && (
                <Button className="mt-4">Upload New Resource</Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="discussions">
          <Card>
            <CardHeader>
              <CardTitle>Discussions</CardTitle>
              <CardDescription>Engage with your peers and instructors</CardDescription>
            </CardHeader>
            <CardContent>
              <Forums courseId={parseInt(params.id)} />
            </CardContent>
          </Card>
        </TabsContent>
        {user?.role === "tutor" && (
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
                <CardDescription>Manage and view student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {enrolledStudents.map((student) => (
                    <li key={student.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <UsersIcon className="mr-2 h-4 w-4" />
                        <span>{student.name}</span>
                      </div>
                      <Button size="sm">View Progress</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

