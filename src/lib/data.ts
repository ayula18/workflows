
export interface Automation {
    slug: string;
    title: string;
    category: "Marketing & GTM" | "SaaS & Lead Gen" | "Fintech" | "Scraping Tools" | "Operations";
    description: string;
    tags: string[];
    metrics: {
        label: string;
        value: string;
        description?: string;
    }[];
    problem: {
        title: string;
        description: string;
    };
    solution: string;
    steps: {
        title: string;
        description: string;
    }[];
    before: string[];
    after: string[];
    techStack: string[];
    architectureLabels?: {
        source: string;
        core: string;
        coreSubtext?: string;
        output: string;
    };
    metricsPills?: string[];
    problemPoints?: string[];
    builtFor?: {
        persona: string;
        description: string;
    }[];
    workflowNodes?: {
        title: string;
        description: string;
    }[];
    workflowTechStack?: string[];
    generatedAssets?: {
        leftCard: {
            title: string;
            subtitle: string;
            tags: string[];
        };
        rightCard?: {
            title: string;
            subtitle: string;
            items: string[];
        };
    };
    outcomes?: {
        metric: string;
        description: string;
    }[];
    loomVideoUrl?: string;
    previewPanel?: {
        type?: "table" | "deal-kit" | "invoice" | "fraud-case";
        title: string;
        // Fields for "table"
        chips?: string[];
        miniRow?: {
            url: string;
            hook: string;
            pillar: string;
            why: string;
            replication: string;
        };
        // Fields for "deal-kit"
        dealKit?: {
            summary: string;
            painPoints: string[];
            nextSteps: string[];
            emailSubject: string;
        };
        // Fields for "invoice"
        invoiceDetails?: {
            vendor: string;
            invoiceNumber: string;
            invoiceDate: string;
            dueDate: string;
            amount: string;
            gstin: string;
        };
        validation?: {
            poMatch: string;
            duplicateCheck: string;
        };
        action?: {
            status: string;
        };
        // Fields for "fraud-case"
        fraudCase?: {
            callType: string;
            fraudCategory: string;
            riskLevel: string;
            keySignals: string[];
            recommendedAction: string;
        };
    };
}

export const automations: Record<string, Automation> = {
    // ── Marketing & GTM Automations ──────────────────────────────────────
    "influencer-scoring": {
        slug: "influencer-scoring",
        title: "AI Influencer Fit/Scoring Automation",
        category: "Marketing & GTM",
        description: "Cross-references scraped influencer profiles against your brand's exact ICP using Claude 3.7 Sonnet — automatically generating a weighted score and surfacing top-tier creators for every campaign brief.",
        tags: ["INFLUENCER MARKETING", "LLMS", "CLAUDE"],
        metrics: [
            { label: "Creator acceptance rate", value: "80%" },
            { label: "Profiles scored per hour", value: "100+" },
        ],
        metricsPills: [
            "80% Creator Acceptance Rate",
            "100+ Profiles Scored/Hour",
            "5-Dimension Weighted Scoring"
        ],
        problem: {
            title: "The Problem",
            description: "Marketing teams waste days manually researching influencers and relying on gut-feel to pick creators. This leads to poor brand fit, diluted messaging, and wasted campaign budgets on influencers with fake engagement or misaligned audiences."
        },
        problemPoints: [
            "Gut-feel selection: No structured scoring criteria across teams",
            "Fake engagement: High follower counts hide low-quality audiences",
            "Brand safety risk: Manual vetting misses red flags at scale",
            "Bottleneck: Senior marketers manually review every profile"
        ],
        solution: "This automation uses LLMs to cross-reference scraped influencer metrics against the brand's exact ICP, target audience, and campaign goals—automatically generating a weighted score and surfacing top-tier creators for every brief.",
        builtFor: [
            { persona: "Marketing Managers", description: "Running creator campaigns across multiple brand verticals." },
            { persona: "Brand Strategists", description: "Needing ICP-aligned creators, not just high-follower profiles." },
            { persona: "Performance Teams", description: "Optimising creator spend against campaign ROI." }
        ],
        steps: [
            { title: "Data Ingestion", description: "Loads brand ICP, campaign goals, and raw scraped influencer profiles (followers, engagement rate, bio) from Google Sheets." },
            { title: "Pre-Filtering", description: "Runs an initial logic pass to remove low-engagement, low-follower, or incomplete profiles, saving LLM tokens." },
            { title: "Claude 3.7 Analysis", description: "Claude evaluates the influencer against the brand's exact values, scoring them across 5 weighted dimensions including Brand Safety and Audience Match." },
            { title: "Tiering & Export", description: "Calculates a final weighted score, assigns a Priority Tier (1-4), and exports the ranked shortlist back to Sheets with exact reasoning." },
        ],
        workflowNodes: [
            { title: "Load Brand & Creators", description: "Brand ICP and scraped influencer profiles loaded in parallel from Google Sheets" },
            { title: "Pre-Filter", description: "Code node removes low-engagement, low-follower-ratio, and sparse profiles before LLM analysis — saving tokens" },
            { title: "Claude Analysis (Per Creator)", description: "Claude 3.7 Sonnet scores each creator on 5 weighted dimensions: Engagement Quality, Content Relevance, Audience Match, Brand Safety, Collaboration Potential" },
            { title: "Weighted Score Calculation", description: "Code node computes final score and assigns Priority Tier 1–4 based on score thresholds" },
            { title: "Save & Route", description: "Scored results saved to Sheets; Tier 1 & 2 creators auto-flagged for outreach" }
        ],
        workflowTechStack: ["n8n", "Claude 3.7 Sonnet", "Google Sheets", "JavaScript"],
        before: [
            "Days spent manually researching profiles",
            "Gut-feel creator selection",
            "Inconsistent brand safety checks",
            "High-follower ≠ high-fit",
            "Knowledge trapped with senior team members"
        ],
        after: [
            "100+ profiles scored per hour",
            "5-dimension weighted LLM scoring",
            "Automated brand safety flagging",
            "Tier 1–4 priority ranking per brief",
            "Self-serve scoring for the whole team"
        ],
        techStack: ["Claude 3.7 Sonnet", "n8n", "Apify", "Google Sheets"],
        architectureLabels: {
            source: "Brand Data + Scrapes",
            core: "n8n Pre-filter + Claude Scoring",
            output: "Ranked Google Sheet",
        },
        generatedAssets: {
            leftCard: {
                title: "Google Sheets Row (Scored Creator Sheet)",
                subtitle: "A sortable, filterable log of every analyzed creator",
                tags: [
                    "Username", "Full Name", "Followers", "Engagement Rate",
                    "Final Score", "Priority Tier", "Engagement Quality Score",
                    "Content Relevance Score", "Audience Match Score",
                    "Brand Safety Score", "Collaboration Potential Score",
                    "Follower Quality Score", "Top Strengths", "Concerns",
                    "Recommendation", "Estimated Cost", "Best Content Type",
                    "Suggested Approach", "Brand Name", "Campaign Goal",
                    "Profile URL", "Analyzed Date"
                ]
            }
        },
        loomVideoUrl: "https://www.loom.com/embed/b89f8ede05aa4265930fb9e3e3cc8a67",
    },
    "brief-storyboard": {
        slug: "brief-storyboard",
        title: "AI Influencer Content Generator",
        category: "Marketing & GTM",
        description: "Auto-generates campaign-ready content briefs, shooting scripts, and full storyboards for shortlisted creators — tailored to brand tone, campaign goal, and creator style using RAG.",
        tags: ["INFLUENCER MARKETING", "RAG", "CONTENT"],
        metrics: [
            { label: "Turnaround time per brief", value: "30 Mins" },
            { label: "Faster creative testing", value: "3x" },
        ],
        metricsPills: [
            "Brief + Script + Storyboard",
            "RAG-Powered Brand Voice",
            "Per-Creator Personalisation"
        ],
        problem: {
            title: "The Problem",
            description: "After shortlisting creators, marketing teams still spend days writing individual briefs and scripts manually — often producing generic, copy-pasted content that ignores the creator's style and dilutes campaign performance."
        },
        problemPoints: [
            "Generic briefs: Same template sent to every creator regardless of style",
            "Time sink: Writing scripts and storyboards manually per creator",
            "Brand drift: Inconsistent tone when briefs are written by different people",
            "Slow turnaround: Content approval delayed by brief quality issues"
        ],
        solution: "This workflow utilizes RAG (Retrieval-Augmented Generation) to ingest past top-performing reels. It cross-references the influencer's unique style with brand goals, autonomously generating a custom strategy, Hinglish script, and visual storyboard directly into Google Docs.",
        builtFor: [
            { persona: "Content Strategists", description: "Needing creator-specific briefs at scale without manual effort." },
            { persona: "Campaign Managers", description: "Running multi-creator campaigns with tight deadlines." },
            { persona: "Brand Teams", description: "Ensuring every piece of creator content reflects exact brand tone and guidelines." }
        ],
        steps: [
            { title: "RAG & Data Ingestion", description: "Merges live influencer data from Sheets and queries an in-memory Vector Store of past top-performing reels." },
            { title: "Strategy Selection", description: "GPT-4.1 analyzes the data to select the optimal content archetype (e.g., testimonial, explainer) and emotional driver." },
            { title: "Script Generation", description: "Generates a customized, multi-hook Hinglish script tailored to the influencer's tone and the brand's exact must-have keywords." },
            { title: "Doc Export", description: "Automatically formats and writes the Brief, Script, and Scene-by-Scene Storyboard directly into structured Google Docs." },
        ],
        workflowNodes: [
            { title: "Creator & Campaign Input", description: "Shortlisted creator profile + campaign goal, brand tone, and platform loaded from Google Sheets" },
            { title: "RAG Knowledge Retrieval", description: "Pulls relevant brand guidelines, past top-performing content formats, and campaign references from the knowledge base" },
            { title: "LLM Content Generation", description: "Generates 3 parallel outputs: Campaign Brief, Shooting Script, and Scene-by-Scene Storyboard — all personalised to the creator's style and platform" },
            { title: "Google Docs Output", description: "All three outputs compiled into a single formatted, shareable Google Doc per creator — ready for approval" }
        ],
        workflowTechStack: ["n8n", "Claude / GPT-4", "Google Sheets", "Google Docs", "RAG"],
        before: [
            "Days writing briefs and scripts per creator",
            "Generic one-size-fits-all content direction",
            "Brand voice inconsistent across briefs",
            "Storyboards created separately by designers",
            "Revisions back-and-forth due to vague briefs"
        ],
        after: [
            "Full brief + script + storyboard per creator in minutes",
            "Personalised to each creator's content style",
            "Brand voice enforced via RAG knowledge base",
            "End-to-end content kit in a single Google Doc",
            "Fewer revisions with structured, specific direction"
        ],
        techStack: ["OpenAI GPT-4o", "LangChain RAG", "Google Docs API", "n8n Agents"],
        architectureLabels: {
            source: "Sheets + Vector DB",
            core: "Langchain RAG + OpenAI",
            output: "Formatted Google Docs",
        },
        generatedAssets: {
            leftCard: {
                title: "Google Docs (Creator Content Kit)",
                subtitle: "A formatted doc the creator receives directly",
                tags: [
                    "Campaign Brief", "Creator-Specific Angle", "Key Messages & Talking Points",
                    "Do's & Don'ts", "Shooting Script (scene-by-scene)", "Storyboard Outline",
                    "Hook Ideas", "CTA Direction", "Caption Suggestions", "Hashtag Set"
                ]
            }
        },
        loomVideoUrl: "https://www.loom.com/embed/28bf1805af474cfa98eddca035f2bfff",
    },
    "high-engagement-reels-analysis": {
        slug: "high-engagement-reels-analysis",
        title: "High-Engagement Reels Analysis",
        category: "Marketing & GTM",
        description: "Automatically scans competitor + creator reels, extracts the patterns behind high-performing posts, and outputs ready-to-use content insights for your next campaign.",
        tags: ["INFLUENCER MARKETING", "REELS INTELLIGENCE", "COMPETITOR ANALYSIS"],
        metrics: [
            { label: "Competitor Tracking", value: "24/7" },
            { label: "Content Intel", value: "Automated" }
        ],
        metricsPills: [
            "Competitor Content Intel",
            "Hook + Format Patterns",
            "Replicable Content Ideas"
        ],
        problem: {
            title: "The Problem",
            description: "Teams either copy competitor content blindly or spend hours manually reviewing reels to understand what’s working. Even when they find winning posts, the learning isn’t structured or reusable."
        },
        problemPoints: [
            "Manual review doesn't scale across dozens of creators",
            "Insights stay subjective (no consistent framework)",
            "Hard to translate 'this worked' into repeatable briefs",
            "Trend windows are short; analysis arrives too late"
        ],
        solution: "This automation actively scrapes reel data, leveraging LLMs to classify hooks, themes, editing patterns, and why they succeeded—curating a centralized, reusable insight library for faster and data-driven iteration.",
        builtFor: [
            { persona: "Growth Marketers", description: "Needing fast creative direction backed by patterns, not opinions." },
            { persona: "Content Strategists", description: "Building content pillars and hooks that match what’s currently working." },
            { persona: "Influencer / Creator Managers", description: "Guiding creators with data-driven angles and formats." }
        ],
        steps: [
            { title: "Target Injection", description: "Ingests specific competitor handles, creator profiles, or niche keywords to monitor from Google Sheets." },
            { title: "Metadata Extraction", description: "Scrapes reel URLs, engagement numbers, and metadata consistently at scale across platforms." },
            { title: "LLM Pattern Recognition", description: "Classifies hook styles, content themes, CTAs, and video sentiment to explain the underlying 'why'." },
            { title: "Insight Repository", description: "Outputs everything cleanly into a central Google Sheet with actionable replication ideas." }
        ],
        workflowNodes: [
            { title: "Input Targets", description: "Competitor handles / creator handles / niche keywords in Google Sheets" },
            { title: "Scrape Reels", description: "Collects reel URLs + metadata at scale" },
            { title: "AI Pattern Extraction", description: "LLM classifies hooks, themes, CTAs, editing patterns, sentiment, and why it worked" },
            { title: "Insight Library Output", description: "Google Sheets output with structured tags + replication ideas" }
        ],
        workflowTechStack: ["n8n", "Apify / Scraper", "Google Sheets", "Claude / GPT-4"],
        before: [
            "Hours spent watching competitor reels",
            "“Vibes-based” conclusions",
            "Notes scattered across docs / chats",
            "No repeatable hook + format library",
            "Slow iteration cycle"
        ],
        after: [
            "Structured analysis across competitors + creators",
            "Hook + format patterns extracted consistently",
            "Centralized insight sheet for the whole team",
            "Replication ideas generated for new reels",
            "Faster briefs and faster creative iteration"
        ],
        techStack: ["Apify", "Anthropic Claude", "n8n", "Google Sheets"],
        architectureLabels: {
            source: "Competitor Reels",
            core: "Apify Extraction + LLM Pattern Parsing",
            output: "Insight Library Sheet",
        },
        generatedAssets: {
            leftCard: {
                title: "Google Sheets (Reels Insight Library)",
                subtitle: "Every run produces a structured reel-insights library",
                tags: [
                    "Source (Competitor/Creator)", "Handle", "Reel URL", "Hook",
                    "Content Pillar", "Format", "CTA Type", "Editing Pattern",
                    "Audio Type", "Target Persona", "Sentiment", "Why It Worked",
                    "Replication Idea", "Caption Angle", "Hashtag Suggestions",
                    "Notes", "Scraped At Timestamp"
                ]
            }
        },
        previewPanel: {
            title: "Output Preview",
            chips: ["Hook Style", "Content Pillar", "CTA Type", "Editing Pattern", "Audio Type"],
            miniRow: {
                url: "instagram.com/reel/xyz123",
                hook: "Controversial Statement",
                pillar: "Educational",
                why: "Strong 3-sec hook with fast jump cuts",
                replication: "Open with myth-busting format"
            }
        }
    },
    "gtm-copilot": {
        slug: "gtm-copilot",
        title: "AI GTM Copilot",
        category: "Marketing & GTM",
        description: "A multi-agent architecture that instantly turns raw discovery notes into a comprehensive Go-To-Market kit: problem framing, value props, objection handling, and pitch decks.",
        tags: ["GTM Automation", "Multi-Agent", "Sales Enablement"],
        metrics: [
            { label: "Saved per sales rep", value: "20+ hrs/wk" },
            { label: "AI Agents deployed", value: "3 parallel" },
        ],
        problem: {
            title: "The Problem",
            description: "Sales and Pre-sales teams waste 10+ hours per enterprise deal manually crafting pitches, objection handling guides, and deck outlines based on rough discovery notes. This manual process causes knowledge silos and slows down pipeline velocity.",
        },
        solution: "This workflow triggers from a simple form submission, querying a product knowledge base and deploying three parallel AI agents (GTM Strategist, Solutions Consultant, and Comms Lead) to instantly generate a hyper-personalized, 7-part GTM kit inside Google Docs.",
        steps: [
            { title: "Form & KB Lookup", description: "A Google Form submission triggers the workflow, validating the input and mapping the deal against an internal Knowledge Base to find relevant use cases." },
            { title: "Multi-Agent Generation", description: "Deploys 3 specialized GPT-4.1-mini agents in parallel: a GTM Strategist, a Sales Consultant (for objections/discovery), and a Comms Lead (for emails/decks)." },
            { title: "Data Compilation", description: "A JavaScript node aggregates all three JSON outputs, formats the data, and structures a massive 7-section master document." },
            { title: "Doc & Sheet Export", description: "Creates a formatted, highly readable Google Doc for the sales team and appends a structured record into a 'Generated GTM Kits' Google Sheet." },
        ],
        before: ["Hours spent writing deal collateral", "Sales reps hunting for proof points", "Generic, copy-pasted email pitches", "Slow follow-ups after discovery calls"],
        after: ["Complete GTM kit in seconds", "Auto-mapped product use-cases", "Tailored objection handling guides", "Formatted Google Doc ready to use"],
        techStack: ["GPT-4.1-mini Agents", "n8n (Parallel execution)", "Google Sheets (KB)", "Google Docs API"],
        architectureLabels: {
            source: "Form Input + KB",
            core: "3 Parallel AI Agents",
            output: "Master GTM Doc",
        },
        metricsPills: [
            "~95% Time Reduction",
            "60–90 sec per kit",
            "3 Parallel LLM Agents"
        ],
        problemPoints: [
            "Time-inefficient: Repetitive research and copy-paste from past decks",
            "Inconsistent: Quality varies by person; tribal knowledge isn't captured",
            "Not scalable: Senior SEs become bottlenecks; junior AEs lack depth",
            "Reactive: Materials created after discovery calls, delaying follow-ups"
        ],
        builtFor: [
            { persona: "Sales Engineers (SEs)", description: "Preparing technical discovery and solution deep-dive materials." },
            { persona: "Account Executives (AEs)", description: "Needing tailored pitch decks and follow-up email sequences." },
            { persona: "Pre-Sales Consultants", description: "Handling BFSI and Retail enterprise deals." }
        ],
        workflowNodes: [
            { title: "Structured Input", description: "Google Sheets row with Industry, Persona, Pain Points, Stage, Tech Stack" },
            { title: "Knowledge Base Matching", description: "Matches against Kapture modules, use-cases, and objection themes" },
            { title: "3 Parallel LLM Agents", description: "GTM Core Agent, Sales Kit Agent, Comms Kit Agent" },
            { title: "Dual Output", description: "Google Sheets ledger + Google Docs client document" }
        ],
        workflowTechStack: ["n8n", "Google Sheets", "Google Docs", "Claude / GPT-4"],
        generatedAssets: {
            leftCard: {
                title: "Google Sheets Row (GTM Kit Ledger)",
                subtitle: "A searchable log for reporting and reuse",
                tags: [
                    "Timestamp", "Opportunity Name", "Industry", "Persona", "Stage",
                    "Problem Statement", "Business Impact", "Urgency Trigger",
                    "Elevator Pitch", "Differentiation", "Recommended Modules",
                    "Discovery Questions", "Objections", "Email Subject",
                    "Deck Slides Count", "Full Output JSON"
                ]
            },
            rightCard: {
                title: "Google Docs (Client-Ready GTM Kit)",
                subtitle: "A formatted, shareable document the AE sends directly",
                items: [
                    "Problem Framing",
                    "Value Proposition",
                    "Use-Case Menu (Module Mapping)",
                    "Discovery Questions (by category)",
                    "Objection Handling (objection → response → proof)",
                    "Follow-up Email (subject + body + CTA)",
                    "Deck Outline (10 slides with bullets + visual notes)"
                ]
            }
        },
        outcomes: [
            { metric: "~95%", description: "Time reduction in enablement asset creation" },
            { metric: "Consistent", description: "Every kit follows the same structure and quality bar" },
            { metric: "Instant", description: "Junior AEs get senior-level enablement on demand" },
            { metric: "Traceable", description: "Every kit logged with timestamp, deal context + full JSON" }
        ],
        loomVideoUrl: "https://www.loom.com/embed/57bdcbba29494d7c9cffe3bad7de6308",
    },
    "roas-optimizer": {
        slug: "roas-optimizer",
        title: "ROAS Optimizer",
        category: "Marketing & GTM",
        description: "Automatically pulls live campaign performance data, identifies underperforming ad sets, and generates actionable reallocation recommendations—so your budget always flows toward what's actually working.",
        tags: ["PERFORMANCE MARKETING", "PAID ADS", "ANALYTICS"],
        metrics: [
            { label: "Budget audit cycle", value: "Weekly" },
            { label: "Analyzed per creative", value: "14+ data points" },
        ],
        metricsPills: [
            "Live Campaign Monitoring",
            "Auto Budget Recommendations",
            "Spend vs. Return Breakdown"
        ],
        problem: {
            title: "The Problem",
            description: "Performance marketers spend hours manually pulling data from ad platforms, stitching it into spreadsheets, and deciding where to shift budget. By the time insights are ready, the window to act has already passed, resulting in wasted ad spend."
        },
        problemPoints: [
            "Manual reporting: Data from multiple platforms stitched by hand",
            "Delayed decisions: Insights arrive too late to course-correct",
            "No single source of truth: ROAS, CPC, and CTR scattered across tools",
            "Budget waste: Underperforming ad sets run unchecked for days"
        ],
        solution: "This automation merges hard financial data (Spend/Revenue) with qualitative creative tags. It runs a custom time-decay model to predict creative fatigue days in advance and outputs a mathematically optimized budget reallocation plan to maximize ROAS.",
        builtFor: [
            { persona: "Performance Marketers", description: "Managing paid campaigns across Meta, Google, or influencer channels." },
            { persona: "Growth Teams", description: "Needing real-time spend visibility without manual dashboard reviews." },
            { persona: "Founders / CMOs", description: "Wanting a single automated report on what's working and what to cut." }
        ],
        steps: [
            { title: "Data Fusion", description: "Pulls live ad performance data via API and merges it with a manual 'Creative Tags' sheet to map financial results to specific themes, formats, and influencers." },
            { title: "Fatigue Scoring", description: "Applies a custom JavaScript decay model that penalizes creatives based on days running, declining CTR, and drop in video completion rates." },
            { title: "Budget Optimization", description: "A logic engine calculates the ideal budget distribution, cutting spend on 'Fatigue' or 'Low Grade' ads and reallocating funds to high-ROAS 'Scale' candidates." },
            { title: "Strategic Reporting", description: "Generates a multi-tab Google Sheet report: 'Fatigue Alerts', 'Budget Reallocation Plan', and a Claude-authored qualitative analysis of *why* certain ads are winning." },
        ],
        workflowNodes: [
            { title: "Data Ingestion", description: "Live ad performance metrics fetched from connected ad platforms" },
            { title: "KPI Calculation", description: "Computes ROAS, CPC, CTR, and conversion rates per campaign" },
            { title: "LLM Analysis", description: "Identifies inefficiencies and generates plain-English budget recommendations" },
            { title: "Reporting Output", description: "Full performance ledger saved to Sheets + summary doc generated" }
        ],
        workflowTechStack: ["n8n", "Ad Platform APIs", "Google Sheets", "Claude / GPT-4"],
        before: [
            "Hours pulling data from multiple ad platforms",
            "ROAS calculations done in spreadsheets manually",
            "Budget reallocation decided on feel",
            "Underperforming ads run for days unnoticed",
            "No unified view across campaigns"
        ],
        after: [
            "Live campaign data pulled and consolidated automatically",
            "ROAS, CPC, CTR calculated and ranked instantly",
            "LLM-generated reallocation recommendations",
            "Underperformers flagged immediately",
            "Single sheet with full campaign health overview"
        ],
        techStack: ["n8n (Logic Engine)", "Claude 3.5 Sonnet (Analysis)", "Meta Marketing API", "Google Sheets (Reporting)"],
        architectureLabels: {
            source: "Meta API + Tag Sheet",
            core: "Fatigue & Budget Logic",
            output: "Optimization Report",
        },
        generatedAssets: {
            leftCard: {
                title: "Google Sheets (Campaign Ledger)",
                subtitle: "A live, sortable view of every ad set's performance",
                tags: [
                    "Campaign Name", "Ad Set", "Spend", "Revenue", "ROAS",
                    "Impressions", "Clicks", "CTR", "CPC", "Conversions",
                    "Conversion Rate", "Status", "LLM Recommendation",
                    "Budget Action", "Pulled At"
                ]
            },
            rightCard: {
                title: "Google Docs (Optimization Summary)",
                subtitle: "Plain-English recommendations ready to act on",
                items: [
                    "Top Performing Campaigns",
                    "Underperformers to Pause",
                    "Budget Reallocation Suggestions",
                    "Quick Wins & Observations",
                    "Summary Metrics Table",
                    "Recommended Next Steps"
                ]
            }
        },
        previewPanel: {
            title: "Optimization Preview",
            chips: ["Pause Underperformers", "Scale Winners", "Budget Reallocation"],
            miniRow: {
                url: "Q3 Retargeting - Video",
                hook: "1.2x",
                pillar: "3.5x",
                why: "Decrease Budget 20%",
                replication: "Action Pending"
            }
        }
    },

    // ── SaaS & Lead Gen Automations ──────────────────────────────────────
    "deal-copilot": {
        slug: "deal-copilot",
        title: "Deal Copilot",
        category: "SaaS & Lead Gen",
        description: "Turns discovery notes into a complete follow-up kit: meeting summary, pain points, objection responses, tailored email, and next steps—logged back to your CRM automatically.",
        tags: ["SALES ENABLEMENT", "CRM", "LLM AUTOMATION"],
        metrics: [
            { label: "Dynamic temp scoring", value: "±40 pts" },
            { label: "SOP compliance", value: "100%" },
        ],
        metricsPills: [
            "Instant Follow-ups",
            "Auto Next Steps",
            "Deal Memory Ledger"
        ],
        problem: {
            title: "The Problem",
            description: "After a call, AEs and SEs spend too much time writing follow-ups, aligning internally, and remembering deal context. Notes live in scattered docs, follow-ups are delayed, and critical objections/pain points get lost."
        },
        problemPoints: [
            "Slow follow-ups reduce momentum and reply rates",
            "Context gets lost across handoffs (AE ↔ SE ↔ leadership)",
            "Objection handling is inconsistent across reps",
            "No centralized ‘deal memory’ to learn from and reuse"
        ],
        solution: "This automation acts as a persistent 'Sales Memory'. It ingests every deal interaction, compares it against previous states, and uses an LLM to automatically score deal momentum. It then cross-references your internal Sales SOPs to generate concrete, prioritized next steps for the rep.",
        builtFor: [
            { persona: "Account Executives (AEs)", description: "Faster, better follow-ups without manual drafting." },
            { persona: "Sales Engineers (SEs)", description: "Consistent technical recap + objection responses." },
            { persona: "RevOps / Sales Enablement", description: "Standardized structure and traceable outputs." },
            { persona: "Founders / Sales Leaders", description: "Quick visibility into deal health and next steps." }
        ],
        steps: [
            { title: "Context Aggregation", description: "Reads three Google Sheets simultaneously: the raw chronological interaction logs, the internal Sales SOP rules, and the previous 'Deal Memory' state." },
            { title: "Deal Grouping & Sorting", description: "A JavaScript node filters and groups all interactions by Deal ID, compiling a complete, chronological transcript of every touchpoint for the AI to analyze." },
            { title: "AI Temperature Scoring", description: "OpenAI analyzes the transcripts to calculate a dynamic 'Deal Temperature' (0-100), extracting specific stakeholder sentiments and identifying hidden blockers." },
            { title: "Memory Update & Next Steps", description: "Generates concrete, SOP-backed next actions (with owners and deadlines) and writes the updated state back to the Deal Memory tracker." },
        ],
        workflowNodes: [
            { title: "Input Capture", description: "Discovery notes or transcript, deal metadata, stage, persona" },
            { title: "Context Retrieval", description: "Pulls relevant product modules, proof points, pricing notes, past wins" },
            { title: "LLM Deal Kit Generation", description: "Generates summary, pain points, objections → responses, next steps, and follow-up email" },
            { title: "Log & Notify", description: "Saves outputs to Google Docs/Sheets + updates CRM + sends Slack/email notification" }
        ],
        workflowTechStack: ["n8n", "CRM (HubSpot/Salesforce)", "Google Docs", "Google Sheets", "Gmail/Slack", "Claude/GPT-4"],
        before: [
            "Follow-up email written from scratch after every call",
            "Notes scattered across docs / CRM / chat",
            "Objection responses depend on rep experience",
            "Next steps unclear or not tracked",
            "Deal context forgotten by the next meeting"
        ],
        after: [
            "Follow-up kit generated in minutes",
            "Consistent call summary + key insights every time",
            "Structured objection handling baked into the output",
            "Clear next steps + owners + due dates",
            "Deal memory logged and searchable for reuse"
        ],
        techStack: ["n8n (Workflow Engine)", "GPT-4.1-mini", "LangChain Structured Output", "Google Sheets (CRM)"],
        architectureLabels: {
            source: "Interactions + SOPs",
            core: "AI Memory & Scoring",
            output: "Updated Deal Tracker",
        },
        generatedAssets: {
            leftCard: {
                title: "Google Docs (Deal Follow-up Kit)",
                subtitle: "Every run produces two ready-to-use artifacts",
                tags: [
                    "Meeting Summary", "Stakeholders & Roles", "Key Pain Points", "Buying Triggers",
                    "Requirements", "Objections & Responses", "Risks / Red Flags",
                    "Next Steps (Owner + Due Date)", "Follow-up Email (Subject + Body + CTA)",
                    "Next Call Agenda"
                ]
            },
            rightCard: {
                title: "Google Sheets (Deal Memory Ledger)",
                subtitle: "Every run produces two ready-to-use artifacts",
                items: [
                    "Timestamp, Account, Opportunity Name, Stage",
                    "Primary Persona, Meeting Date, Summary",
                    "Top Pain Points, Objections",
                    "Recommended Response, Next Step 1, Owner 1",
                    "Due Date 1, Next Step 2, Owner 2, Due Date 2",
                    "Follow-up Email Subject, Follow-up Email Link",
                    "CRM Record Link, Status"
                ]
            }
        },
        previewPanel: {
            type: "deal-kit",
            title: "Generated Deal Kit — Acme Corp",
            dealKit: {
                summary: "Discovery call with VP Sales. Key concern is slow rep onboarding and inconsistent pitch quality across regions.",
                painPoints: [
                    "Onboarding takes 6 weeks per new AE",
                    "No standardized objection playbook",
                    "Follow-ups delayed by 48+ hours post-call"
                ],
                nextSteps: [
                    "Send ROI calculator by Friday (Owner: AE)",
                    "Technical deep-dive with SE (Owner: SE, Due: Next Week)"
                ],
                emailSubject: "Re: Acme — Addressing Your Onboarding Gap"
            }
        }
    },
    "support-review-ai": {
        slug: "support-review-ai",
        title: "AI Customer Support for Reviews",
        category: "SaaS & Lead Gen",
        description: "Automatically monitors incoming reviews across platforms, classifies sentiment and urgency, and generates personalised brand-aligned responses — so no review goes unanswered and no issue escalates silently.",
        tags: ["CUSTOMER SUPPORT", "REPUTATION MANAGEMENT", "LLM"],
        metrics: [
            { label: "AI Analysis Architecture", value: "2-pass" },
            { label: "Classification routing", value: "6-category" },
        ],
        metricsPills: [
            "Zero Missed Reviews",
            "Auto-Classified Sentiment",
            "Brand-Aligned Responses"
        ],
        problem: {
            title: "The Problem",
            description: "Support and marketing teams manually check multiple review platforms every day, spending hours drafting individual responses. Negative reviews go unanswered for days, damaging brand reputation, while positive reviews get generic copy-pasted replies that feel inauthentic."
        },
        problemPoints: [
            "Reviews across multiple platforms checked manually every day",
            "Negative reviews go unanswered for 24–72 hours",
            "Generic responses hurt brand perception on public forums",
            "No system to flag urgent complaints before they escalate"
        ],
        solution: "Automatically pulls, classifies, and drafts personalized responses for all customer reviews.",
        builtFor: [
            { persona: "Customer Support Teams", description: "Responding to high volumes of reviews without burning bandwidth on drafting." },
            { persona: "Brand & Marketing Managers", description: "Maintaining consistent, on-brand tone across all public review responses." },
            { persona: "Founders / CX Leaders", description: "Staying on top of reputation health without manual monitoring." }
        ],
        steps: [
            { title: "Review Ingestion", description: "New reviews pulled from connected platforms automatically via trigger or scheduled pull" },
            { title: "Classification", description: "LLM classifies each review: positive / negative / neutral, urgency level, category" }
        ],
        workflowNodes: [
            { title: "Review Ingestion", description: "New reviews pulled from connected platforms automatically via trigger or scheduled pull" },
            { title: "Sentiment & Urgency Classification", description: "LLM classifies each review: positive / negative / neutral, urgency level, core complaint or praise category" },
            { title: "Response Generation", description: "Generates a personalised, brand-aligned response for each review based on tone guidelines and review context" },
            { title: "Log & Alert", description: "Response saved to Sheets for approval + urgent/negative reviews trigger an instant Slack or email alert" }
        ],
        workflowTechStack: ["n8n", "Google Sheets", "Claude / GPT-4", "Slack", "Gmail", "Review Platform API"],
        before: [
            "Checking multiple review platforms daily by hand",
            "Hours drafting individual responses",
            "Negative reviews left unanswered for days",
            "Inconsistent tone across team members",
            "No visibility into review trends over time"
        ],
        after: [
            "Reviews monitored and ingested automatically",
            "Sentiment and urgency classified instantly",
            "Brand-aligned response drafted per review",
            "Urgent / negative reviews flagged for priority",
            "Full review log with trends tracked in Sheets"
        ],
        techStack: ["n8n", "Apify", "GPT-4o", "Google Sheets"],
        architectureLabels: {
            source: "Reviews API",
            core: "Sentiment Engine",
            output: "Sheets + Slack",
        },
        generatedAssets: {
            leftCard: {
                title: "Google Sheets (Review Response Log)",
                subtitle: "A full log of every review and its drafted response",
                tags: [
                    "Timestamp", "Platform", "Reviewer Name", "Rating",
                    "Review Text", "Sentiment", "Urgency Level", "Category",
                    "Draft Response", "Response Status", "Approved By",
                    "Published At", "Notes"
                ]
            },
            rightCard: {
                title: "Slack / Email Alert (Urgent Reviews)",
                subtitle: "Instant notification for reviews that need human eyes",
                items: [
                    "Platform", "Rating", "Reviewer", "Review Snippet",
                    "Sentiment Tag", "Urgency Flag", "Draft Response",
                    "Link to Full Log Row"
                ]
            }
        },
        loomVideoUrl: "https://www.loom.com/embed/6e18f8c2c658485dad4327be151b6484",
    },

    // ── Fintech Automations ──────────────────────────────────────────────
    "invoice-processing": {
        slug: "invoice-processing",
        title: "Invoice Processing Automation",
        category: "Fintech",
        description: "Automatically extracts invoice data, validates it against rules, flags exceptions, and logs everything into a clean AP ledger — so you can process invoices faster with fewer errors.",
        tags: ["FINANCE OPS", "OCR", "ACCOUNTS PAYABLE"],
        metrics: [
            { label: "Handles PDF & JPG", value: "Multimodal" },
            { label: "Extracted per line item", value: "23 fields" },
        ],
        metricsPills: [
            "Auto OCR + Extraction",
            "Exception Flagging",
            "AP Ledger in Sheets"
        ],
        problem: {
            title: "The Problem",
            description: "Finance teams still process invoices manually—downloading PDFs, copying fields into spreadsheets/ERP, and chasing missing PO/vendor details. This slows down approvals and increases the chance of costly errors."
        },
        problemPoints: [
            "Manual copy-paste from PDF invoices into systems",
            "Missing PO / incorrect GST / mismatched totals cause back-and-forth",
            "Duplicate invoices slip through without a consistent check",
            "No clear audit trail of what was received, approved, and paid"
        ],
        solution: "This workflow acts as an automated AP clerk. It listens to a dedicated Gmail inbox, splits attachments by file type, and routes them appropriately: PDFs go to a text extractor, while images are processed by Gemini 2.5 Flash for OCR. An AI classifier verifies the document is actually an invoice before a final GPT agent breaks down complex line items into a strict 23-column Google Sheet schema.",
        builtFor: [
            { persona: "Finance & AP Teams", description: "Faster processing with fewer manual steps." },
            { persona: "Ops Managers", description: "Visibility into pending invoices and blockers." },
            { persona: "Founders", description: "Cleaner cashflow tracking and fewer payment mistakes." }
        ],
        steps: [
            { title: "Email Ingestion & Routing", description: "A Gmail trigger listens for emails with attachments. A switch node detects the file extension, routing PDFs to a native text extractor and images/JPGs to an AI OCR engine." },
            { title: "Multimodal OCR (Gemini)", description: "For image-based invoices, Gemini 2.5 Flash analyzes the visual document, first verifying if it contains mandatory invoice fields, then extracting the raw text." },
            { title: "AI Classification & Parsing", description: "An AI Text Classifier double-checks the text context. Then, a LangChain agent parses the unstructured text against a strict JSON schema to isolate header details and individual line items." },
            { title: "Ledger Sync", description: "The structured JSON output is split out and appended row-by-row into a master 'Invoice' Google Sheet, capturing taxes, item descriptions, and vendor details perfectly." },
        ],
        workflowNodes: [
            { title: "Invoice Ingestion", description: "Invoice received via email upload / Drive folder drop" },
            { title: "OCR + Field Extraction", description: "Extracts vendor, invoice number, dates, line totals, taxes, grand total" },
            { title: "Validation & Exception Rules", description: "Duplicate check, missing PO flag, total mismatch flag, vendor sanity checks" },
            { title: "Ledger + Alerts", description: "Writes to Google Sheets AP ledger + notifies finance on exceptions" }
        ],
        workflowTechStack: ["n8n", "Google Drive/Gmail", "OCR", "Google Sheets", "Slack/Email"],
        before: [
            "Invoices downloaded and entered manually",
            "Frequent data-entry errors (dates, totals, GST)",
            "Missing PO/vendor info discovered late",
            "Duplicate invoices hard to catch",
            "Status updates scattered across email/WhatsApp"
        ],
        after: [
            "Invoice fields extracted automatically",
            "Rule-based validations + exception flags",
            "Clean AP ledger with consistent columns",
            "Duplicate detection built into workflow",
            "Clear status tracking: Received → Review → Approved → Paid"
        ],
        techStack: ["Gmail Trigger", "Gemini 2.5 Flash (Vision)", "GPT-4.1 (Parsing)", "LangChain JSON Parser"],
        architectureLabels: {
            source: "Gmail Attachments",
            core: "OCR + LLM Parsing",
            output: "Structured Ledger",
        },
        generatedAssets: {
            leftCard: {
                title: "Google Sheets (AP Ledger)",
                subtitle: "Every run produces an AP ledger entry + an exception trail",
                tags: [
                    "Timestamp", "Vendor Name", "Invoice Number", "Invoice Date", "Due Date",
                    "Currency", "Subtotal", "Tax", "Total Amount", "PO Number",
                    "Payment Terms", "Category", "Duplicate Status", "Validation Flags",
                    "Assigned To", "Approval Status", "Source Link (PDF)", "Notes"
                ]
            },
            rightCard: {
                title: "Exception Alert (Slack/Email)",
                subtitle: "Every run produces an AP ledger entry + an exception trail",
                items: [
                    "Vendor, Invoice Number, Total Amount",
                    "Flag Reason, Suggested Fix",
                    "Link to PDF, Link to Ledger Row"
                ]
            }
        },
        previewPanel: {
            type: "invoice",
            title: "Parsed Invoice → AP Ledger Row",
            invoiceDetails: {
                vendor: "Acme Supplies Pvt Ltd",
                invoiceNumber: "ACM-INV-10492",
                invoiceDate: "12 Feb 2026",
                dueDate: "12 Mar 2026",
                amount: "₹48,750",
                gstin: "29XXXXXX1234X1Z5"
            },
            validation: {
                poMatch: "Missing",
                duplicateCheck: "No duplicate found"
            },
            action: {
                status: "Needs Review"
            }
        }
    },
    "fraud-copilot": {
        slug: "fraud-copilot",
        title: "AI Fraud Investigation",
        category: "Fintech",
        description: "Automatically analyzes victim and scammer call transcripts, extracts fraud patterns, classifies risk levels, and generates structured investigation reports — turning raw call data into actionable fraud intelligence.",
        tags: ["FINTECH", "FRAUD DETECTION", "CALL INTELLIGENCE"],
        metrics: [
            { label: "Voice Agents deployed", value: "2 parallel" },
            { label: "Interview to transcript", value: "Zero-touch" },
        ],
        metricsPills: [
            "Victim + Scammer Call Analysis",
            "Auto Risk Classification",
            "Structured Investigation Report"
        ],
        problem: {
            title: "The Problem",
            description: "Fraud teams manually review hundreds of call recordings every week, trying to identify patterns, extract key details, and write up investigation reports. This process is slow, inconsistent, and lets patterns slip through that a structured system would catch instantly."
        },
        problemPoints: [
            "Hours spent manually listening to and transcribing calls",
            "Inconsistent classification — depends on the analyst",
            "Fraud patterns not aggregated across cases",
            "Investigation reports written from scratch every time"
        ],
        solution: "This workflow acts as an autonomous digital investigator. Triggered by a new row in a 'Fraud Cases' Google Sheet, it deploys two parallel ElevenLabs conversational AI agents—one designed to gently interview the victim, and another to interrogate the suspected scammer. Once the calls conclude, GPT-4.1 reads the transcripts, summarizes the crucial evidence, and automatically updates the case file.",
        builtFor: [
            { persona: "Fraud Investigation Teams", description: "Faster case analysis without hours of manual call review." },
            { persona: "Risk & Compliance Officers", description: "Consistent, structured reports with full audit trails." },
            { persona: "Fintech Ops Leaders", description: "Aggregate fraud pattern visibility across all cases." }
        ],
        steps: [
            { title: "Case Ingestion", description: "Reads a Google Sheet for new fraud cases, extracting the victim's name and phone number, the scammer's phone number, and the disputed fraud amount." },
            { title: "Parallel Outbound Calls", description: "Triggers two simultaneous HTTP requests to the ElevenLabs Conversational AI API, dispatching custom-prompted voice agents to call both the victim and the scammer." },
            { title: "Transcript Extraction & AI Summary", description: "Uses 'Wait' nodes to pause until the calls complete. It then pulls the raw call transcripts and uses GPT-4.1-mini to generate a concise, paragraph-length summary of the human's responses." },
            { title: "Case File Update", description: "Merges the two AI-generated summaries (Victim Summary + Scammer Summary) and writes them back into the original Google Sheet, updating the case file with instant, actionable intel." },
        ],
        workflowNodes: [
            { title: "Call Ingestion", description: "Victim or scammer call recording uploaded via Drive / email trigger — transcription runs automatically" },
            { title: "Transcript Analysis", description: "LLM extracts fraud type, tactics used, victim vulnerability signals, key timestamps, and extracted entities" },
            { title: "Risk Classification", description: "Classifies fraud category, assigns risk level, flags for escalation if high-risk signals detected" },
            { title: "Report + Alert", description: "Structured investigation report saved to Sheets + Google Docs report generated + high-risk cases trigger instant alert" }
        ],
        workflowTechStack: ["n8n", "Google Drive", "Whisper / Transcription", "Google Sheets", "Google Docs", "Claude / GPT-4", "Slack"],
        before: [
            "Analysts manually listen to call recordings",
            "Notes taken inconsistently per analyst",
            "Fraud patterns invisible across cases",
            "Reports written from scratch per case",
            "High-risk cases identified too late"
        ],
        after: [
            "Call transcripts analyzed automatically",
            "Fraud type, risk level, and signals extracted",
            "Patterns aggregated across all cases",
            "Structured report generated per case",
            "High-risk cases flagged for instant escalation"
        ],
        techStack: ["ElevenLabs (ConvAI)", "GPT-4.1-mini", "n8n (Wait & Merge logic)", "Google Sheets"],
        architectureLabels: {
            source: "Case Database",
            core: "Parallel Voice Agents",
            output: "Transcript & Summaries",
        },
        generatedAssets: {
            leftCard: {
                title: "Google Sheets (Fraud Case Ledger)",
                subtitle: "Every run produces an AP ledger entry + an exception trail",
                tags: [
                    "Case ID", "Timestamp", "Call Type (Victim/Scammer)", "Fraud Category",
                    "Risk Level", "Caller Name", "Phone Number", "Key Signals",
                    "Tactics Identified", "Entities Extracted", "Recommended Action",
                    "Escalation Status", "Analyst Assigned", "Source Recording Link"
                ]
            },
            rightCard: {
                title: "Google Docs (Investigation Report)",
                subtitle: "Every run produces an AP ledger entry + an exception trail",
                items: [
                    "Case Overview, Call Summary",
                    "Fraud Type & Category",
                    "Key Signals & Tactics",
                    "Extracted Entities (names/numbers/accounts)",
                    "Timeline of Events, Risk Assessment",
                    "Recommended Action, Evidence Links"
                ]
            }
        },
        previewPanel: {
            type: "fraud-case",
            title: "Fraud Case Summary — Case #4821",
            fraudCase: {
                callType: "Victim Report",
                fraudCategory: "UPI Impersonation Scam",
                riskLevel: "High",
                keySignals: [
                    "Scammer posed as bank KYC officer",
                    "Victim shared OTP under pressure",
                    "Transaction window: under 4 minutes"
                ],
                recommendedAction: "Escalate to Fraud Ops Team. Block linked UPI handle."
            }
        }
    },

    // ── Scraping Tools ───────────────────────────────────────────────────
    "influencer-scraper": {
        slug: "influencer-scraper",
        title: "AI Influencer Discovery Engine",
        category: "Scraping Tools",
        description: "Automatically scrapes and surfaces relevant creator profiles from Instagram based on your brand's exact ICP, niche, and campaign goals.",
        tags: ["INFLUENCER MARKETING", "APIFY", "GOOGLE SHEETS"],
        metrics: [
            { label: "Prompt to Sheet", value: "Zero-touch" },
            { label: "Claude + SERP + Apify", value: "Multi-API" },
        ],
        metricsPills: [
            "100+ Profiles/Hour",
            "Zero Manual Browsing",
            "ICP-Matched Shortlists"
        ],
        problem: {
            title: "The Problem",
            description: "Marketing teams spend hours manually scrolling Instagram, hunting for creators who fit their brand—with no systematic way to filter by niche, audience quality, or engagement authenticity.",
        },
        problemPoints: [
            "No system: Discovery is based on gut-feel, not data",
            "Time sink: Hours wasted browsing profiles manually",
            "Inconsistent filters: Every team member uses different criteria",
            "Dead ends: High follower counts often hide low engagement"
        ],
        solution: "This workflow automates the entire funnel. You give Claude a natural language prompt (e.g., 'Find tier-1 sustainable living influencers in India'). It generates specific Google search queries, uses the SERP API to scan organic results, extracts Instagram handles from the HTML, and triggers an Apify actor to pull live profile data and compute true engagement rates.",
        builtFor: [
            { persona: "Marketing Managers", description: "Running influencer campaigns across multiple brands or verticals." },
            { persona: "Growth Teams", description: "Needing a fast, repeatable creator pipeline at scale." },
            { persona: "Agencies", description: "Managing discovery across multiple client briefs simultaneously." }
        ],
        steps: [
            { title: "Prompt Parsing (Claude)", description: "A natural language command is sent to Claude 3.5 Sonnet, which breaks it down into structured JSON containing specific search queries, niches, and follower limits." },
            { title: "SERP Search & HTML Scraping", description: "The workflow hits the Google SERP API to find relevant organic listicles and blogs, then uses Regex in a JavaScript node to extract all mentioned Instagram handles." },
            { title: "Profile Scraping (Apify)", description: "The extracted handles are fed into an Apify Instagram Scraper actor, pulling official follower counts, post histories, and biography data." },
            { title: "Metric Calculation & Export", description: "A JavaScript node calculates true engagement rates (Likes + Comments / Followers), filters out bad fits, and appends the vetted influencers into a Google Sheet." },
        ],
        workflowNodes: [
            { title: "Campaign Input", description: "Brand ICP, niche keywords, follower range, and location entered in Sheets" },
            { title: "Apify Scraper", description: "Scrapes Instagram profiles matching the input criteria at scale" },
            { title: "LLM Filter & Enrich", description: "Reviews each profile against brand values, flags mismatches, and calculates engagement" },
            { title: "Shortlist Output", description: "A clean Google Sheets row per creator ready for outreach" }
        ],
        workflowTechStack: ["n8n", "Apify", "Google Sheets", "Claude / GPT-4"],
        before: [
            "Hours of manual Instagram browsing",
            "No consistent filtering criteria",
            "Gut-feel creator selection",
            "Missed creators outside your feed",
            "Data trapped in personal notes"
        ],
        after: [
            "100+ profiles scraped per hour",
            "Strict ICP and niche-based filtering",
            "Structured data for every profile",
            "Broad, systematic platform coverage",
            "Clean output sheet ready for scoring"
        ],
        techStack: ["Claude 3.5 Sonnet", "SERP API", "Apify (Instagram Actor)", "n8n (Regex & Math Logic)"],
        architectureLabels: {
            source: "Prompt → Claude",
            core: "SERP + Apify Scraping",
            output: "Vetted Influencer Sheet",
        },
        generatedAssets: {
            leftCard: {
                title: "Google Sheets Row (Discovery Shortlist)",
                subtitle: "A clean, filterable log of vetted creators",
                tags: [
                    "Creator Handle", "Platform", "Followers", "Engagement Rate",
                    "Niche Tags", "Location", "Bio Summary", "Profile URL",
                    "Fit Score", "Campaign Match Notes", "Scraped At Timestamp"
                ]
            }
        },
        loomVideoUrl: "https://www.loom.com/embed/88fc73cfa71645a9a9e7f8afcc29b5ab",
    },
    // ── B2B Leads Scraper ───────────────────────────────────────────────────
    "b2b-leads-scraper": {
        slug: "b2b-leads-scraper",
        title: "B2B Leads Scraper",
        category: "Scraping Tools",
        description: "Aggregates and cleans contact data from LinkedIn and company websites for highly targeted outbound campaigns.",
        tags: ["Lead Gen", "Data Enrichment"],
        metrics: [
            { label: "Manual entry", value: "Zero" },
            { label: "Data quality", value: "Verified" },
        ],
        problem: {
            title: "Bad Lead Data",
            description: "Sales teams waste time on unverified leads scraped from unreliable sources, with bounce rates killing sender reputation.",
        },
        solution: "Aggregates contact data from LinkedIn and company websites, deduplicates, verifies emails, and delivers clean lead lists for outbound.",
        steps: [
            { title: "Source Scraping", description: "Extracts profiles from LinkedIn and company websites." },
            { title: "Data Cleaning", description: "Deduplicates, normalizes, and structures the raw data." },
            { title: "Email Verification", description: "Validates emails through waterfall verification." },
            { title: "List Delivery", description: "Pushes verified leads to CRM or outbound tools." },
        ],
        before: ["Manual data entry", "Unverified contacts", "High bounce rates", "Scattered lead sources"],
        after: ["Zero manual data entry", "Verified contact data", "Clean, targeted lists", "Direct CRM integration"],
        techStack: ["Apify", "Clay", "Python", "HubSpot API"],
    },

    // ── Operations Automations ───────────────────────────────────────────
    "sku-analyzer": {
        slug: "sku-analyzer",
        title: "MedSupply Direct Reorder Agent",
        category: "Operations",
        description: "An autonomous AI agent that reads incoming B2B medical supply reorder emails, extracts product SKUs and quantities, validates inventory, and drafts the sales order quote automatically.",
        tags: ["B2B SALES", "ORDER AUTOMATION", "LLMS"],
        metrics: [
            { label: "14-Day", value: "Predictive Window" },
            { label: "Discount", value: "Algorithmic" }
        ],
        metricsPills: [
            "Zero-Touch Order Entry",
            "SKU & Inventory Validation",
            "Instant Quote Drafting"
        ],
        problem: {
            title: "The Problem",
            description: "B2B medical supply distributors receive hundreds of reorder requests via email daily. Sales reps spend hours reading messy emails, deciphering product names into exact SKUs, checking inventory manually, and typing up quotes in the ERP."
        },
        problemPoints: [
            "Messy emails: Clients use slang or old product names instead of SKUs",
            "Manual data entry: Typing quantities into the ERP is slow and error-prone",
            "Inventory delays: Reps have to check stock manually before quoting",
            "Lost revenue: Slow turnaround times on simple reorders"
        ],
        solution: "This workflow acts as an algorithmic buyer. It pulls live data across Inventory, Suppliers, and SKU-Mappings. Using custom JavaScript, it calculates a 14-day predictive run-rate, automatically bumps up order quantities to hit supplier discount tiers, groups the POs by vendor, and uses Claude 3.5 Sonnet to draft the exact purchase order emails.",
        builtFor: [
            { persona: "B2B Sales Reps", description: "Stop doing data entry and focus on closing new business." },
            { persona: "Sales Operations", description: "Standardize order intake and reduce human error in quoting." },
            { persona: "Supply Chain Managers", description: "Faster order velocity from inbox to fulfillment." }
        ],
        steps: [
            { title: "Data Aggregation", description: "Reads three separate Google Sheets simultaneously: Live Inventory levels, Supplier master data (lead times, MOQs, discount tiers), and the SKU-to-Supplier cost mapping." },
            { title: "Predictive Math Engine", description: "A JavaScript node calculates projected stock in 14 days based on avg. daily sales. If a stockout is pending, it calculates the optimal order quantity to cover lead time while maximizing volume discounts." }
        ],
        workflowNodes: [
            { title: "Email Ingestion", description: "Agent monitors inbox for reorder requests and extracts the raw text and sender details." },
            { title: "SKU Extraction & Mapping", description: "LLM parses the messy email text, identifies requested items, and maps them to exact SKUs in the product catalog." },
            { title: "Inventory & Pricing Check", description: "Validates requested quantities against current stock levels and pulls account-specific pricing." },
            { title: "Quote Generation", description: "Drafts the formal sales quote, logs the order in Sheets/ERP, and prepares the email reply for rep approval." }
        ],
        workflowTechStack: ["n8n", "Gmail / Outlook", "Google Sheets", "Claude / GPT-4", "ERP API"],
        before: [
            "Rep reads reorder email",
            "Manually translates client terms to SKUs",
            "Checks inventory system for stock",
            "Types order details into ERP / Quote tool",
            "Drafts reply to client hours later"
        ],
        after: [
            "AI reads reorder email instantly",
            "Fuzzy-matches client terms to exact SKUs",
            "Auto-checks inventory availability",
            "Drafts the quote and logs it in the system",
            "Rep just reviews and clicks \"Send\""
        ],
        techStack: ["Google Sheets (Relational DB)", "n8n (Merge & JS Math)", "Claude 3.5 Sonnet", "LangChain Agents"],
        architectureLabels: {
            source: "3x Sheet Merge",
            core: "Predictive Math + LLM",
            output: "Drafts & Savings Report",
        },
        generatedAssets: {
            leftCard: {
                title: "Google Sheets (Order Intake Ledger)",
                subtitle: "A live queue of all processed reorders",
                tags: [
                    "Timestamp", "Client Name", "Sender Email",
                    "Original Email Text", "Extracted Items (JSON)",
                    "Mapped SKUs", "Total Value", "Inventory Status",
                    "Quote Status", "Rep Assigned"
                ]
            },
            rightCard: {
                title: "Drafted Reply (Gmail / CRM)",
                subtitle: "A ready-to-send quote awaiting rep approval",
                items: [
                    "Client Greeting",
                    "Order Summary Table (SKU, Name, Qty, Price)",
                    "Out-of-Stock Notifications (if any)",
                    "Total Quote Amount",
                    "Next Steps / Payment Link, Rep Signature"
                ]
            }
        },
        loomVideoUrl: "https://www.loom.com/embed/56b3adcba9bd41428d0127855baf32c8",
    },
};

export const categories = [
    { key: "Marketing & GTM", label: "Marketing & GTM Automations", badgeClass: "bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent-secondary)]/20 border border-[var(--accent)]/30 text-white" },
    { key: "SaaS & Lead Gen", label: "SaaS & Lead Gen Automations", badgeClass: "bg-purple-500/20 text-purple-400" },
    { key: "Fintech", label: "Fintech Automations", badgeClass: "bg-emerald-500/20 text-emerald-400" },
    { key: "Scraping Tools", label: "Scraping Tools", badgeClass: "bg-amber-500/20 text-amber-400" },
    { key: "Operations", label: "Operations Automations", badgeClass: "bg-rose-500/20 text-rose-400" },
] as const;

import { DocumentData } from "@/components/DocumentCard";

export const caseStudiesData: DocumentData[] = [
    {
        id: "cs-1",
        title: "Mosaic's AI Creative Engine: Scaling ROAS & Market Share",
        problemStatement: "Manual, intuition-driven workflows severely bottlenecked ad creation, taking over 48 hours to research, script, and source influencers per campaign.",
        proposedSolution: "Designed an AI-driven creative automation framework. The system automates influencer scraping, scoring, and script generation—reducing script TAT to 30 mins and increasing creative testing velocity by 4X.",
        tags: ["PERFORMANCE MARKETING", "AI AUTOMATION", "GTM STRATEGY"],
        pdfLink: "https://drive.google.com/file/d/14v2RF4nt5tebKrqO8xH5dQzUceiSfgGU/view?usp=sharing",
        gradientClass: "bg-gradient-to-br from-green-500/20 to-emerald-500/10",
        companyLogoUrl: "/mosaic-logo.png",
        companyName: "Mosaic",
        logoBgColor: "#0B1A14"
    }
];

export const sectorThesisData: DocumentData[] = [
    {
        id: "st-1",
        title: "Enterprise AI in India: Solving the Sovereign Deployment Gap",
        problemStatement: "Despite 47% of Indian enterprises having Generative AI use cases in production, they face a critical deployment bottleneck. Traditional System Integrators take 30-45 days to deploy, global models fail at code-mixed Indic languages, and sovereign compute premiums squeeze margins.",
        proposedSolution: "A fundamental value chain shift from labor arbitrage to cognitive arbitrage. I analyzed how players like Sarvam AI (Sovereign Models), Emergent (Agentic Platforms), and Blue Machines AI are bypassing legacy integrators to achieve 5-7 day deployment times and outcome-based pricing.",
        tags: ["MARKET RESEARCH", "ENTERPRISE SaaS", "INVESTMENT MEMO"],
        pdfLink: "https://drive.google.com/file/d/1JDQzdv8dgN8wjp5YpfI42qbhVllDEdzG/view?usp=sharing",
        gradientClass: "bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10",
        companyLogoUrl: "/Emergent-Logo-PNG-SVG-Vector-01.png",
        companyName: "Emergent AI",
        logoBgColor: "#f1f5f9",
        solutionLabel: "The Thesis:"
    },
    {
        id: "st-2",
        title: "India SaaS 3.0: The Rising CAC Crisis & The Path Forward",
        problemStatement: "Customer Acquisition Costs (CAC) in Indian SaaS have surged 222% since 2019, while payback periods have stretched to 14–18 months. Horizontal SaaS startups are burning capital on inefficient GTM motions, compressing margins and causing a 30% YoY spike in startup shutdowns.",
        proposedSolution: "The CAC crisis isn't a death knell—it's a filter. I analyzed how the next generation of winners will abandon horizontal playbooks. The path to profitability relies on three distinct pivots: deep Vertical-First dominance, Product-Led Growth (PLG) for SMBs, and outcome-based Service-as-Software models.",
        tags: ["GTM STRATEGY", "VERTICAL SAAS", "UNIT ECONOMICS"],
        pdfLink: "https://drive.google.com/file/d/1fkhKKpK6c0Kz3wE4jJUhSH6k6RnGV2rR/view?usp=sharing",
        pptLink: "https://drive.google.com/file/d/1ISJxfOnoLj5tsSZ8sZe3jIlHwJvvwUNr/view?usp=sharing",
        gradientClass: "bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10",
        companyLogoUrl: "/ChatGPT Image Feb 25, 2026, 01_48_47 AM (1).png",
        companyName: "India SaaS 3.0",
        logoBgColor: "#ffffff",
        imageClassName: "scale-150",
        solutionLabel: "The Thesis:"
    }
];
