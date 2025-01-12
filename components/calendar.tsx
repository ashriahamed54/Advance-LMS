"use client"

import { useState } from "react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Event = {
  date: Date
  title: string
}

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [newEventTitle, setNewEventTitle] = useState("")

  const handleAddEvent = () => {
    if (selectedDate && newEventTitle) {
      setEvents([...events, { date: selectedDate, title: newEventTitle }])
      setNewEventTitle("")
    }
  }

  return (
    <div className="space-y-4">
      <CalendarComponent
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Event</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-title" className="text-right">
                Event Title
              </Label>
              <Input
                id="event-title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </DialogContent>
      </Dialog>
      <div>
        <h3 className="font-semibold mb-2">Events:</h3>
        <ul className="space-y-1">
          {events.map((event, index) => (
            <li key={index}>
              {event.date.toDateString()}: {event.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

