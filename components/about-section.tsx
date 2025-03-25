"use client"

import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="section-padding">
      <div ref={ref} className={`max-w-4xl mx-auto ${inView ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          Full Stack Developer passionate about creating innovative and scalable web solutions
        </p>

        <Card className="card-hover">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-6 text-lg">
              <p>
                I'm a Full Stack Developer focused on creating scalable and innovative web solutions. I have strong
                experience in React, Node.js, and relational (MySQL) and non-relational (MongoDB, PostgreSQL) databases.
              </p>
              <p>
                I seek to apply my knowledge to build high-performance applications and contribute to the dynamic growth
                of the team. I value team collaboration and knowledge sharing, always bringing a positive impact to the
                projects I participate in.
              </p>
              <p>
                My previous experience as a video editor and sound technician provided me with transferable skills such
                as organization, creative problem solving, and effective communication, which I apply daily in software
                development.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Areas of Interest</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm py-1">
                  Web Development
                </Badge>
                <Badge variant="secondary" className="text-sm py-1">
                  Software Architecture
                </Badge>
                <Badge variant="secondary" className="text-sm py-1">
                  API Design
                </Badge>
                <Badge variant="secondary" className="text-sm py-1">
                  Databases
                </Badge>
                <Badge variant="secondary" className="text-sm py-1">
                  UI/UX
                </Badge>
                <Badge variant="secondary" className="text-sm py-1">
                  Agile Methodologies
                </Badge>
                <Badge variant="secondary" className="text-sm py-1">
                  Clean Code
                </Badge>
                <Badge variant="secondary" className="text-sm py-1">
                  Multi-tenant Systems
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

