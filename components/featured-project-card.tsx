"use client"

import { DEFAULT_IMAGES, type Project } from "@/data/projects-data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

interface FeaturedProjectCardProps {
  project: Project
  onViewDetails: (project: Project) => void
}

export function FeaturedProjectCard({ project, onViewDetails }: FeaturedProjectCardProps) {
  // For featured projects, always use the specific project image
  const imageUrl = project.image || DEFAULT_IMAGES[project.category] || "/placeholder.svg?height=400&width=600"

  return (
    <Card className="card-hover h-full flex flex-col">
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{project.title}</CardTitle>
          <Badge variant="secondary">Featured</Badge>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mt-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 5 && <Badge variant="outline">+{project.technologies.length - 5}</Badge>}
        </div>
      </CardContent>
      <CardFooter className="pt-4 mt-auto flex justify-between">
        <Button onClick={() => onViewDetails(project)}>View Details</Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          {project.liveUrl && (
            <Button variant="outline" size="icon" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View Demo</span>
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

