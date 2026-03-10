import ExperienceCard from "@/components/experience/ExperienceCard";

export default function MesaExperience() {
    return (
        <ExperienceCard
            id="mesa-experience"
            badgeText="Mesa School of Business"
            numberBadge="001"
            title="Mastering the art of zero-to-one execution."
            description={
                <>
                    At Mesa School of Business, I&apos;ve spent my MBA bridging the gap between business strategy and technical execution. From engineering{" "}
                    <span className="highlight-badge">production-grade AI automations</span>{" "}
                    to breaking down{" "}
                    <span className="highlight-badge">complex startup case studies</span>, my time here has been entirely focused on building scalable solutions. I also launched a healthy{" "}
                    <span className="highlight-badge">millet-based snacks company</span>{" "}
                    as part of a 0-to-1 project, scaling it to{" "}
                    <span className="highlight-badge">₹1.5L in revenue</span>{" "}
                    from scratch.
                </>
            }
            linkText="MESASCHOOL.CO"
            imageSrc="/grp.JPG"
            imageAlt="Mesa Group Picture"
            imageClassName="group-hover:scale-105"
            caption="Surrounded by founders, operators, and enough caffeine to power a small data center."
            gradientId="orange-gradient"
        />
    );
}
