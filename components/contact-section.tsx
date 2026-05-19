"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Clock, Send } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    label: "Адрес",
    value: "Санкт-Петербург",
    detail: "Невский район",
  },
  {
    icon: Phone,
    label: "Телефон / WhatsApp",
    value: "+7 (XXX) XXX-XX-XX",
    detail: "Для записи и консультаций",
  },
  {
    icon: Clock,
    label: "Режим работы",
    value: "Пн - Сб: 10:00 - 20:00",
    detail: "Вс: по предварительной записи",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "@kabachenko_colorist",
    detail: "Быстрая связь",
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
              Контакты
            </p>
            <h2 className="mb-8 font-[var(--font-playfair)] text-3xl font-light text-foreground md:text-5xl">
              {'Запишитесь'}
              <br />
              <span className="gold-shimmer">на консультацию</span>
            </h2>

            <p className="mb-12 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {'Бесплатная консультация по подбору цвета и технике окрашивания. Запишитесь любым удобным способом, и мы подберем идеальное время для вашего визита.'}
            </p>

            <div className="flex flex-col gap-6">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 border-b border-border pb-6 last:border-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/20">
                    <item.icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="border border-gold/20 bg-card p-8 lg:p-12">
              <h3 className="mb-6 font-[var(--font-playfair)] text-2xl text-foreground">
                {'Запись онлайн'}
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                {'Оставьте свое имя и телефон - я свяжусь с вами для подтверждения записи и бесплатной консультации.'}
              </p>

              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.target as HTMLFormElement
                  const nameInput = form.elements.namedItem('name') as HTMLInputElement
                  const phoneInput = form.elements.namedItem('phone') as HTMLInputElement
                  if (nameInput && phoneInput) {
                    alert(`Спасибо, ${nameInput.value}! Мы свяжемся с вами по номеру ${phoneInput.value}.`)
                  }
                }}
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Ваше имя"
                  required
                  className="border border-border bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  required
                  className="border border-border bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
                <select
                  name="service"
                  className="border border-border bg-background px-5 py-3.5 text-sm text-muted-foreground focus:border-gold focus:outline-none"
                >
                  <option>Выберите услугу</option>
                  <option>Окрашивание</option>
                  <option>Блонд</option>
                  <option>Мелирование / Аиртач</option>
                  <option>Балаяж / Шатуш</option>
                  <option>Тонирование</option>
                  <option>Коррекция цвета</option>
                  <option>Консультация</option>
                </select>
                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center bg-gold py-4 text-xs uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-gold-light"
                >
                  Записаться
                </button>
              </form>

              <p className="mt-6 text-center text-[10px] leading-relaxed text-muted-foreground">
                {'Нажимая кнопку, вы соглашаетесь на обработку персональных данных.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
