import Hero from "@/components/home/Hero";
import MesaExperience from "@/components/experience/MesaExperience";
import EngineeringExperience from "@/components/experience/EngineeringExperience";
import AutomationLibrary from "@/components/automation/AutomationLibrary";
import CallToAction from "@/components/home/CallToAction";
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
