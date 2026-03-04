import Hero from "@/components/Hero";
import MesaExperience from "@/components/MesaExperience";
import AutomationLibrary from "@/components/AutomationLibrary";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <MesaExperience />
      <AutomationLibrary />
      <CallToAction />
    </main>
  );
}
