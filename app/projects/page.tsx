"use client"

import { useState } from "react"
import { getAllProjects, getAllTechnologies, getProjectsByCategory, type Project } from "@/data/projects-data"
import { ProjectCard } from "@/components/project-card"
import { ProjectDetailsDialog } from "@/components/project-details-dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])

  const allProjects = getAllProjects()
  const allTechnologies = getAllTechnologies()

  // Filter projects by category
  const projectsByCategory = getProjectsByCategory(activeCategory)

  // Filter by search term and selected technologies
  const filteredProjects = projectsByCategory.filter((project) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by selected technologies
    const matchesTech =
      selectedTechnologies.length === 0 || selectedTechnologies.every((tech) => project.technologies.includes(tech))

    return matchesSearch && matchesTech
  })

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    setIsDetailsOpen(true)
  }

  const handleTechnologyToggle = (tech: string) => {
    setSelectedTechnologies((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTechnologies([])
    setActiveCategory("all")
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">My Projects</h1>
      <p className="text-xl text-muted-foreground mb-8">Explore all my development projects</p>

      <div className="mb-8 space-y-4">
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Filter by technology:</span>
          <div className="flex flex-wrap gap-2">
            {allTechnologies.map((tech) => (
              <Badge
                key={tech}
                variant={selectedTechnologies.includes(tech) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTechnologyToggle(tech)}
              >
                {tech}
                {selectedTechnologies.includes(tech) && <X className="ml-1 h-3 w-3" />}
              </Badge>
            ))}
          </div>
          {(searchTerm || selectedTechnologies.length > 0 || activeCategory !== "all") && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-2">
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more projects.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onViewDetails={handleViewDetails} />
          ))}
        </div>
      )}

      <ProjectDetailsDialog project={selectedProject} isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
    </div>
  )
}

