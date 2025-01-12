import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const courses = [
  { id: 1, title: 'Introduction to Computer Science', instructor: 'Dr. Smith' },
  { id: 2, title: 'Web Development Fundamentals', instructor: 'Prof. Johnson' },
  { id: 3, title: 'Data Structures and Algorithms', instructor: 'Dr. Williams' },
]

export default function Courses() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/courses/${course.id}`} className="text-blue-600 hover:underline">
                  {course.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Instructor: {course.instructor}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

