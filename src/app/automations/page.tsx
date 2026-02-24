import { automations, categories } from "@/lib/data";
import AutomationCard from "@/components/AutomationCard";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata = {
    title: "All Automations | Kapture GTM",
    description: "Explore our library of high-impact GTM and Sales automations.",
};


export default function AutomationsPage() {
    const allAutomations = Object.values(automations);

    return (
        <main className="min-h-screen pt-24 pb-20">
            <SectionWrapper>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Automation <span className="text-gradient">Library</span>
                    </h1>
                    <p className="text-xl opacity-60 max-w-2xl mx-auto">
                        Browse our collection of production-ready workflows designed to scale your revenue engine.
                    </p>
                </div>

                {categories.map((cat, idx) => {
                    const items = allAutomations.filter(a => a.category === cat.key);
                    if (items.length === 0) return null;
                    return (
                        <div key={cat.key} className={idx < categories.length - 1 ? "mb-20" : ""}>
                            <div className="flex items-center gap-3 mb-8">
                                <h2 className="text-2xl font-bold">{cat.label}</h2>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${cat.badgeClass}`}>
                                    {items.length}
                                </span>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {items.map(automation => (
                                    <AutomationCard key={automation.slug} automation={automation} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </SectionWrapper>
        </main>
    );
}
