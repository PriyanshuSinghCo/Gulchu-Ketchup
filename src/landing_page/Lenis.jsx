// SmoothScrollWrapper.jsx
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

const SmoothScrollWrapper = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing function
      smooth: true,
    })

    // RAF loop to update Lenis
    const frame = (time) => {
      lenis.raf(time)
      requestAnimationFrame(frame)
    }

    const rafId = requestAnimationFrame(frame)

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId) // stop RAF
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScrollWrapper
