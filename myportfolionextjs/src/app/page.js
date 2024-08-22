import HeroSection from "@/components/HeroSection";
import ProjectSection from "@/components/ProjectSection";
import SkillSection from "@/components/SkillSection";

export default function HomePage() {
  return (
    <div className="font-montserrat">
      {/* Sezione 1 */}
      <HeroSection />
      {/* Sezione 2 */}
      <SkillSection />
      {/* Sezione 3 */}
      <ProjectSection />
    </div>
  );
}
