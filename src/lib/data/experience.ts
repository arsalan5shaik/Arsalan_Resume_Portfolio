import { Experience } from "@/lib/types";

// Add a logo per role at public/images/profile/ if you want one (optional).
export const experience: Experience[] = [
  {
    company: "Staples",
    role: "Software Engineer Intern",
    startDate: "Jun 2026",
    endDate: "Aug 2026",
    bullets: [
      "Collaborated with the internal tools team to build an LLM-powered workflow automation system using GPT-4o, reducing manual operational overhead by ~15 hours/week.",
      "Designed and optimized the model inference layer, including context window management, system prompt architecture, and parameter tuning to meet production accuracy requirements.",
      "Integrated the LLM backend with internal systems via REST APIs, implementing structured output parsing, fallback handling, and response validation to ensure reliability at scale.",
    ],
  },
  {
    company: "Intuit",
    role: "Data Engineer Intern",
    startDate: "Feb 2025",
    endDate: "Aug 2025",
    bullets: [
      "Contributed to a team-owned Apache Beam pipeline modeling user sessions from live event streams; personally developed a Python module to monitor Kafka consumer lag and surface scaling recommendations, reducing processing delays by ~30% during peak traffic.",
      "Implemented backward-compatible schema updates via Confluent Schema Registry across 10+ event types, ensuring zero-downtime changes for downstream consumers.",
      "Collaborated with the data engineering team to migrate 15+ on-premise processing jobs to AWS (S3, Redshift); wrote validation scripts to verify data integrity post-migration, improving average query performance by ~25%.",
    ],
  },
];
