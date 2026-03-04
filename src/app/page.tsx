import Hero from "@/components/Hero";
import MesaExperience from "@/components/MesaExperience";
import EngineeringExperience from "@/components/EngineeringExperience";
import AutomationLibrary from "@/components/AutomationLibrary";
import CallToAction from "@/components/CallToAction";
import {
  ScrollStack,
  ScrollStackItem,
} from "@/components/animations/ScrollStack";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ScrollStack
        useWindowScroll={true}
        itemDistance={120}
        itemStackDistance={40}
      >
        <ScrollStackItem itemClassName="h-auto">
          <MesaExperience />
        </ScrollStackItem>
        <ScrollStackItem itemClassName="h-auto">
          <EngineeringExperience />
        </ScrollStackItem>
      </ScrollStack>
      <AutomationLibrary />
      <CallToAction />
    </main>
  );
}
