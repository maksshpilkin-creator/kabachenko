"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, RotateCcw, Sparkles } from "lucide-react"

type ColorQuizQuestion = {
  question: string
  options: { label: string; color: string; points: Record<string, number> }[]
}

const questions: ColorQuizQuestion[] = [
  {
    question: "Какой оттенок кожи вам ближе?",
    options: [
      { label: "Фарфоровый, очень светлый", color: "#fce4ec", points: { cool: 3, warm: 0, neutral: 1 } },
      { label: "Теплый, персиковый", color: "#ffe0b2", points: { cool: 0, warm: 3, neutral: 1 } },
      { label: "Оливковый", color: "#c8e6c9", points: { cool: 1, warm: 1, neutral: 3 } },
      { label: "Смуглый, золотистый", color: "#d7ccc8", points: { cool: 0, warm: 3, neutral: 2 } },
    ],
  },
  {
    question: "Какие украшения вам идут больше?",
    options: [
      { label: "Серебро, белое золото", color: "#cfd8dc", points: { cool: 3, warm: 0, neutral: 1 } },
      { label: "Желтое золото", color: "#c9a96e", points: { cool: 0, warm: 3, neutral: 1 } },
      { label: "Розовое золото", color: "#e8b4b8", points: { cool: 1, warm: 1, neutral: 3 } },
      { label: "Любые, все смотрятся хорошо", color: "#b0bec5", points: { cool: 1, warm: 1, neutral: 2 } },
    ],
  },
  {
    question: "Какой цвет глаз у вас?",
    options: [
      { label: "Голубые / серые", color: "#90caf9", points: { cool: 3, warm: 0, neutral: 1 } },
      { label: "Зеленые / ореховые", color: "#a5d6a7", points: { cool: 1, warm: 2, neutral: 2 } },
      { label: "Карие теплые", color: "#a1887f", points: { cool: 0, warm: 3, neutral: 1 } },
      { label: "Темно-карие / черные", color: "#5d4037", points: { cool: 1, warm: 1, neutral: 3 } },
    ],
  },
  {
    question: "Какой натуральный цвет ваших волос?",
    options: [
      { label: "Светло-русый / блонд", color: "#f5e6c8", points: { cool: 2, warm: 1, neutral: 2 } },
      { label: "Рыжий / медный", color: "#d4845e", points: { cool: 0, warm: 3, neutral: 0 } },
      { label: "Темно-русый", color: "#8d6e63", points: { cool: 1, warm: 1, neutral: 3 } },
      { label: "Черный / темно-каштановый", color: "#3e2723", points: { cool: 2, warm: 1, neutral: 2 } },
    ],
  },
  {
    question: "Какой стиль вам ближе?",
    options: [
      { label: "Скандинавский минимализм", color: "#eceff1", points: { cool: 3, warm: 0, neutral: 2 } },
      { label: "Бохо, теплый шик", color: "#d7ccc8", points: { cool: 0, warm: 3, neutral: 1 } },
      { label: "Классический, элегантный", color: "#cfd8dc", points: { cool: 1, warm: 1, neutral: 3 } },
      { label: "Яркий, креативный", color: "#f8bbd0", points: { cool: 2, warm: 2, neutral: 1 } },
    ],
  },
]

type ResultType = {
  title: string
  description: string
  colors: string[]
  recommendation: string
  discount: string
}

const results: Record<string, ResultType> = {
  cool: {
    title: "Холодный цветотип",
    description:
      "Вам идеально подойдут пепельные, платиновые и холодные оттенки. Ваша кожа и глаза создают гармонию с серебристыми и жемчужными тонами.",
    colors: ["#c0c0c0", "#e8d5b7", "#b8c5d6", "#d4c5e0"],
    recommendation: "Рекомендую: пепельный блонд, платина, холодный русый, ледяной шоколад.",
    discount: "Скидка 10% на первое окрашивание",
  },
  warm: {
    title: "Теплый цветотип",
    description:
      "Ваша внешность прекрасно гармонирует с золотистыми, медовыми и карамельными оттенками. Теплые тона подчеркнут вашу природную красоту.",
    colors: ["#c9a96e", "#d4845e", "#e8c88a", "#a67b5b"],
    recommendation: "Рекомендую: карамельный блонд, золотистый, медовый, теплый шоколад.",
    discount: "Скидка 10% на первое окрашивание",
  },
  neutral: {
    title: "Нейтральный цветотип",
    description:
      "Вам повезло - вы можете экспериментировать как с холодными, так и с теплыми оттенками. Розовые, бежевые, мягкие коричневые тона - все будет выглядеть отлично.",
    colors: ["#d4c5b3", "#c8b8a8", "#e0d0c0", "#b8a898"],
    recommendation: "Рекомендую: бежевый блонд, мягкий каштан, розовое золото, натуральный русый.",
    discount: "Скидка 10% на первое окрашивание",
  },
}

export default function GameSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ cool: 0, warm: 0, neutral: 0 })
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro")
  const [result, setResult] = useState<ResultType | null>(null)

  const handleAnswer = useCallback(
    (points: Record<string, number>) => {
      const newScores = {
        cool: scores.cool + (points.cool || 0),
        warm: scores.warm + (points.warm || 0),
        neutral: scores.neutral + (points.neutral || 0),
      }
      setScores(newScores)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        const maxKey = Object.entries(newScores).reduce((a, b) =>
          a[1] > b[1] ? a : b
        )[0]
        setResult(results[maxKey])
        setGameState("result")
      }
    },
    [currentQuestion, scores]
  )

  const restart = () => {
    setCurrentQuestion(0)
    setScores({ cool: 0, warm: 0, neutral: 0 })
    setGameState("intro")
    setResult(null)
  }

  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            Подарок для вас
          </p>
          <h2 className="font-[var(--font-playfair)] text-3xl font-light text-foreground md:text-5xl lg:text-6xl">
            {'Узнайте свой идеальный цвет'}
          </h2>
          <div className="mt-6 h-px w-16 bg-gold/30" />
        </motion.div>

        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {/* INTRO */}
            {gameState === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center border border-border bg-background p-10 text-center lg:p-14"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center border border-gold/30">
                  <Gift size={28} className="text-gold" />
                </div>
                <h3 className="mb-4 font-[var(--font-playfair)] text-2xl text-foreground">
                  {'Тест: Какой цвет волос вам подходит?'}
                </h3>
                <p className="mb-8 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {'Ответьте на 5 вопросов о вашей внешности и стиле, и я подберу идеальный оттенок для вашего цветотипа. Бонус: скидка на первое посещение!'}
                </p>
                <button
                  onClick={() => setGameState("playing")}
                  className="flex items-center gap-2 bg-gold px-8 py-4 text-xs uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-gold-light"
                >
                  <Sparkles size={14} />
                  Начать тест
                </button>
              </motion.div>
            )}

            {/* QUESTIONS */}
            {gameState === "playing" && (
              <motion.div
                key={`q-${currentQuestion}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="border border-border bg-background p-8 lg:p-12"
              >
                {/* Progress */}
                <div className="mb-8 flex items-center gap-4">
                  <span className="text-xs text-gold">
                    {currentQuestion + 1}/{questions.length}
                  </span>
                  <div className="h-px flex-1 bg-border">
                    <div
                      className="h-px bg-gold transition-all duration-500"
                      style={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <h3 className="mb-8 font-[var(--font-playfair)] text-xl text-foreground md:text-2xl">
                  {questions[currentQuestion].question}
                </h3>

                <div className="flex flex-col gap-3">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.points)}
                      className="group flex items-center gap-4 border border-border bg-transparent px-5 py-4 text-left text-sm text-muted-foreground transition-all duration-300 hover:border-gold/30 hover:text-foreground"
                    >
                      <span
                        className="h-6 w-6 shrink-0 rounded-full border border-border transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: option.color }}
                      />
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RESULT */}
            {gameState === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="border border-gold/20 bg-background p-8 lg:p-12"
              >
                <div className="mb-6 flex items-center gap-3">
                  <Sparkles size={20} className="text-gold" />
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">
                    Ваш результат
                  </p>
                </div>

                <h3 className="mb-4 font-[var(--font-playfair)] text-3xl text-foreground">
                  {result.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {result.description}
                </p>

                {/* Color palette */}
                <div className="mb-6 flex gap-3">
                  {result.colors.map((color, i) => (
                    <div
                      key={i}
                      className="h-16 flex-1 border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <p className="mb-6 text-sm text-foreground">
                  {result.recommendation}
                </p>

                {/* Discount banner */}
                <div className="mb-8 border border-gold/30 bg-gold/5 px-6 py-4 text-center">
                  <p className="font-[var(--font-playfair)] text-lg text-gold">
                    {result.discount}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {'Покажите этот результат при записи'}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className="flex flex-1 items-center justify-center bg-gold px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-gold-light"
                  >
                    Записаться со скидкой
                  </a>
                  <button
                    onClick={restart}
                    className="flex items-center justify-center gap-2 border border-border px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300 hover:border-gold/30 hover:text-gold"
                  >
                    <RotateCcw size={14} />
                    Пройти снова
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
