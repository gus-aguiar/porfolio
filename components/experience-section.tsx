"use client"

import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Experience = {
  id: string
  company: string
  position: string
  period: string
  location: string
  type: string
  description: string[]
  technologies: string[]
}

export function ExperienceSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences: Experience[] = [
    {
      id: "beesix",
      company: "Beesix",
      position: "Full Stack Software Developer",
      period: "JAN 2024 – OCT 2024",
      location: "On-site",
      type: "Full-time",
      description: [
        "Refactored critical functionalities using design patterns, resulting in cleaner and more maintainable code, improving system scalability.",
        "Developed new features such as modals, dashboards, and tables, optimizing the user experience in pet service management.",
        "Worked on a multi-tenant system, managing multiple PostgreSQL databases to meet the specific needs of five different municipalities.",
        "Implemented improvements in responsiveness and response times, ensuring greater efficiency for end users.",
        "Collaborated in a lean team using agile methodologies (Scrum and Kanban), delivering high-complexity solutions efficiently and on time.",
      ],
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "Docker",
        "AWS",
        "Jest",
        "Sequelize",
        "CSS",
        "HTML5",
        "JavaScript",
      ],
    },
    {
      id: "trybe",
      company: "Trybe",
      position: "Full Stack Software Developer - Instruction Monitor",
      period: "AUG 2023 – JAN 2024",
      location: "Remote",
      type: "Full-time",
      description: [
        "Acted as a technical mentor, conducting individual and group monitoring sessions to reinforce students' learning of advanced backend concepts such as Node.js, Express, and TypeScript.",
        "Facilitated students' technical development through active support via Slack and practical sessions on technologies such as MySQL, Sequelize, and React.",
        "Structured and taught classes on object-oriented programming (OOP), unit testing with Jest, and development best practices.",
        "Promoted a collaborative learning environment, helping students solve complex problems and build confidence in their skills.",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React", "Redux", "Node.js", "SQL", "MongoDB", "Sequelize", "Prisma"],
    },
    {
      id: "freelancer",
      company: "Freelancer",
      position: "Video Editor and Sound Technician",
      period: "FEB 2012 – AUG 2023",
      location: "On-site and remote",
      type: "Freelance",
      description: [
        "Managed complex audiovisual projects, working with various advertising and film production companies, including recording and editing films, advertisements, and trailers, demonstrating skills in deadline management and coordination of creative teams.",
        "Developed transferable skills such as organization, creative problem solving, and effective communication.",
      ],
      technologies: ["Adobe Creative Cloud", "Ableton Live", "Final Cut Pro", "DaVinci Resolve"],
    },
  ]

  return (
    <section id="experience" className="section-padding bg-muted/30">
      <div ref={ref} className={`max-w-4xl mx-auto ${inView ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="section-title">Professional Experience</h2>
        <p className="section-subtitle">My professional journey and the skills I've developed along the way</p>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={exp.id}
              className={`card-hover ${inView ? "animate-slide-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <CardTitle className="text-xl">{exp.position}</CardTitle>
                    <CardDescription className="text-lg font-medium">{exp.company}</CardDescription>
                  </div>
                  <div className="flex flex-col items-start md:items-end">
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">{exp.location}</Badge>
                      <Badge variant="outline">{exp.type}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

