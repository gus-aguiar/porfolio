"use client"

import type React from "react"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Usar a chave de acesso do Web3Forms
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY"

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          from_name: "Portfolio Contact Form",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitSuccess(true)
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      } else {
        throw new Error(data.message || "Something went wrong")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div ref={ref} className={`max-w-6xl mx-auto ${inView ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle">Have a project in mind or want to chat? Get in touch with me!</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className={`lg:col-span-2 card-hover ${inView ? "animate-slide-in-left" : "opacity-0"}`}>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Message subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                {submitSuccess && (
                  <p className="text-green-500 text-center animate-fade-in">
                    Message sent successfully! Thank you for contacting me.
                  </p>
                )}
                {submitError && <p className="text-red-500 text-center animate-fade-in">{submitError}</p>}
              </form>
            </CardContent>
          </Card>

          <Card className={`card-hover ${inView ? "animate-slide-in-right" : "opacity-0"}`}>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Other ways to get in touch with me</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <p className="text-sm bg-muted/50 px-2 py-1 rounded blur-sm select-none">example@email.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Phone</h3>
                  <p className="text-sm bg-muted/50 px-2 py-1 rounded blur-sm select-none">+55 (00) 00000-0000</p>
                </div>
              </div>

              <div className="mt-4 p-3 border border-muted rounded-md bg-muted/20">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Note:</span> To get my email or phone number, please contact me directly
                  via LinkedIn or GitHub.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-4">Social Media</h3>
                <div className="flex space-x-4">
                  <Link href="https://github.com/gus-aguiar" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link href="https://linkedin.com/in/gustavo-p-m-aguiar/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  {/* <Link href="mailto:gustavopma90@gmail.com">
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </Link> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

