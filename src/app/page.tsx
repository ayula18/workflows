import Hero from "@/components/Hero";
import AutomationLibrary from "@/components/AutomationLibrary";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AutomationLibrary />
      <CallToAction />
    </main>
  );
}
