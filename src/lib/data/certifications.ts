import { Certification } from "@/lib/types";

// Add date/credentialUrl if you have them, and a badge image per cert at
// public/images/certifications/<name>.png
export const certifications: Certification[] = [
  {
    name: "PCEP – Certified Entry-Level Python Programmer",
    issuer: "Python Institute",
    image: "/images/certifications/pcep.png",
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    image: "/images/certifications/azure-fundamentals.png",
  },
  {
    name: "Microsoft Certified: Azure Data Fundamentals",
    issuer: "Microsoft",
    image: "/images/certifications/azure-data-fundamentals.png",
  },
];
