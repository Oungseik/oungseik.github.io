export const projects = [
  {
    slug: "brif-mcp",
    name: "Brif MCP",
    category: "AI-assisted due diligence",
    summary: "Company and person research, brought into the tools people already use.",
    contribution: "MCP tools, research workflows, authentication, and credit billing.",
    technologies: ["TypeScript", "Next.js", "Mastra", "Prisma", "Gemini"],
    url: "https://www.getbrif.ai/",
    domain: "getbrif.ai",
    context: "Built for Binary Stride through Crossworks Myanmar.",
    introduction:
      "Brif combines registry records with AI-assisted public-source research to support company and person due diligence. I worked on the MCP tools, embedded interfaces, research workflows, and the authentication and billing behind them.",
    problem:
      "Due diligence draws on different kinds of information: structured registry records and research from public sources. Brif brings those sources into an MCP-based workflow, with embedded interfaces for working with the results.",
    sections: [
      {
        title: "Research inside the workflow",
        body: "I built MCP tools and embedded interfaces for company and person research, combining registry records with AI-assisted public-source research. This work connected the research capabilities to the interfaces where people use them."
      },
      {
        title: "Research with clear limits",
        body: "I developed Mastra and Gemini workflows with topic specialists, bounded search budgets, and partial-result handling. The work included handling research that finishes with incomplete results, as well as keeping searches within a defined budget."
      },
      {
        title: "Authentication and credits",
        body: "I implemented MCP OAuth and API-key authentication, together with Stripe credit billing. The billing work covered concurrent credit reservations, automatic top-ups, and refund reconciliation."
      }
    ],
    focus:
      "The work extended beyond research tools to the authentication, usage limits, and billing needed to support them."
  },
  {
    slug: "bookogsend",
    name: "Bookogsend",
    category: "Multi-carrier shipping",
    summary: "Connecting store orders, carrier shipments, and the charges in between.",
    contribution: "WooCommerce integration, order recovery, and carrier-charge reconciliation.",
    technologies: ["TypeScript", "Next.js", "tRPC", "Prisma", "PHP", "WooCommerce"],
    url: "https://bookogsend.dk/",
    domain: "bookogsend.dk",
    context: "Contributed to the Binary Stride team through Crossworks Myanmar.",
    introduction:
      "Bookogsend is a multi-carrier shipping platform supporting GLS and Team JK. My contributions focused on connecting WooCommerce orders to shipments and reconciling carrier charges with the platform’s billing workflows.",
    problem:
      "Shipping involves more than creating a label. Store orders need to reach the shipping platform, pickup-point choices need to carry through checkout, and carrier charges need to be reconciled with adjustments and invoices.",
    sections: [
      {
        title: "From checkout to shipment",
        body: "I built the WooCommerce order-to-shipment integration, including pickup-point selection across both classic and Blocks checkout. The integration carries the customer’s delivery choice from the store into the shipment workflow."
      },
      {
        title: "Recovering missed orders",
        body: "I hardened order synchronization with duplicate checks and recovery for missed orders. This work addressed both repeated synchronization and orders that had not reached the shipping platform."
      },
      {
        title: "Reconciling carrier charges",
        body: "I built carrier-charge reconciliation for GLS and Team JK, applying surcharge and commission rules to calculate adjustments and refunds. Approved charges were routed into e-conomic invoices."
      }
    ],
    focus:
      "My focus was the connection between systems: carrying order data into shipments, recovering missed synchronization, and bringing carrier charges into invoicing."
  }
];
