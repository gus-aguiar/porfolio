"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Full Stack Developer"
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)
      return () => clearInterval(timeout)
    }
  }, [typedText])

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 py-20">
      <div className="max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hello, I'm <span className="gradient-text">Gustavo Aguiar</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 h-10">
          {typedText}
          <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}>|</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up">
          Developer focused on creating scalable and innovative web solutions. Strong experience in React, Node.js, and
          relational and non-relational databases.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Link href="#projects">
            <Button size="lg" className="rounded-full">
              View Projects
            </Button>
          </Link>
          <Link href="#contact">
            <Button size="lg" variant="outline" className="rounded-full">
              Contact Me
            </Button>
          </Link>
        </div>

        <div className="flex justify-center gap-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Link href="https://github.com/gus-aguiar" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full h-12 w-12">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/gustavo-p-m-aguiar/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full h-12 w-12">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="#contact">
            <Button variant="ghost" size="icon" className="rounded-full h-12 w-12">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </div>
      </div>


    </section>
  )
}

