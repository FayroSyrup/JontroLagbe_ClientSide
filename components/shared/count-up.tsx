"use client"

import { useEffect, useRef } from "react"
import { animate, useInView } from "framer-motion"

// counts from 0 to a number when it appears on screen
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true })

    useEffect(() => {
        if (!inView || !ref.current) return
        const node = ref.current
        const controls = animate(0, to, {
            duration: 1.5,
            ease: "easeOut",
            onUpdate: (value) => {
                node.textContent = Math.round(value).toLocaleString("en-US") + suffix
            },
        })
        return () => controls.stop()
    }, [inView, to, suffix])

    return <span ref={ref}>0{suffix}</span>
}