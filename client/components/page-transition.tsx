"use client"

import React, { forwardRef, useMemo } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

type PageTransitionProps = HTMLMotionProps<'div'>
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>

function PageTransition({ children, ...rest }: PageTransitionProps, ref: PageTransitionRef) {
	
    const variants = useMemo(() => {
        const before = {
            opacity: 0,
            x: 100,
        }
        const state = {
            opacity: 1,
            x: 0,
        }
        const after = {
            opacity: 0,
            x: -100,
        }
        return [before, state, after]
    }, [])

	const transition = { duration: 0.6, ease: 'easeInOut' }

	return (
		<motion.div
			ref={ref}
			initial={variants[0]}
			animate={variants[1]}
			exit={variants[2]}
			transition={transition}
			{...rest}
		>
			{children}
		</motion.div>
	)
}

export default forwardRef(PageTransition)