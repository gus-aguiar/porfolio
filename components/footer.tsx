import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              <span className="gradient-text">Gustavo Aguiar</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Full Stack Developer</p>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="https://github.com/gus-aguiar" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com/in/gustavo-p-m-aguiar/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#contact" rel="noopener noreferrer">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>

            <span className="sr-only">Email (unavailable)</span>
          </div>

          <div className="text-sm text-muted-foreground">&copy; {currentYear} Gustavo Aguiar. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

