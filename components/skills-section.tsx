"use client"

import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SkillsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories = [
    {
      id: "frontend",
      name: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Astro", level: 75 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "Styled Components", level: 80 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Redux", level: 80 },
        { name: "Context API", level: 85 },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 85 },
        { name: "Python", level: 75 },
        { name: "Django", level: 70 },
        { name: "RESTful APIs", level: 90 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "MySQL", level: 85 },
        { name: "Sequelize", level: 80 },
        { name: "Prisma", level: 85 },
        { name: "JWT Authentication", level: 85 },
      ],
    },
    {
      id: "tools",
      name: "DevOps & Tools",
      skills: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 90 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Jest", level: 85 },
        { name: "CI/CD", level: 75 },
        { name: "Linux", level: 80 },
        { name: "Agile/Scrum", level: 85 },
        { name: "Kanban", level: 90 },
        { name: "Design Patterns", level: 80 },
        { name: "Clean Code", level: 85 },
      ],
    },
  ]

  return (
    <section id="skills" className="section-padding bg-muted/30">
      <div ref={ref} className={`max-w-4xl mx-auto ${inView ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="section-title">My Skills</h2>
        <p className="section-subtitle">Technologies and tools I use to create efficient solutions</p>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {skillCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {skillCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.skills.map((skill, index) => (
                      <div key={skill.name} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${inView ? skill.level : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

