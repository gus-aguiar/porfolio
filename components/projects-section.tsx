"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { getFeaturedProjects, type Project } from "@/data/projects-data"
import { FeaturedProjectCard } from "@/components/featured-project-card"
import { ProjectDetailsDialog } from "@/components/project-details-dialog"
import Link from "next/link"

export function ProjectsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const featuredProjects = getFeaturedProjects()

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    setIsDetailsOpen(true)
  }

  return (
    <section id="projects" className="section-padding">
      <div ref={ref} className={`max-w-6xl mx-auto ${inView ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Check out some of my main projects</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} onViewDetails={handleViewDetails} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button size="lg" className="rounded-full">
              View All Projects
            </Button>
          </Link>
        </div>

        <ProjectDetailsDialog
          project={selectedProject}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      </div>
    </section>
  )
}

