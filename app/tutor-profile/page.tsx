"use client"

import { TutorProfile } from "@/components/tutor-profile"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const initialData = {
  name: "Dr. Jane Smith",
  title: "Professor of Computer Science",
  email: "jane.smith@university.edu",
  office: "Room 301, Computer Science Building",
  courses: [
    "Introduction to Computer Science",
    "Advanced Algorithms",
    "Machine Learning Fundamentals"
  ],
  officeHours: [
    "Monday: 2:00 PM - 4:00 PM",
    "Wednesday: 10:00 AM - 12:00 PM",
    "Friday: 1:00 PM - 3:00 PM"
  ]
}

export default function TutorProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Tutor Profile</h1>
      <TutorProfile initialData={initialData} />
      <div className="mt-6">
        <Link href="/forums">
          <Button>View Forums</Button>
        </Link>
      </div>
    </div>
  )
}

