"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field } from "@/components/shared/field"

// demo form, it only shows a toast and does not send an email
export function ContactForm() {
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        setLoading(true)
        setTimeout(() => {
            toast.success("Message sent", { description: "We will get back to you soon." })
            form.reset()
            setLoading(false)
        }, 600)
    }

    return (
        <form onSubmit={handleSubmit} className="card-soft space-y-5 p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" htmlFor="contact-name">
                    <Input id="contact-name" required className="h-11" />
                </Field>
                <Field label="Email" htmlFor="contact-email">
                    <Input id="contact-email" type="email" required className="h-11" />
                </Field>
            </div>
            <Field label="Message" htmlFor="contact-message">
                <Textarea id="contact-message" rows={5} required />
            </Field>
            <Button type="submit" className="h-11 w-full" disabled={loading}>
                {loading ? "Sending..." : "Send message"}
            </Button>
        </form>
    )
}