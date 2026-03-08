import ExperienceCard from "@/components/ExperienceCard";

export default function EngineeringExperience() {
    return (
        <ExperienceCard
            id="engineering-experience"
            badgeText="Thakur College of Engineering"
            numberBadge="002"
            title="Building the technical foundation."
            description={
                <>
                    Before business school, I built my technical foundation with a{" "}
                    <span className="highlight-badge">B.E. in Computer Science &amp; Cybersecurity</span>{" "}
                    from Thakur College of Engineering. While mentoring early-stage student startups, I realized my passion was in 0-to-1 product building. I dropped out of the traditional placement race to found{" "}
                    <span className="highlight-badge">Bunchup</span>, a consumer social app. Over two years, I led product and engineering, scaled it to{" "}
                    <span className="highlight-badge">2,000+ organic users</span>, and successfully raised{" "}
                    <span className="highlight-badge">₹10L in pre-seed funding</span>.
                </>
            }
            linkText="TCET.AC.IN"
            imageSrc="/team_bunchup.jpeg"
            imageAlt="Bunchup Team"
            imageClassName="scale-[1.15] group-hover:scale-[1.2]"
            caption="Late nights, broken code, and the reality of building a startup from a dorm room."
            gradientId="orange-gradient-eng"
        />
    );
}
