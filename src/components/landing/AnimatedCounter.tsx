import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface AnimatedCounterProps {
  value: number
}

export function AnimatedCounter({ value }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true)
      const timeout = setTimeout(() => {
        setDisplayValue(value)
        setIsAnimating(false)
      }, 150)
      return () => clearTimeout(timeout)
    }
  }, [value, displayValue])

  const digits = String(displayValue).split('')

  return (
    <div className="flex items-center justify-center gap-2">
      <AnimatePresence mode="popLayout">
        {digits.map((digit, index) => (
          <motion.span
            key={`${index}-${digit}`}
            initial={{ y: -40, opacity: 0, scale: 0.8 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: isAnimating ? 1.1 : 1,
            }}
            exit={{ y: 40, opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              delay: index * 0.05,
            }}
            className="inline-block text-8xl md:text-9xl font-bold text-emerald-400 tabular-nums"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {digit}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
