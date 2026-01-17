import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/landing/HeroSection'

export const Route = createFileRoute('/_public/')({
  component: HomePage,
})

function HomePage() {
  return <HeroSection />
}
