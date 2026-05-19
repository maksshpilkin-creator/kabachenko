"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "О мастере", href: "#about" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Контакты", href: "#contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex flex-col">
          <span className="font-[var(--font-playfair)] text-lg tracking-wide text-foreground">
            Кабаченко Е. И.
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
            colorist
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="border border-gold/30 bg-transparent px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-background"
          >
            Записаться
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-foreground md:hidden"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-6 px-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="border border-gold/30 bg-transparent px-6 py-3 text-center text-sm uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-background"
            >
              Записаться
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
