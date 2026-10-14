# Tech Industry Research: Hiring and Agentic Development

## Scope and Evidence Rules

These are industry-only research notes. They contain no personal background, candidate assessment, role-fit recommendations, or resume advice.

The evidence addresses technology-related hiring and agentic software development, with these boundaries:

- **Labor-market coverage:** primarily the United States and Singapore. These markets are not proxies for worldwide hiring.
- **Engineering-practice coverage:** software development and applied AI, not every technology-industry job family.
- **Employer examples:** a purposive sample of software-engineering postings. Its backend emphasis is a coverage limitation; it cannot establish the prevalence of a requirement across the industry.
- **Time coverage:** sources mainly published in 2025–2026. Publication dates and observation periods are distinguished below. Findings are snapshots, not permanent conditions.
- **Source hierarchy:** measured labor-market evidence, developer surveys/experiments, employer requirements, and practitioner guidance are kept separate.
- **Causal claims:** correlation between AI exposure, adoption, and hiring changes is not treated as proof that AI caused those changes.

No claim is made that the source selection is statistically unbiased. Personal tailoring is excluded, while geographic, selection, self-reporting, and vendor limitations are stated explicitly.

## 1. Distinguishing the Changes

| Category                                        | Meaning                                                                                          | Evidence to examine                                                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **AI-assisted or agentic software development** | Using coding agents to inspect repositories, modify software, execute tools/checks, and iterate. | Development workflow, human review, verification, delivery, and operation.                                         |
| **LLM/agent application engineering**           | Building products that connect models to data, tools, and business workflows.                    | Integration, orchestration, permissions, evaluations, reliability, latency, and cost.                              |
| **Foundation-model research and training**      | Developing or training the models themselves.                                                    | Not established by the employer sample in these notes; requirements for these roles must be researched separately. |

These categories can overlap within a role, but experience in one does not establish experience in another.

[Martin Fowler, May 21, 2026][fowler-agentic], distinguishes agentic engineering from unreviewed “vibe coding”: humans remain responsible for software behavior and implementation quality.

[Anthropic, December 19, 2024][anthropic-agents], distinguishes predefined LLM workflows from agents that dynamically choose their process and tools. The article has since been updated and flags changes in its tooling examples; its architectural distinction should not be confused with a current tool ranking.

## 2. Job-Market Changes

### Measured findings

| Source and publication date                                | Geography / observation period                                                 | Finding                                                                                                                                                                                                                                          | Limits                                                                                                                                                                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Indeed Hiring Lab — January 22, 2026][indeed-january]     | US postings; end of 2025 versus February 2020                                  | AI-mentioning tech postings were about **45% above** baseline, while total tech postings were **34% below**.                                                                                                                                     | AI keywords include machine learning, data science, and generative AI. A mention is not necessarily a coding-agent requirement or an AI-engineering vacancy. Tech is broader than software development. |
| [Indeed Hiring Lab — July 8, 2026][indeed-july]            | US software-development postings; late February 2025 through roughly June 2026 | Software-development postings rose almost **15%**, while overall postings fell **7%**. Software postings nevertheless remained about **27.5% below** their pre-pandemic level.                                                                   | Seasonally adjusted posting counts, not actual hires. The rebound started from a depressed base.                                                                                                        |
| [Indeed Hiring Lab — July 8, 2026][indeed-july]            | US software-development postings; May 2025–May 2026                            | Senior roles accounted for **71% of the net increase**; jobs mentioning AI in their titles accounted for **37%**.                                                                                                                                | Categories overlap and cannot be added. These are shares of the increase, not shares of all vacancies. AI titles do not specifically identify agentic development.                                      |
| [Indeed Hiring Lab — September 24, 2026][indeed-september] | US postings through September 18, 2026                                         | Overall postings were **0.7% above** a year earlier. The new-posting index was **94.0**, with February 2020 = 100. Tech postings remained depressed despite improvement from earlier lows.                                                       | Existing posting stock and new-posting flow differ. “New” means seven days old or less. Overall-market improvement is not equivalent to a software-hiring boom.                                         |
| [Singapore MOM — March 20, 2026][mom-vacancies]            | Singapore; 2025 vacancies                                                      | Software-related occupations remained sought after. **51.1% of PMET vacancies** required **2–5 years** of experience. Remote-capable vacancies rose from **14.4% to 22.7%**, while overseas-recruitment intentions fell from **23.0% to 16.5%**. | PMET means professionals, managers, executives, and technicians; it is not a software-only category. Remote-capable work does not establish international hiring eligibility.                           |
| [Singapore MOM — September 21, 2026][mom-quarter]          | Singapore; March–June 2026                                                     | Vacancies declined from **73,300 to 68,600**, mainly reflecting reduced PMET vacancies in financial services and information and communications. Employment continued growing overall.                                                           | Economy-wide vacancy and employment measures, not a software-occupation hiring series. Employment growth and vacancy declines can coexist.                                                              |

### Causality and entry-level employment

[New York Fed researchers, May 14, 2026][nyfed], combined Lightcast job postings with an occupational AI-exposure measure. They found:

- Relative declines in AI-exposed occupations began before ChatGPT's release.
- There was no clear additional break in the trajectory after late 2022 in their analysis.
- Their within-occupation comparison did not show a clear junior/senior divergence in highly exposed occupations.

This challenges the claim that AI alone explains the hiring slowdown. It does not establish that AI has no employment effects. The findings concern a specific exposure measure, dataset, and period; the authors' conclusions are not an official Federal Reserve policy position.

### Supported market interpretation

- US software hiring showed a recovery from a weak base, not a return to uniformly strong demand.
- AI-related postings grew differently from general tech postings.
- The measured recent US software rebound was concentrated in senior and AI-titled postings.
- Regional labor markets differ; neither US trends nor remote-work arrangements establish worldwide access to jobs.
- Posting counts, actual hiring, employment levels, and job-loss attribution must remain separate.

## 3. Engineering Practices and Productivity

### Research findings

| Source                                                           | Observation                                                                                                                                                                                                                                   | Interpretation boundary                                                                                                                                                                                                             |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Google's official DORA 2025 summary — September 24, 2025][dora] | Research included nearly 5,000 technology professionals worldwide. AI adoption was positively associated with delivery throughput and product performance, but negatively associated with delivery stability.                                 | Survey associations are not a randomized causal estimate. Individual acceleration and reliable team-level delivery are different outcomes.                                                                                          |
| [Stack Overflow Developer Survey 2026 — AI trust][so-trust]      | Among **14,304 respondents** to the trust question, **48.0%** trusted AI when they could easily verify its output; **6.6%** trusted it for many tasks including important work decisions.                                                     | Voluntary, optional-question responses—not a census of developers. The [methodology][so-methodology] reports fielding from June 23 to August 5, 2026. Changed question wording prevents a simple trust comparison with prior years. |
| [METR — February 24, 2026][metr]                                 | Its early-2025 experiment found tasks took **19% longer** with AI in the studied setting. METR considered its later productivity estimates unreliable because of participant/task selection and difficulties measuring concurrent-agent work. | The earlier result is specific to the developers, repositories, tasks, and tools studied. The later update does not establish a dependable current speedup percentage or a universal slowdown.                                      |

### Practitioner guidance—not labor-market measurements

**Human accountability and domain understanding.** Fowler's [agentic engineering definition][fowler-agentic] describes engineers overseeing agents and evaluating code, tests, and other feedback. It is an expert account of development practice, not a hiring-demand forecast.

**Context engineering.** [Birgitta Böckeler, February 5, 2026][context], describes curating the information available to coding agents: repository content, guidance, tools, skills, and task-specific context. She warns that model interpretation remains probabilistic; prompt instructions are not hard guarantees.

**Outcome-based evaluations.** [Anthropic, January 9, 2026][anthropic-evals], emphasizes measuring actual final state and behavior rather than accepting an agent's success claim. It distinguishes capability evaluations from regression evaluations and combines deterministic, model-based, and human grading as appropriate. This is vendor engineering guidance, not an independent estimate of industry adoption.

**Complexity is a tradeoff.** [Anthropic's agent-design guidance][anthropic-agents] recommends simple composable patterns and distinguishes predictable workflows from open-ended agents. Agents can add latency, cost, and compounding errors; greater autonomy is not automatically a better product design.

### What the evidence does not establish

- A universal productivity multiplier for coding agents.
- That more code or more pull requests necessarily means more business value.
- That agent-generated tests alone establish correctness.
- That elaborate multi-agent systems outperform simpler workflows in every setting.
- That a single framework or model is an industry-wide hiring prerequisite.

## 4. Employer-Published Requirements

### Sampling and availability

The following nine employer descriptions illustrate different requirement categories; they are not a representative hiring survey. The initial sample emphasized backend/software engineering and should not be generalized to all technology jobs.

Descriptions and application entry points were available when inspected. Posting publication dates were generally unavailable in the reviewed content. This does not verify recruiting budgets, actual hires, or continued availability.

“Required” below refers to qualifications. Responsibilities, preferred experience, and company/product positioning are identified separately.

| Employer / role                                                   | Engineering requirements                                                                                                                            | AI requirement or context                                                                                                                                                                                                           | Location / conditions                                                                                                   |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [DoorDash — Software Engineer, Backend][job-doordash]             | 2+ years of backend experience; APIs, databases, architecture, testing, performance, reliability, and security.                                     | **Required:** proficiency with AI coding tools across design, code generation, testing, monitoring, and release.                                                                                                                    | US hybrid.                                                                                                              |
| [Apify — Senior Backend Engineer, Billing][job-apify]             | 3+ years building backend systems/APIs; TypeScript/Node.js or another language with willingness to learn; debugging and end-to-end ownership.       | **Required:** hands-on experience using AI tools in daily work.                                                                                                                                                                     | Czechia; remote arrangement includes monthly office visits and Prague onboarding.                                       |
| [Gemini — Senior Software Engineer, Invest / Trade][job-gemini]   | React/TypeScript production-web engineering, architecture, testing, ownership, and mentoring; backend integration work.                             | **Responsibility:** effective AI-tool use while remaining accountable for quality. **Preferred:** coding-agent and AI-assisted workflows.                                                                                           | Singapore hybrid; frontend-heavy full-stack role.                                                                       |
| [Nas Company — AI Software Engineer][job-nas]                     | 3+ years of software engineering; Python preferred or JavaScript/TypeScript; backend APIs and cloud experience.                                     | **Required:** LLM applications, AI API integration/deployment, and understanding of prompts, embeddings, vector databases, and RAG. **Bonus:** autonomous agents, MCP, agent frameworks, and evaluation frameworks.                 | Singapore hybrid.                                                                                                       |
| [Agoda — Staff Software Engineer, GenAI][job-agoda]               | 8+ years of professional software engineering; complex production delivery, CI/CD, debugging, and cross-functional ownership.                       | **Required:** demonstrable GenAI/application/agent-platform contributions. **Responsibilities:** evaluations, reliability, latency, cost, access controls, and data protection. Specific orchestration/RAG experience is preferred. | Singapore; explicitly no visa sponsorship or relocation assistance.                                                     |
| [Aircall — Senior Backend Software Engineer, Python][job-aircall] | 7+ years of backend experience; advanced asynchronous/typed/tested Python, distributed systems, and cloud experience.                               | **Required:** active use of AI coding assistants. **Responsibilities:** building and orchestrating LLM-powered agents, tools, memory, and event-driven workflows.                                                                   | Madrid office; worldwide remote work is not established by the description.                                             |
| [Vercel — Software Engineer, Backend][job-vercel]                 | TypeScript/Node.js, SQL, identity/security, access controls, enterprise APIs, and service operation.                                                | **No explicit AI-experience qualification.** Agentic infrastructure appears in company positioning, not as a candidate requirement.                                                                                                 | United States; fully remote beyond the employer's commuting threshold, otherwise in-office Monday, Tuesday, and Friday. |
| [Endor Labs — Senior Backend Engineer, Golang][job-endor]         | 6–8 years of scalable backend experience, including 3+ years of Go; distributed architecture, APIs, observability, troubleshooting, and mentorship. | **No explicit AI-tool or LLM-experience qualification.** Coding-agent security appears in company/product context.                                                                                                                  | Bengaluru, India.                                                                                                       |
| [Automattic — Experienced Software Engineer][job-automattic]      | Production engineering, debugging, quality, scale, and willingness to deepen PHP/JavaScript expertise.                                              | AI appears in product and development-workflow context, **not as a separate mandatory qualification** in the reviewed description.                                                                                                  | Worldwide distributed hiring advertised; country-specific eligibility is not guaranteed, and travel is expected.        |

### Patterns observed within this sample

1. **Engineering fundamentals persist:** architecture, APIs, databases, security, reliability, testing, and production operation recur.
2. **AI-assisted development is explicit in some conventional roles:** it is not confined to jobs titled “AI Engineer.”
3. **Building AI products introduces additional responsibilities:** model/API integration, retrieval/tools, evaluations, permissions, and operational performance.
4. **Framework names do not replace demonstrated delivery:** some postings list frameworks as bonuses or preferred experience rather than mandatory qualifications.
5. **Seniority includes ownership:** design decisions, production debugging, cross-functional work, and mentoring appear alongside experience thresholds.
6. **Geography remains an independent condition:** remote work, overseas recruitment, work authorization, travel, and sponsorship are distinct.

These observations cannot establish how common each requirement is, whether its prevalence is increasing, or which skill commands a salary premium.

## 5. Claims to Avoid

| Claim                                                                 | Why the evidence is insufficient                                                                                                                                |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| “AI caused the entire tech hiring contraction.”                       | Declines predate widespread generative AI, and available studies do not isolate AI as the sole cause.                                                           |
| “Most software jobs are now senior or AI jobs.”                       | Shares of a net increase are not shares of all vacancies; the employer sample is not representative.                                                            |
| “Every developer must become an AI engineer.”                         | Conventional roles without explicit AI qualifications remain in the reviewed sample. Using coding agents and building AI applications are different activities. |
| “Coding agents reliably make every engineer twice as productive.”     | Effects depend on the task, repository, tools, developer, review burden, and outcome being measured.                                                            |
| “Remote means globally available.”                                    | Employer descriptions retain country, office, travel, and work-authorization constraints.                                                                       |
| “MCP, LangChain, or multi-agent experience is universally mandatory.” | The sampled postings distinguish mandatory qualifications from preferred or bonus experience.                                                                   |

## 6. Research Gaps

- Representative, repeated sampling across software, data, security, infrastructure, hardware, and other technology job families.
- Broader geographic coverage with comparable occupation-level hiring data.
- Direct measurement of coding-agent requirements, rather than broad AI keyword mentions.
- Actual hiring and employment outcomes linked to employer AI adoption.
- Independent measurements of productivity that include review, rework, defects, operational reliability, and total cost.
- Clear separation of entry-level employment effects from vacancy/posting trends.

These gaps remain unresolved in this note. Personal assessment and resume development are outside its scope.

## Sources

Sources are linked at the findings they support. The references below resolve those links; labor-market reports and employer descriptions should be checked again before treating their snapshots as current conditions.

[indeed-january]: https://hiringlab.indeed.com/2026/01/22/january-labor-market-update-jobs-mentioning-ai-are-growing-amid-broader-hiring-weakness/
[indeed-july]: https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/
[indeed-september]: https://hiringlab.indeed.com/2026/09/24/us-labor-market-snapshot-september-2026/
[mom-vacancies]: https://www.mom.gov.sg/newsroom/press-releases/2026/0320-job-vacancies-report-2025
[mom-quarter]: https://www.mom.gov.sg/newsroom/press-releases/2026/0921-labour-market-report---second-quarter-2026
[nyfed]: https://libertystreeteconomics.newyorkfed.org/2026/05/do-job-postings-show-early-labor-market-effects-of-ai/
[dora]: https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
[so-trust]: https://survey.stackoverflow.co/2026/ai/data/ai-trust
[so-methodology]: https://survey.stackoverflow.co/2026/methodology
[metr]: https://metr.substack.com/p/2026-02-24-uplift-update
[fowler-agentic]: https://martinfowler.com/bliki/AgenticEngineering.html
[context]: https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html
[anthropic-evals]: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
[anthropic-agents]: https://www.anthropic.com/engineering/building-effective-agents
[job-doordash]: https://job-boards.greenhouse.io/doordashusa/jobs/5630445
[job-apify]: https://jobs.ashbyhq.com/apify/95bca6ea-e7c9-4e82-bcc2-d01278d67ee0
[job-gemini]: https://job-boards.greenhouse.io/gemini/jobs/8164166
[job-nas]: https://job-boards.greenhouse.io/nascompany/jobs/7799556003
[job-agoda]: https://job-boards.greenhouse.io/agoda/jobs/8263843
[job-aircall]: https://job-boards.greenhouse.io/aircallioinc/jobs/4309026009
[job-vercel]: https://job-boards.greenhouse.io/vercel/jobs/5430088004
[job-endor]: https://job-boards.greenhouse.io/endorlabs/jobs/4000732005
[job-automattic]: https://automattic.com/work-with-us/job/experienced-software-engineer/
