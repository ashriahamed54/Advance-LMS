"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type TutorProfileProps = {
  initialData: {
    name: string
    title: string
    email: string
    office: string
    courses: string[]
    officeHours: string[]
  }
}

export function TutorProfile({ initialData }: TutorProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(initialData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (index: number, value: string, field: 'courses' | 'officeHours') => {
    setProfileData(prev => {
      const newArray = [...prev[field]]
      newArray[index] = value
      return { ...prev, [field]: newArray }
    })
  }

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log('Saving profile:', profileData)
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage alt="Tutor" src="/avatars/tutor.png" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{profileData.name}</CardTitle>
          <CardDescription>{profileData.title}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={profileData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="office">Office</Label>
              <Input
                id="office"
                name="office"
                value={profileData.office}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Courses Taught</Label>
              {profileData.courses.map((course, index) => (
                <Input
                  key={index}
                  value={course}
                  onChange={(e) => handleArrayInputChange(index, e.target.value, 'courses')}
                />
              ))}
            </div>
            <div className="space-y-2">
              <Label>Office Hours</Label>
              {profileData.officeHours.map((hours, index) => (
                <Input
                  key={index}
                  value={hours}
                  onChange={(e) => handleArrayInputChange(index, e.target.value, 'officeHours')}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div>
              <h4 className="text-sm font-semibold mb-2">Courses Taught</h4>
              <ul className="list-disc list-inside space-y-1">
                {profileData.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Office Hours</h4>
              <ul className="list-disc list-inside space-y-1">
                {profileData.officeHours.map((hours, index) => (
                  <li key={index}>{hours}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Contact Information</h4>
              <p>Email: {profileData.email}</p>
              <p>Office: {profileData.office}</p>
            </div>
          </>
        )}
        <Button className="w-full" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
          {isEditing ? "Save Profile" : "Edit Profile"}
        </Button>
      </CardContent>
    </Card>
  )
}

