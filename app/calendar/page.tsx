import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Calendar</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Schedule</CardTitle>
          <CardDescription>Manage your classes and events</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>CS101 Lecture</span>
              <span className="text-muted-foreground">Today, 2:00 PM</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Web Dev Workshop</span>
              <span className="text-muted-foreground">Tomorrow, 10:00 AM</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Project Deadline</span>
              <span className="text-muted-foreground">June 15, 11:59 PM</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

