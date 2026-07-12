import { Education } from "@/lib/types";

// Add a school logo at public/images/education/utd.png and set
// logo: "/images/education/utd.png" (optional — falls back to a generic icon).
export const education: Education = {
  school: "The University of Texas at Dallas",
  location: "Richardson, TX",
  degree: "Bachelor of Science in Computer Science",
  gpa: "3.8",
  graduationDate: "Expected Dec 2026",
  coursework: [
    "Advanced Algorithm Design and Analysis",
    "Database Systems",
    "Software Engineering",
    "Systems Programming in UNIX",
    "Programming Language Paradigms",
    "Artificial Intelligence",
    "Machine Learning",
  ],
};
