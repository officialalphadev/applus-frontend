'use client'

import { createElement, isValidElement, ReactElement } from 'react'
import { motion } from 'framer-motion'

export interface AnimateProps {
  children: React.ReactNode
  duration?: number
  key?: string
  asChild?: boolean
  type: 'fade' | 'scale' | 'slideDown' | 'slideLeft' | 'slideRight' | 'slideUp'
}

export function Animate({ children, key = 'animate', type = 'fade', asChild = false }: Readonly<AnimateProps>) {
  const ANIMATE = {
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { opacity: 0, translateY: 100, scaleY: 0 },
      animate: { opacity: 1, translateY: 0, scaleY: 1 },
      exit: { opacity: 0, translateY: 100, scaleY: 0 }
    },
    slideDown: {
      initial: { opacity: 0, translateY: -100, scaleY: 0 },
      animate: { opacity: 1, translateY: 0, scaleY: 1 },
      exit: { opacity: 0, translateY: -100, scaleY: 0 }
    },
    slideLeft: {
      initial: { opacity: 0, translateX: 100, scaleX: 0 },
      animate: { opacity: 1, translateX: 0, scaleX: 1 },
      exit: { opacity: 0, translateX: 100, scaleX: 0 }
    },
    slideRight: {
      initial: { opacity: 0, translateX: -100, scaleX: 0 },
      animate: { opacity: 1, translateX: 0, scaleX: 1 },
      exit: { opacity: 0, translateX: -100, scaleX: 0 }
    }
  }

  if (!isValidElement(children)) return null

  const element = children as ReactElement

  if (asChild && isValidElement(children) && typeof children.type === 'string') {
    const Comp = motion[children.type as never]
    if (!Comp) return null
    return createElement(Comp, { key, ...(element.props ?? {}), ...ANIMATE[type] })
  }

  return (
    <motion.div key={key} {...ANIMATE[type]}>
      {children}
    </motion.div>
  )
}
