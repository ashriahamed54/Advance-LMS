import { StudentProfile } from "@/components/student-profile"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function StudentProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Student Profile</h1>
      <StudentProfile />
      <div className="mt-6">
        <Link href="/forums">
          <Button>View Forums</Button>
        </Link>
      </div>
    </div>
  )
}

