"use client"

import { DEFAULT_IMAGES, type Project } from "@/data/projects-data"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar } from "lucide-react"
import Link from "next/link"

interface ProjectDetailsDialogProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailsDialog({ project, isOpen, onClose }: ProjectDetailsDialogProps) {
  if (!project) return null

  // Use the project image if it exists, otherwise use the default image for the category
  const imageUrl = project.image || DEFAULT_IMAGES[project.category] || "/placeholder.svg?height=400&width=600"

  // Format the date (assuming YYYY-MM format)
  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <DialogDescription className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(project.date)}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="aspect-video w-full overflow-hidden rounded-md mb-6">
            <img src={imageUrl || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{project.longDescription || project.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Category</h3>
              <Badge variant="outline" className="capitalize">
                {project.category === "fullstack" ? "Full Stack" : project.category}
              </Badge>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button asChild>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>

              {project.liveUrl && (
                <Button variant="outline" asChild>
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

