import { cn } from '@/utils/cn'
import React from 'react'
import { motion } from 'framer-motion'

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  animate?: boolean
}) => {
  const variants = {
    initial: {
      backgroundPosition: '0 50%',
    },
    animate: {
      backgroundPosition: ['0, 50%', '100% 50%', '0 50%'],
    },
  }
  return (
    <div className={cn('panel-gradient', containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? 'initial' : undefined}
        animate={animate ? 'animate' : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }
            : undefined
        } data-animated={animate || undefined}
        className={cn(
          'panel-gradient-glow',
          'panel-gradient-fill'
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? 'initial' : undefined}
        animate={animate ? 'animate' : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }
            : undefined
        } data-animated={animate || undefined}
        className={cn(
          'panel-gradient-edge',
          'panel-gradient-fill'
        )}
      />

      <div className={cn('panel-gradient-content', className)}>{children}</div>
    </div>
  )
}
