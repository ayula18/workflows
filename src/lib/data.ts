
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
        title: "Amazon Review Intelligence",
        category: "SaaS & Lead Gen",
        description: "Turn raw customer feedback into actionable product strategy. This automation scrapes Amazon reviews in real-time, classifies them by sentiment and urgency, and generates an executive summary of critical product issues.",
        tags: ["E-Commerce Intel", "Apify", "GPT-4o-mini"],
        metrics: [
            { label: "AI Analysis Architecture", value: "2-pass" },
            { label: "Classification routing", value: "6-category" },
        ],
        problem: {
            title: "The Problem",
            description: "D2C brands and product managers struggle to parse thousands of Amazon reviews manually. Critical issues—like a sudden spike in 'Delivery' complaints or 'Product Quality' defects—get buried, leading to drops in seller ratings and lost revenue.",
        },
        solution: "Triggered by pasting a simple Amazon URL into a chat, this workflow leverages Apify to scrape recent reviews. It uses a dual-pass AI architecture: first classifying each individual review (Sentiment, Category, Urgency), and then analyzing the aggregated dataset to flag the most critical negative feedback and dictate immediate next steps.",
        steps: [
            { title: "Chat Trigger & Scraping", description: "A user drops an Amazon product URL into the chat interface. The workflow triggers an Apify Actor to synchronously scrape the latest verified reviews." },
            { title: "Micro-Level AI Classification", description: "Each review is passed to GPT-4o-mini. The AI structures the unstructured text, assigning Sentiment (Pos/Neu/Neg), Category (Pricing, Quality, Delivery, etc.), and Urgency (High/Med/Low)." },
            { title: "Database Enrichment", description: "The raw reviews and their new AI-generated classifications are appended and updated into a central 'RawReviews' Google Sheet for historical tracking." },
            { title: "Macro-Level Insights", description: "The workflow aggregates the freshly enriched data and runs a second AI prompt to determine the 'overall sentiment', identify the most critical negative review, and generate 3 actionable recommendations." },
        ],
        before: ["Reading Amazon reviews one by one", "No real-time alerts for 1-star reviews", "Subjective categorization of complaints", "Critical product defects missed in the noise"],
        after: ["Instant URL-to-Analysis pipeline", "Every review mathematically categorized", "High-urgency issues flagged immediately", "Macro-level product strategy summaries"],
        techStack: ["n8n (Webhook & Webhook response)", "Apify (Amazon Scraper)", "GPT-4o-mini (JSON Mode)", "Google Sheets"],
        architectureLabels: {
            source: "Chat URL → Apify",
            core: "Micro & Macro LLM Analysis",
            output: "Structured Sheets + Insights",
        },
        loomVideoUrl: "https://www.loom.com/embed/6e18f8c2c658485dad4327be151b6484",
    },

    // ── Fintech Automations ──────────────────────────────────────────────
    "invoice-processing": {
        slug: "invoice-processing",
        title: "Smart Invoice Processor",
        category: "Fintech",
        description: "An end-to-end Accounts Payable automation that watches your inbox, extracts data from both PDFs and images using multimodal AI, and structures complex line-item data directly into your ledger.",
        tags: ["Accounts Payable", "Multimodal AI", "OCR"],
        metrics: [
            { label: "Handles PDF & JPG", value: "Multimodal" },
            { label: "Extracted per line item", value: "23 fields" },
        ],
        problem: {
            title: "The Problem",
            description: "Finance teams spend countless hours manually keying in data from invoices. The challenge isn't just the sheer volume, but the varying formats—some vendors send clean PDFs, while others send photos of physical receipts via email.",
        },
        solution: "This workflow acts as an automated AP clerk. It listens to a dedicated Gmail inbox, splits attachments by file type, and routes them appropriately: PDFs go to a text extractor, while images are processed by Gemini 2.5 Flash for OCR. An AI classifier verifies the document is actually an invoice before a final GPT agent breaks down complex line items into a strict 23-column Google Sheet schema.",
        steps: [
            { title: "Email Ingestion & Routing", description: "A Gmail trigger listens for emails with attachments. A switch node detects the file extension, routing PDFs to a native text extractor and images/JPGs to an AI OCR engine." },
            { title: "Multimodal OCR (Gemini)", description: "For image-based invoices, Gemini 2.5 Flash analyzes the visual document, first verifying if it contains mandatory invoice fields, then extracting the raw text." },
            { title: "AI Classification & Parsing", description: "An AI Text Classifier double-checks the text context. Then, a LangChain agent parses the unstructured text against a strict JSON schema to isolate header details and individual line items." },
            { title: "Ledger Sync", description: "The structured JSON output is split out and appended row-by-row into a master 'Invoice' Google Sheet, capturing taxes, item descriptions, and vendor details perfectly." },
        ],
        before: ["Manual data entry for every invoice", "Struggling to read photos of receipts", "Line-item tax calculations done by hand", "Lost or forgotten email attachments"],
        after: ["Zero-touch data entry from inbox to sheet", "Gemini Vision reads physical receipt photos", "Taxes and line-items automatically parsed", "Strict data formatting (Currency, Dates, etc.)"],
        techStack: ["Gmail Trigger", "Gemini 2.5 Flash (Vision)", "GPT-4.1 (Parsing)", "LangChain JSON Parser"],
        architectureLabels: {
            source: "Gmail Attachments",
            core: "OCR + LLM Parsing",
            output: "Structured Ledger",
        },
    },
    "fraud-copilot": {
        slug: "fraud-copilot",
        title: "AI Fraud Investigation Agent",
        category: "Fintech",
        description: "An autonomous voice-agent workflow that instantly initiates parallel phone calls to both victims and suspected scammers, extracts interview transcripts, and summarizes the findings directly into your case management sheet.",
        tags: ["Voice AI", "ElevenLabs", "Automated Investigation"],
        metrics: [
            { label: "Voice Agents deployed", value: "2 parallel" },
            { label: "Interview to transcript", value: "Zero-touch" },
        ],
        problem: {
            title: "The Problem",
            description: "Investigating fraud cases is highly manual. Human investigators waste hours dialing numbers, leaving voicemails, and manually transcribing victim statements and scammer interactions.",
        },
        solution: "This workflow acts as an autonomous digital investigator. Triggered by a new row in a 'Fraud Cases' Google Sheet, it deploys two parallel ElevenLabs conversational AI agents—one designed to gently interview the victim, and another to interrogate the suspected scammer. Once the calls conclude, GPT-4.1 reads the transcripts, summarizes the crucial evidence, and automatically updates the case file.",
        steps: [
            { title: "Case Ingestion", description: "Reads a Google Sheet for new fraud cases, extracting the victim's name and phone number, the scammer's phone number, and the disputed fraud amount." },
            { title: "Parallel Outbound Calls", description: "Triggers two simultaneous HTTP requests to the ElevenLabs Conversational AI API, dispatching custom-prompted voice agents to call both the victim and the scammer." },
            { title: "Transcript Extraction & AI Summary", description: "Uses 'Wait' nodes to pause until the calls complete. It then pulls the raw call transcripts and uses GPT-4.1-mini to generate a concise, paragraph-length summary of the human's responses." },
            { title: "Case File Update", description: "Merges the two AI-generated summaries (Victim Summary + Scammer Summary) and writes them back into the original Google Sheet, updating the case file with instant, actionable intel." },
        ],
        before: ["Human investigators dialing numbers manually", "Hours wasted on hold or dealing with voicemails", "Manual, subjective note-taking during calls", "Delayed response times to fraud reports"],
        after: ["Instant, parallel outbound AI calls", "Consistent, script-adherent interview tactics", "Perfect, automated transcript generation", "AI-summarized evidence synced to the database"],
        techStack: ["ElevenLabs (ConvAI)", "GPT-4.1-mini", "n8n (Wait & Merge logic)", "Google Sheets"],
        architectureLabels: {
            source: "Case Database",
            core: "Parallel Voice Agents",
            output: "Transcript & Summaries",
        },
    },

    // ── Scraping Tools ───────────────────────────────────────────────────
    "influencer-scraper": {
        slug: "influencer-scraper",
        title: "AI Influencer Discovery Engine",
        category: "Scraping Tools",
        description: "Turn a natural language prompt into a highly vetted list of Instagram influencers. This workflow autonomously searches Google, scrapes blogs for handles, and calculates real-time engagement metrics.",
        tags: ["Influencer Marketing", "SERP API", "Apify"],
        metrics: [
            { label: "Prompt to Sheet", value: "Zero-touch" },
            { label: "Claude + SERP + Apify", value: "Multi-API" },
        ],
        problem: {
            title: "The Problem",
            description: "Finding niche influencers is painfully manual. Marketers search Google for 'Top eco-wellness influencers in Mumbai', click through 15 different blogs, copy-paste usernames, and manually calculate engagement rates to see if they fit the brief.",
        },
        solution: "This workflow automates the entire funnel. You give Claude a natural language prompt (e.g., 'Find tier-1 sustainable living influencers in India'). It generates specific Google search queries, uses the SERP API to scan organic results, extracts Instagram handles from the HTML, and triggers an Apify actor to pull live profile data and compute true engagement rates.",
        steps: [
            { title: "Prompt Parsing (Claude)", description: "A natural language command is sent to Claude 3.5 Sonnet, which breaks it down into structured JSON containing specific search queries, niches, and follower limits." },
            { title: "SERP Search & HTML Scraping", description: "The workflow hits the Google SERP API to find relevant organic listicles and blogs, then uses Regex in a JavaScript node to extract all mentioned Instagram handles." },
            { title: "Profile Scraping (Apify)", description: "The extracted handles are fed into an Apify Instagram Scraper actor, pulling official follower counts, post histories, and biography data." },
            { title: "Metric Calculation & Export", description: "A JavaScript node calculates true engagement rates (Likes + Comments / Followers), filters out bad fits, and appends the vetted influencers into a Google Sheet." },
        ],
        before: ["Googling 'top influencers in [city]'", "Manually reading through 10+ blogs", "Copy-pasting usernames into spreadsheets", "Calculating engagement rates by hand"],
        after: ["Natural language campaign prompts", "Autonomous Google SERP scraping", "Regex-powered handle extraction", "Live Apify data and engagement math"],
        techStack: ["Claude 3.5 Sonnet", "SERP API", "Apify (Instagram Actor)", "n8n (Regex & Math Logic)"],
        architectureLabels: {
            source: "Prompt → Claude",
            core: "SERP + Apify Scraping",
            output: "Vetted Influencer Sheet",
        },
        loomVideoUrl: "https://www.loom.com/embed/88fc73cfa71645a9a9e7f8afcc29b5ab",
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
        title: "Predictive Procurement Engine",
        category: "Operations",
        description: "An intelligent inventory manager that predicts stockouts 14 days in advance, optimizes purchase orders for volume discounts, and autonomously drafts supplier-ready PO emails.",
        tags: ["Supply Chain", "Predictive Logic", "Claude 3.5"],
        metrics: [
            { label: "Predictive Window", value: "14-Day" },
            { label: "Discount Optimization", value: "Algorithmic" },
        ],
        problem: {
            title: "The Problem",
            description: "Medical supply chains are volatile. Procurement managers constantly juggle dozens of spreadsheets to track daily sales velocity, varying supplier lead times, and complex volume discount tiers, leading to either stockouts or overpaying for rushed orders.",
        },
        solution: "This workflow acts as an algorithmic buyer. It pulls live data across Inventory, Suppliers, and SKU-Mappings. Using custom JavaScript, it calculates a 14-day predictive run-rate, automatically bumps up order quantities to hit supplier discount tiers, groups the POs by vendor, and uses Claude 3.5 Sonnet to draft the exact purchase order emails.",
        steps: [
            { title: "Data Aggregation", description: "Reads three separate Google Sheets simultaneously: Live Inventory levels, Supplier master data (lead times, MOQs, discount tiers), and the SKU-to-Supplier cost mapping." },
            { title: "Predictive Math Engine", description: "A JavaScript node calculates projected stock in 14 days based on avg. daily sales. If a stockout is pending, it calculates the optimal order quantity to cover lead time while maximizing volume discounts." },
            { title: "PO Grouping & Cost Reporting", description: "The workflow groups individual SKU orders by their primary supplier, calculates total net cost vs. gross cost, and generates a 'Cost Savings Summary' report." },
            { title: "AI Email Drafting", description: "The grouped order data is passed to an Anthropic Agent (Claude 3.5 Sonnet) heavily prompted to write professional, plain-text Purchase Order emails, complete with exact item tables and delivery requests." },
        ],
        before: ["Reactive ordering only after stock hits zero", "Missed volume discounts due to manual math errors", "Copy-pasting data from 3 different spreadsheets", "Manually typing out dozens of PO emails daily"],
        after: ["Predictive 14-day reorder buffering", "Algorithmic volume discount targeting", "Unified, automated data merging", "Claude-drafted, ready-to-send PO emails"],
        techStack: ["Google Sheets (Relational DB)", "n8n (Merge & JS Math)", "Claude 3.5 Sonnet", "LangChain Agents"],
        architectureLabels: {
            source: "3x Sheet Merge",
            core: "Predictive Math + LLM",
            output: "Drafts & Savings Report",
        },
        loomVideoUrl: "https://www.loom.com/embed/56b3adcba9bd41428d0127855baf32c8",
    },
};
