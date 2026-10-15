import {
  Shell,
  Hero,
  Intro,
  Experience,
  TechStack,
  ContactSection,
} from "@/components/portfolio/Shared";
import Projects from "@/components/portfolio/Projects";
import Journal from "@/components/portfolio/Journal";

export default function Home() {
  return (
    <Shell>
      <Hero />
      <Intro />
      <Projects />
      <Experience />
      <TechStack />
      <Journal />
      <ContactSection />
    </Shell>
  );
}
