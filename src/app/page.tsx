import dynamic from "next/dynamic";
import { Suspense } from "react";
import Hero from "@/components/Hero";
import SkeletonCard from "@/components/SkeletonCard";

const DynamicAutomationLibrary = dynamic(() => import("@/components/AutomationLibrary"), { ssr: true });
const DynamicCallToAction = dynamic(() => import("@/components/CallToAction"), { ssr: true });

function LibrarySkeleton() {
  return (
    <div className="py-20 container mx-auto px-4 text-center">
      <div className="mb-16">
        <div className="w-2/3 md:w-1/3 h-10 bg-white/10 rounded-lg mx-auto mb-4 animate-pulse"></div>
        <div className="w-1/2 h-4 bg-white/5 rounded mx-auto animate-pulse"></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center overflow-hidden">
      <Hero />
      <div className="w-full">
        <Suspense fallback={<LibrarySkeleton />}>
          <DynamicAutomationLibrary />
        </Suspense>
      </div>
      <div className="w-full">
        <Suspense fallback={<div className="h-40 animate-pulse bg-white/5 w-full mt-20"></div>}>
          <DynamicCallToAction />
        </Suspense>
      </div>
    </main>
  );
}
