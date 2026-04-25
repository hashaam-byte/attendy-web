'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
  style?: React.CSSProperties
}

export default function ScrollReveal({ children, delay = 0, direction = 'up', className = '', style }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`
          el.style.opacity = '1'
          el.style.transform = 'translateY(0) translateX(0)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const initTransform =
      direction === 'up' ? 'translateY(28px)' :
      direction === 'left' ? 'translateX(-28px)' :
      direction === 'right' ? 'translateX(28px)' : 'none'

    el.style.opacity = '0'
    el.style.transform = initTransform

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, direction])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}