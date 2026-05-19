"use client"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-[var(--font-playfair)] text-xl text-foreground">
              Кабаченко Е. И.
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold">
              colorist
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {'Профессиональный колорист в Санкт-Петербурге. Индивидуальный подбор цвета и бережное окрашивание.'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">
              Навигация
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Услуги", href: "#services" },
                { label: "О мастере", href: "#about" },
                { label: "Калькулятор", href: "#calculator" },
                { label: "Контакты", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">
              Социальные сети
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-gold"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-gold"
              >
                Telegram
              </a>
              <a
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-gold"
              >
                VK
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-[10px] tracking-[0.15em] text-muted-foreground">
              {'\u00A9 2026 \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B. \u041A\u043E\u043B\u043E\u0440\u0438\u0441\u0442 \u041A\u0430\u0431\u0430\u0447\u0435\u043D\u043A\u043E \u0415. \u0418.'}
            </p>
            <p className="text-[10px] tracking-[0.15em] text-muted-foreground">
              {'Санкт-Петербург'}
            </p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-[10px] tracking-[0.15em] text-muted-foreground">
              {'Сделано devbymax'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
