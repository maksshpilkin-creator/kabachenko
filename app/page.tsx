import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import AboutSection from "@/components/about-section"
import CalculatorSection from "@/components/calculator-section"
import GameSection from "@/components/game-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <CalculatorSection />
      <GameSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
