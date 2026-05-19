"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { Scissors, Palette, Sparkles, Sun, Droplets, Crown } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Окрашивание",
    description: "Однотонное окрашивание, сложные техники, креативный цвет. Работаю только с премиальными красителями.",
    price: "от 5 000",
  },
  {
    icon: Sun,
    title: "Блонд",
    description: "Осветление, выход из темного в блонд, поддержание блонда. Чистый цвет без желтизны.",
    price: "от 8 000",
  },
  {
    icon: Sparkles,
    title: "Мелирование",
    description: "Аиртач, шатуш, балаяж, хендтач. Естественные переливы и многогранность цвета.",
    price: "от 7 000",
  },
  {
    icon: Droplets,
    title: "Тонирование",
    description: "Безаммиачное тонирование для блеска и насыщенности. Закрытие кутикулы волоса.",
    price: "от 3 000",
  },
  {
    icon: Crown,
    title: "Реконструкция цвета",
    description: "Исправление неудачного окрашивания. Выравнивание тона и восстановление качества.",
    price: "от 6 000",
  },
  {
    icon: Scissors,
    title: "Стрижка + укладка",
    description: "Модельная стрижка, подчеркивающая текстуру окрашивания. Финальная укладка.",
    price: "от 2 500",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function ServicesSection() {
  const ref = useRef(null)

  return (
    <section id="services" ref={ref} className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            Услуги
          </p>
          <h2 className="font-[var(--font-playfair)] text-3xl font-light text-foreground md:text-5xl lg:text-6xl">
            {'Искусство цвета'}
          </h2>
          <div className="mt-6 h-px w-16 bg-gold/30" />
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group flex flex-col justify-between bg-background p-8 transition-colors duration-500 hover:bg-card lg:p-10"
            >
              <div>
                <service.icon
                  className="mb-6 text-gold/60 transition-colors duration-500 group-hover:text-gold"
                  size={28}
                  strokeWidth={1}
                />
                <h3 className="mb-3 text-lg font-light tracking-wide text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <span className="font-[var(--font-playfair)] text-xl text-gold">
                  {service.price} <span className="text-xs text-muted-foreground">{'\u20BD'}</span>
                </span>
                <a
                  href="#contact"
                  className="text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-gold"
                >
                  {'Записаться \u2192'}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
