"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false })

const letterVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.8 + i * 0.06,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const titleLine1 = "КОЛОРИСТ"
const titleLine2 = "КАБАЧЕНКО"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <HeroScene />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        {/* Subtitle above */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-gold"
        >
          Санкт-Петербург
        </motion.p>

        {/* Main title - line 1 */}
        <div className="mb-2 flex overflow-hidden">
          {titleLine1.split("").map((char, i) => (
            <motion.span
              key={`l1-${i}`}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              className="font-[var(--font-playfair)] text-5xl font-light tracking-[0.08em] text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Main title - line 2 */}
        <div className="mb-6 flex overflow-hidden">
          {titleLine2.split("").map((char, i) => (
            <motion.span
              key={`l2-${i}`}
              custom={i + titleLine1.length}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              className="gold-shimmer font-[var(--font-playfair)] text-5xl font-light tracking-[0.08em] sm:text-7xl md:text-8xl lg:text-9xl"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mb-10 max-w-xl text-sm leading-relaxed tracking-wide text-muted-foreground md:text-base"
        >
          {'Индивидуальный подбор цвета. Бережное окрашивание. Безупречный результат.'}
        </motion.p>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          href="#services"
          className="border border-gold/30 bg-gold/5 px-10 py-4 text-xs uppercase tracking-[0.3em] text-gold transition-all duration-500 hover:bg-gold hover:text-background"
        >
          Узнать больше
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="text-gold/40" size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}
