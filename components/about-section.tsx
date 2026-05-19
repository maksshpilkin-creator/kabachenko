"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "12+", label: "лет опыта" },
  { value: "3000+", label: "довольных клиентов" },
  { value: "15+", label: "техник окрашивания" },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
              О мастере
            </p>
            <h2 className="mb-8 font-[var(--font-playfair)] text-3xl font-light text-foreground md:text-5xl">
              Кабаченко
              <br />
              <span className="gold-shimmer">Екатерина Игоревна</span>
            </h2>

            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                Профессиональный колорист с более чем 12-летним стажем работы в Санкт-Петербурге.
                Специализируюсь на сложных техниках окрашивания: аиртач, балаяж, шатуш, а также
                работе с блондом.
              </p>
              <p>
                Постоянно повышаю квалификацию, прохожу обучение у ведущих технологов
                международных брендов. Работаю исключительно с премиальными красителями,
                которые сохраняют здоровье и качество волос.
              </p>
              <p>
                Мой принцип - индивидуальный подход к каждому клиенту.
                Перед окрашиванием провожу консультацию, анализирую структуру волос
                и подбираю оптимальную формулу цвета.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="font-[var(--font-playfair)] text-3xl text-gold md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-12">
                {/* Decorative elements */}
                <div className="h-px w-12 bg-gold/30" />
                <p className="font-[var(--font-playfair)] text-6xl font-light text-foreground/10 md:text-8xl">
                  EK
                </p>
                <div className="h-px w-12 bg-gold/30" />

                <div className="space-y-4 text-center">
                  <p className="text-xs uppercase tracking-[0.4em] text-gold/60">
                    Сертифицированный мастер
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {["L'Oreal Professionnel", "Wella", "Redken", "Olaplex"].map(
                      (brand) => (
                        <span
                          key={brand}
                          className="border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                        >
                          {brand}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Режим работы
                  </p>
                  <p className="mt-2 text-sm text-foreground">
                    Пн - Сб: 10:00 - 20:00
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Вс: по записи
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative border */}
            <div className="absolute -right-4 -bottom-4 -z-10 aspect-[3/4] w-full border border-gold/20" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
