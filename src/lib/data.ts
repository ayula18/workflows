
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
    loomVideoUrl?: string;
}

export const automations: Record<string, Automation> = {
    // ── Marketing & GTM Automations ──────────────────────────────────────
    "influencer-scoring": {
        slug: "influencer-scoring",
        title: "AI Influencer Fit/Scoring Automation",
        category: "Marketing & GTM",
        description: "Scores influencer alignment with brand narratives using Claude 3.7 Sonnet and Apify scrapes, eliminating manual guesswork from marketing campaigns.",
        tags: ["Influencer Marketing", "LLMs", "Apify"],
        metrics: [
            { label: "Creator acceptance rate", value: "80%" },
            { label: "Profiles scored per hour", value: "100+" },
        ],
        problem: {
            title: "The Problem",
            description: "Marketing teams spend days manually researching influencers, often relying on gut-feel to pick creators. This leads to poor brand fit, diluted messaging, and wasted campaign budgets on influencers with fake engagement or misaligned audiences.",
        },
        solution: "This automation uses LLMs to cross-reference scraped influencer metrics against the brand's exact ICP, target audience, and campaign goals—automatically generating a weighted score and surfacing top-tier creators for every brief.",
        steps: [
            { title: "Data Ingestion", description: "Loads brand ICP, campaign goals, and raw scraped influencer profiles (followers, engagement rate, bio) from Google Sheets." },
            { title: "Pre-Filtering", description: "Runs an initial logic pass to remove low-engagement, low-follower, or incomplete profiles, saving LLM tokens." },
            { title: "Claude 3.7 Analysis", description: "Claude evaluates the influencer against the brand's exact values, scoring them across 5 weighted dimensions including Brand Safety and Audience Match." },
            { title: "Tiering & Export", description: "Calculates a final weighted score, assigns a Priority Tier (1-4), and exports the ranked shortlist back to Sheets with exact reasoning." },
        ],
        before: ["Manual influencer research", "Gut-feel creator selection", "High risk of brand safety issues", "Days spent vetting profiles"],
        after: ["AI-ranked creator shortlists", "80% creator acceptance rate", "Scored against exact brand ICP", "Minutes, not days"],
        techStack: ["Claude 3.7 Sonnet", "n8n", "Apify", "Google Sheets"],
        architectureLabels: {
            source: "Brand Data + Scrapes",
            core: "n8n Pre-filter + Claude Scoring",
            output: "Ranked Google Sheet",
        },
        loomVideoUrl: "https://www.loom.com/embed/b89f8ede05aa4265930fb9e3e3cc8a67",
    },
    "brief-storyboard": {
        slug: "brief-storyboard",
        title: "Brief, Script & Storyboard Generator",
        category: "Marketing & GTM",
        description: "Automates end-to-end campaign creation using RAG to match influencer strengths with brand objectives, drastically cutting content turnaround time.",
        tags: ["Content Gen", "RAG", "OpenAI"],
        metrics: [
            { label: "Turnaround time per brief", value: "30 Mins" },
            { label: "Faster creative testing", value: "3x" },
        ],
        problem: {
            title: "The Problem",
            description: "Developing creative briefs and scripts for influencers is a massive bottleneck. Brand managers spend hours writing custom guidelines, often resulting in generic scripts that don't match the creator's authentic tone or past top-performing content.",
        },
        solution: "This workflow utilizes RAG (Retrieval-Augmented Generation) to ingest past top-performing reels. It cross-references the influencer's unique style with brand goals, autonomously generating a custom strategy, Hinglish script, and visual storyboard directly into Google Docs.",
        steps: [
            { title: "RAG & Data Ingestion", description: "Merges live influencer data from Sheets and queries an in-memory Vector Store of past top-performing reels." },
            { title: "Strategy Selection", description: "GPT-4.1 analyzes the data to select the optimal content archetype (e.g., testimonial, explainer) and emotional driver." },
            { title: "Script Generation", description: "Generates a customized, multi-hook Hinglish script tailored to the influencer's tone and the brand's exact must-have keywords." },
            { title: "Doc Export", description: "Automatically formats and writes the Brief, Script, and Scene-by-Scene Storyboard directly into structured Google Docs." },
        ],
        before: ["5-7 days turnaround time", "Generic, copy-pasted scripts", "Disconnect between brand & creator tone", "Manual Google Doc formatting"],
        after: ["Ready in under 30 minutes", "RAG-informed custom strategies", "Authentic Hinglish script delivery", "Auto-generated Google Docs"],
        techStack: ["OpenAI GPT-4o", "LangChain RAG", "Google Docs API", "n8n Agents"],
        architectureLabels: {
            source: "Sheets + Vector DB",
            core: "Langchain RAG + OpenAI",
            output: "Formatted Google Docs",
        },
        loomVideoUrl: "https://www.loom.com/embed/28bf1805af474cfa98eddca035f2bfff",
    },
    "video-competitor-analyzer": {
        slug: "video-competitor-analyzer",
        title: "AI Reel / Video Analyzer (Competitors & Trends)",
        category: "Marketing & GTM",
        description: "Turns any competitor or influencer reel into structured insights—hook type, archetype, narrative, CTA, pacing, and more—exported as clean training data for creative strategy.",
        tags: ["Video Intelligence", "Gemini", "Market Intel"],
        metrics: [
            { label: "Input needed", value: "1 link" },
            { label: "Captured per reel", value: "10+ fields" },
        ],
        problem: {
            title: "The Problem",
            description: "Teams often track competitor/influencer reels manually—saving links, guessing what worked, and writing inconsistent notes. Valuable patterns (hooks, archetypes, CTAs) get lost across spreadsheets and chats, making creative iteration slow and subjective.",
        },
        solution: "This automation converts any reel link into a standardized analysis using Gemini video understanding, forcing a strict JSON schema so every reel is comparable. The output becomes a clean 'creative training dataset' inside Google Sheets for faster trend spotting and better briefs.",
        steps: [
            { title: "Chat Link Ingestion", description: "User drops a Google Drive reel/video link into a chat-trigger endpoint—no file uploads or manual downloads." },
            { title: "Drive Link Normalization", description: "Extracts the Drive file ID and converts it into a direct downloadable URL to make the video accessible to the analyzer." },
            { title: "Gemini Video Analysis", description: "Gemini analyzes the reel and returns strict JSON: hook text/type, archetype, narrative structure, emotional driver, CTA, on-screen text, audio style, pacing, and dominant emotion." },
            { title: "Training Data Export", description: "Parses and normalizes the JSON into flat columns and appends a new row into Google Sheets to build a reusable creative intelligence dataset." },
        ],
        before: ["Manual reel watching + note taking", "Inconsistent analysis across team members", "Hard to compare reels at scale", "Trend tracking becomes slow and subjective"],
        after: ["One-link → structured reel breakdown", "Standard JSON schema for consistency", "Comparable fields across competitors/influencers", "Auto-logged to Sheets as training data"],
        techStack: ["n8n", "Google Gemini", "Google Drive URL parsing", "Google Sheets"],
        architectureLabels: {
            source: "Reel link (Drive URL)",
            core: "n8n + Gemini Video Analysis",
            output: "Creative training sheet",
        },
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
        loomVideoUrl: "https://www.loom.com/embed/57bdcbba29494d7c9cffe3bad7de6308",
    },
    "roas-optimizer": {
        slug: "roas-optimizer",
        title: "AI ROAS Optimizer & Fatigue Detector",
        category: "Marketing & GTM",
        description: "A financial modeling engine that connects ad spend to influencer creative tags, detecting fatigue before it kills ROI and automatically reallocating budget to winning formats.",
        tags: ["Ad Tech", "Financial Modeling", "Meta API"],
        metrics: [
            { label: "Budget audit cycle", value: "Weekly" },
            { label: "Analyzed per creative", value: "14+ data points" },
        ],
        problem: {
            title: "The Problem",
            description: "Performance marketers fly blind when running hundreds of influencer creatives. Native ad managers show *which* ad won, but not *why* (e.g., was it the 'Confidence' theme or the 'Testimonial' format?).",
        },
        solution: "This automation merges hard financial data (Spend/Revenue) with qualitative creative tags. It runs a custom time-decay model to predict creative fatigue days in advance and outputs a mathematically optimized budget reallocation plan to maximize ROAS.",
        steps: [
            { title: "Data Fusion", description: "Pulls live ad performance data via API and merges it with a manual 'Creative Tags' sheet to map financial results to specific themes, formats, and influencers." },
            { title: "Fatigue Scoring", description: "Applies a custom JavaScript decay model that penalizes creatives based on days running, declining CTR, and drop in video completion rates." },
            { title: "Budget Optimization", description: "A logic engine calculates the ideal budget distribution, cutting spend on 'Fatigue' or 'Low Grade' ads and reallocating funds to high-ROAS 'Scale' candidates." },
            { title: "Strategic Reporting", description: "Generates a multi-tab Google Sheet report: 'Fatigue Alerts', 'Budget Reallocation Plan', and a Claude-authored qualitative analysis of *why* certain ads are winning." },
        ],
        before: ["Manually checking ads manager daily", "Reacting only after ROAS crashes", "Guessing which creative themes work", "Budget wasted on fatigued ads"],
        after: ["Proactive fatigue alerts (Red/Yellow/Green)", "Mathematically optimized budget splits", "Granular theme & format ROI analysis", "Automated weekly strategy reports"],
        techStack: ["n8n (Logic Engine)", "Claude 3.5 Sonnet (Analysis)", "Meta Marketing API", "Google Sheets (Reporting)"],
        architectureLabels: {
            source: "Meta API + Tag Sheet",
            core: "Fatigue & Budget Logic",
            output: "Optimization Report",
        },
    },

    // ── SaaS & Lead Gen Automations ──────────────────────────────────────
    "deal-copilot": {
        slug: "deal-copilot",
        title: "Deal Copilot & Sales Memory",
        category: "SaaS & Lead Gen",
        description: "An AI-powered CRM companion that tracks chronological deal interactions, automatically scores 'Deal Temperature', and dictates exact next steps based on your sales SOPs.",
        tags: ["CRM Automation", "Deal Intelligence", "OpenAI"],
        metrics: [
            { label: "Dynamic temp scoring", value: "±40 pts" },
            { label: "SOP compliance", value: "100%" },
        ],
        problem: {
            title: "The Problem",
            description: "Enterprise sales cycles are long and complex. Reps lose track of what was said 3 weeks ago, fail to identify hidden stakeholders, and often miss critical security blockers until it's too late.",
        },
        solution: "This automation acts as a persistent 'Sales Memory'. It ingests every deal interaction, compares it against previous states, and uses an LLM to automatically score deal momentum. It then cross-references your internal Sales SOPs to generate concrete, prioritized next steps for the rep.",
        steps: [
            { title: "Context Aggregation", description: "Reads three Google Sheets simultaneously: the raw chronological interaction logs, the internal Sales SOP rules, and the previous 'Deal Memory' state." },
            { title: "Deal Grouping & Sorting", description: "A JavaScript node filters and groups all interactions by Deal ID, compiling a complete, chronological transcript of every touchpoint for the AI to analyze." },
            { title: "AI Temperature Scoring", description: "OpenAI analyzes the transcripts to calculate a dynamic 'Deal Temperature' (0-100), extracting specific stakeholder sentiments and identifying hidden blockers." },
            { title: "Memory Update & Next Steps", description: "Generates concrete, SOP-backed next actions (with owners and deadlines) and writes the updated state back to the Deal Memory tracker." },
        ],
        before: ["Reps forgetting past call details", "Subjective, gut-feeling pipeline forecasting", "Sales SOPs living in unused PDFs", "Missed follow-ups on critical blockers"],
        after: ["Persistent chronological deal memory", "Mathematical momentum scoring (Cold/Warm/Hot)", "SOPs automatically enforced via LLM prompts", "Actionable, prioritized next steps generated"],
        techStack: ["n8n (Workflow Engine)", "GPT-4.1-mini", "LangChain Structured Output", "Google Sheets (CRM)"],
        architectureLabels: {
            source: "Interactions + SOPs",
            core: "AI Memory & Scoring",
            output: "Updated Deal Tracker",
        },
    },
    "support-review-ai": {
        slug: "support-review-ai",
        title: "Customer Support Review AI",
        category: "SaaS & Lead Gen",
        description: "Monitors, categorizes, and drafts personalized responses for incoming customer reviews across platforms.",
        tags: ["CX", "Sentiment Analysis"],
        metrics: [
            { label: "Response TAT", value: "Instant" },
            { label: "Coverage", value: "All platforms" },
        ],
        problem: {
            title: "Unmanaged Reviews",
            description: "Customer reviews pile up across platforms—G2, Capterra, app stores—without timely responses, damaging brand perception.",
        },
        solution: "Monitors review platforms in real-time, categorizes sentiment, and drafts contextual, on-brand responses for human approval.",
        steps: [
            { title: "Review Monitoring", description: "Scrapes G2, Capterra, app stores, and social platforms for new reviews." },
            { title: "Sentiment Analysis", description: "Classifies reviews by sentiment and urgency." },
            { title: "Response Drafting", description: "AI drafts personalized, on-brand responses tailored to each review." },
            { title: "Approval & Posting", description: "Routes drafts for approval and publishes responses." },
        ],
        before: ["Missed customer reviews", "Days-late responses", "Generic copy-paste replies", "No sentiment tracking"],
        after: ["Instant response TAT", "Personalized replies", "Full platform coverage", "Sentiment dashboards"],
        techStack: ["Apify", "OpenAI GPT-4", "Slack API", "Airtable"],
    },

    // ── Fintech Automations ──────────────────────────────────────────────
    "invoice-processing": {
        slug: "invoice-processing",
        title: "Invoice Processing Pipeline",
        category: "Fintech",
        description: "Extracts line items from varied invoice PDFs using OCR/LLMs and automatically reconciles them with accounting software.",
        tags: ["Fintech", "OCR"],
        metrics: [
            { label: "Data extraction", value: "100%" },
            { label: "Processing", value: "Fully automated" },
        ],
        problem: {
            title: "Manual Data Entry",
            description: "Finance teams manually key in invoice line items from dozens of PDF formats daily, leading to errors, delays, and reconciliation nightmares.",
        },
        solution: "An OCR + LLM pipeline that reads any invoice format, extracts structured line items, and auto-reconciles them with accounting software.",
        steps: [
            { title: "Invoice Ingestion", description: "Accepts invoices via email, upload, or shared drive." },
            { title: "OCR Extraction", description: "Converts PDF/image invoices to structured text using OCR." },
            { title: "LLM Parsing", description: "AI extracts line items, amounts, tax, and vendor details." },
            { title: "Reconciliation", description: "Matches extracted data against accounting software entries." },
        ],
        before: ["Manual invoice keying", "Format inconsistencies", "Reconciliation errors", "Hours of daily data entry"],
        after: ["100% automated extraction", "Any format supported", "Auto-reconciliation", "Zero manual data entry"],
        techStack: ["Tesseract OCR", "OpenAI GPT-4", "Python", "QuickBooks API"],
    },
    "fraud-copilot": {
        slug: "fraud-copilot",
        title: "Fraud Investigation Copilot",
        category: "Fintech",
        description: "Cross-references victim and scammer call transcripts against fraud databases to flag anomalies in real-time.",
        tags: ["Risk Ops", "Verification"],
        metrics: [
            { label: "Flagging", value: "Real-time" },
            { label: "Accuracy", value: "High precision" },
        ],
        problem: {
            title: "Slow Investigations",
            description: "Fraud analysts manually cross-reference call transcripts with databases, causing bottlenecks and delayed case resolution.",
        },
        solution: "Automatically transcribes and cross-references call data against fraud databases, flagging anomalies and suspicious patterns in real-time.",
        steps: [
            { title: "Transcript Ingestion", description: "Processes victim and scammer call recordings." },
            { title: "Entity Extraction", description: "Extracts names, phone numbers, account details from transcripts." },
            { title: "Database Matching", description: "Cross-references entities against fraud databases and watchlists." },
            { title: "Anomaly Flagging", description: "Flags inconsistencies and suspicious patterns for analyst review." },
        ],
        before: ["Manual transcript review", "Hours per investigation", "Missed fraud patterns", "Delayed case resolution"],
        after: ["Real-time anomaly flagging", "Automated cross-referencing", "Faster case resolution", "Higher detection accuracy"],
        techStack: ["OpenAI Whisper", "Python", "PostgreSQL", "Custom Fraud DB"],
    },

    // ── Scraping Tools ───────────────────────────────────────────────────
    "influencer-scraper": {
        slug: "influencer-scraper",
        title: "AI Influencer Scraper",
        category: "Scraping Tools",
        description: "Automated pipeline using Apify to discover niche influencers based on granular audience demographics.",
        tags: ["Data Scraping", "Apify"],
        metrics: [
            { label: "Profiles mapped", value: "10k+" },
            { label: "Discovery", value: "Fully automated" },
        ],
        problem: {
            title: "Manual Discovery",
            description: "Finding niche influencers requires hours of manual search across platforms, with no systematic way to filter by audience demographics.",
        },
        solution: "An Apify-powered scraping pipeline that discovers and profiles influencers based on granular audience data—location, interests, engagement rates.",
        steps: [
            { title: "Platform Scraping", description: "Crawls Instagram, YouTube, and TikTok for influencer profiles." },
            { title: "Audience Analysis", description: "Extracts follower demographics, engagement rates, and content themes." },
            { title: "Filtering & Scoring", description: "Applies niche-specific filters and ranks profiles." },
            { title: "Export", description: "Delivers a cleaned dataset to Airtable or Google Sheets." },
        ],
        before: ["Manual platform searching", "No audience data", "Hours of discovery work", "Incomplete influencer lists"],
        after: ["10k+ profiles mapped", "Granular audience data", "Automated discovery pipeline", "Clean, exportable datasets"],
        techStack: ["Apify", "Python", "Airtable", "Google Sheets API"],
    },
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
        title: "Automated SKU Analyzer",
        category: "Operations",
        description: "Monitors inventory velocity for B2C brands, automatically triggering reordering alerts and dynamic discounting rules.",
        tags: ["Supply Chain", "D2C"],
        metrics: [
            { label: "Inventory flow", value: "Optimized" },
            { label: "Alerts", value: "Automated" },
        ],
        problem: {
            title: "Inventory Blind Spots",
            description: "D2C brands overstock slow-moving SKUs while fast sellers go out of stock—losing revenue on both ends.",
        },
        solution: "Monitors SKU velocity in real-time, triggers reorder alerts for fast movers, and applies dynamic discounting to slow-moving inventory.",
        steps: [
            { title: "Velocity Tracking", description: "Monitors sales velocity per SKU across channels." },
            { title: "Threshold Alerts", description: "Triggers reorder alerts when fast-moving SKUs hit safety stock levels." },
            { title: "Dynamic Discounting", description: "Applies automated markdowns to slow-moving inventory." },
            { title: "Reporting", description: "Generates weekly inventory health dashboards." },
        ],
        before: ["Manual inventory checks", "Stockouts on bestsellers", "Dead stock piling up", "No velocity insights"],
        after: ["Optimized inventory flow", "Automated reorder alerts", "Dynamic discount rules", "Real-time SKU dashboards"],
        techStack: ["Shopify API", "Python", "Google Sheets", "Slack API"],
    },
};
