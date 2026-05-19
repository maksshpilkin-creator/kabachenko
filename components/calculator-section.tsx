"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator } from "lucide-react"

type HairLength = "short" | "medium" | "long" | "extralong"
type ServiceType = "single" | "highlight" | "airtouch" | "balayage" | "blonde" | "correction"

const lengths: { key: HairLength; label: string; multiplier: number }[] = [
  { key: "short", label: "Короткие (до 15 см)", multiplier: 1 },
  { key: "medium", label: "Средние (15-30 см)", multiplier: 1.3 },
  { key: "long", label: "Длинные (30-50 см)", multiplier: 1.6 },
  { key: "extralong", label: "Очень длинные (50+ см)", multiplier: 2 },
]

const serviceTypes: { key: ServiceType; label: string; basePrice: number }[] = [
  { key: "single", label: "Однотонное окрашивание", basePrice: 5000 },
  { key: "highlight", label: "Мелирование", basePrice: 7000 },
  { key: "airtouch", label: "Аиртач", basePrice: 8000 },
  { key: "balayage", label: "Балаяж / Шатуш", basePrice: 7500 },
  { key: "blonde", label: "Тотальный блонд", basePrice: 9000 },
  { key: "correction", label: "Коррекция цвета", basePrice: 6000 },
]

const extras: { key: string; label: string; price: number }[] = [
  { key: "toning", label: "Тонирование", price: 3000 },
  { key: "olaplex", label: "Olaplex (защита)", price: 2500 },
  { key: "cut", label: "Стрижка + укладка", price: 2500 },
  { key: "botox", label: "Ботокс для волос", price: 4000 },
]

export default function CalculatorSection() {
  const [selectedLength, setSelectedLength] = useState<HairLength>("medium")
  const [selectedService, setSelectedService] = useState<ServiceType>("single")
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])

  const toggleExtra = (key: string) => {
    setSelectedExtras((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const lengthData = lengths.find((l) => l.key === selectedLength)!
  const serviceData = serviceTypes.find((s) => s.key === selectedService)!
  const extrasTotal = selectedExtras.reduce((sum, key) => {
    const extra = extras.find((e) => e.key === key)
    return sum + (extra?.price || 0)
  }, 0)

  const total = Math.round(serviceData.basePrice * lengthData.multiplier + extrasTotal)

  return (
    <section id="calculator" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            Калькулятор
          </p>
          <h2 className="font-[var(--font-playfair)] text-3xl font-light text-foreground md:text-5xl lg:text-6xl">
            {'Рассчитайте стоимость'}
          </h2>
          <div className="mt-6 h-px w-16 bg-gold/30" />
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          {/* Step 1: Length */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center border border-gold/30 text-xs text-gold">
                01
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Длина волос
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {lengths.map((length) => (
                <button
                  key={length.key}
                  onClick={() => setSelectedLength(length.key)}
                  className={`border px-5 py-3.5 text-left text-sm transition-all duration-300 ${
                    selectedLength === length.key
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border bg-transparent text-muted-foreground hover:border-gold/30"
                  }`}
                >
                  {length.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Step 2: Service */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center border border-gold/30 text-xs text-gold">
                02
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Вид окрашивания
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {serviceTypes.map((service) => (
                <button
                  key={service.key}
                  onClick={() => setSelectedService(service.key)}
                  className={`flex items-center justify-between border px-5 py-3.5 text-sm transition-all duration-300 ${
                    selectedService === service.key
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border bg-transparent text-muted-foreground hover:border-gold/30"
                  }`}
                >
                  <span>{service.label}</span>
                  <span className="text-xs text-gold/60">
                    {'от'} {service.basePrice.toLocaleString("ru-RU")} {'\u20BD'}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Step 3: Extras + Total */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center border border-gold/30 text-xs text-gold">
                03
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Дополнительно
              </span>
            </div>
            <div className="mb-8 flex flex-col gap-2">
              {extras.map((extra) => (
                <button
                  key={extra.key}
                  onClick={() => toggleExtra(extra.key)}
                  className={`flex items-center justify-between border px-5 py-3.5 text-sm transition-all duration-300 ${
                    selectedExtras.includes(extra.key)
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border bg-transparent text-muted-foreground hover:border-gold/30"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-4 w-4 items-center justify-center border text-[10px] transition-all ${
                        selectedExtras.includes(extra.key)
                          ? "border-gold bg-gold text-background"
                          : "border-muted-foreground"
                      }`}
                    >
                      {selectedExtras.includes(extra.key) ? "\u2713" : ""}
                    </span>
                    {extra.label}
                  </span>
                  <span className="text-xs text-gold/60">
                    +{extra.price.toLocaleString("ru-RU")} {'\u20BD'}
                  </span>
                </button>
              ))}
            </div>

            {/* Total */}
            <div className="border border-gold/20 bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Calculator size={16} className="text-gold" />
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Примерная стоимость
                </span>
              </div>
              <p className="font-[var(--font-playfair)] text-4xl text-gold md:text-5xl">
                {total.toLocaleString("ru-RU")}
                <span className="ml-2 text-lg text-muted-foreground">{'\u20BD'}</span>
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {'Точная стоимость определяется на консультации. Цена может варьироваться в зависимости от состояния и густоты волос.'}
              </p>
              <a
                href="#contact"
                className="mt-6 flex w-full items-center justify-center bg-gold py-3.5 text-xs uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-gold-light"
              >
                Записаться на консультацию
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
