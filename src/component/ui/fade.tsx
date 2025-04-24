'use client'

import { isValidElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface FadeProps {
  children: React.ReactNode
  show: boolean
  duration?: number
  key?: string
  asChild?: boolean
}

export function Fade({ show, children, duration = 0.3, key = 'fade', asChild = false }: Readonly<FadeProps>) {
  const ANIMATE = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration } }

  function Children() {
    if (!isValidElement(children)) return null

    if (asChild && typeof children.type === 'string') {
      const Comp = motion[children.type as keyof typeof motion]
      if (!Comp) return null
      return <Comp key={key} {...children.props} {...ANIMATE} />
    }

    return (
      <motion.div key={key} {...ANIMATE}>
        {children}
      </motion.div>
    )
  }

  return <AnimatePresence>{show && <Children />}</AnimatePresence>
}
