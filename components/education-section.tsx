"use client"

import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Education = {
  id: string
  institution: string
  degree: string
  period: string
  location: string
  description?: string
}

type Course = {
  id: string
  title: string
  institution: string
  certificate?: string
}

export function EducationSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const education: Education[] = [
    {
      id: "trybe",
      institution: "Trybe",
      degree: "Full Stack Web Development",
      period: "2023 - 2023",
      location: "Remote",
      description:
        "1,500 hours of classes focusing on: Introduction to software development, front-end, back-end, computer science, software engineering, agile methodologies, and behavioral skills.",
    },
    {
      id: "unisul",
      institution: "UNISUL",
      degree: "Bachelor's Degree in Cinema",
      period: "2013 - 2022",
      location: "On-site",
    },
  ]

  const courses: Course[] = [
    {
      id: "html",
      title: "HTML Essential Training",
      institution: "LinkedIn Learning",
    },
    {
      id: "web-dev",
      title: "Succeeding in Web Development: Full Stack and Front End",
      institution: "LinkedIn Learning",
    },
    {
      id: "databases",
      title: "Programming Foundations: Databases",
      institution: "LinkedIn Learning",
    },
    {
      id: "css-grid",
      title: "CSS: Building Layouts with Grid",
      institution: "Alura",
    },
    {
      id: "css-flexbox",
      title: "CSS: Flexbox and Responsive Layouts",
      institution: "Alura",
    },
  ]

  return (
    <section id="education" className="section-padding">
      <div ref={ref} className={`max-w-4xl mx-auto ${inView ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">My academic background and complementary courses</p>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Academic Education</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card
                  key={edu.id}
                  className={`card-hover ${inView ? "animate-slide-up" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div>
                        <CardTitle className="text-xl">{edu.degree}</CardTitle>
                        <CardDescription className="text-lg font-medium">{edu.institution}</CardDescription>
                      </div>
                      <div className="flex flex-col items-start md:items-end">
                        <span className="text-sm text-muted-foreground">{edu.period}</span>
                        <Badge variant="outline" className="mt-1">
                          {edu.location}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  {edu.description && (
                    <CardContent>
                      <p>{edu.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Complementary Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course, index) => (
                <Card
                  key={course.id}
                  className={`card-hover ${inView ? "animate-slide-up" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.institution}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

