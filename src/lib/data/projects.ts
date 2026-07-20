import { Project } from "@/lib/types";

// Drop a screenshot per project at public/images/projects/<slug>.png and
// fill in liveUrl/repoUrl if available.
export const projects: Project[] = [
  {
    slug: "fillright",
    title: "FillRight",
    description:
      "An AI-assisted job-application autofill tool for Workday — a Chrome extension, web app, and FastAPI backend built around a reusable Supabase profile, so every question answered once becomes a saved, reusable answer.",
    bullets: [
      "Built a Chrome MV3 extension (TypeScript, Vite) that scans Workday job postings, tailors resumes and cover letters, and autofills the application wizard.",
      "Developed a FastAPI backend for resume parsing, job-description analysis, resume tailoring, cover-letter generation, and a question-answer resolver.",
      "Designed a Supabase (Postgres + pgvector) profile with schema and row-level-security policies; answered questions become reusable embeddings that make the profile smarter over time.",
    ],
    skills: [
      "TypeScript",
      "Python",
      "FastAPI",
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "pgvector",
      "Chrome Extension",
      "LLMs",
    ],
    image: "/images/projects/fillright.png",
    repoUrl: "https://github.com/arsalan5shaik/fillright",
    featured: true,
  },
  {
    slug: "screenguide",
    title: "ScreenGuide",
    description:
      "An AI teaching companion that lives next to your cursor — it sees your screen, talks to you, and points at things to walk you through whatever you're doing. Shipped as native macOS and Windows apps.",
    bullets: [
      "Built a native macOS menu-bar app with Swift/SwiftUI and a Windows system-tray app with Python/PyQt6 from a shared design.",
      "Implemented a screen-aware AI assistant that interprets what's on screen and narrates step-by-step guidance in real time.",
      "Packaged both platforms for distribution (Inno Setup installer on Windows, native bundle on macOS).",
    ],
    skills: [
      "Python",
      "Swift",
      "SwiftUI",
      "PyQt6",
      "Computer Vision",
      "LLMs",
    ],
    image: "/images/projects/screenguide.png",
    repoUrl: "https://github.com/arsalan5shaik/ScreenGuide",
    featured: true,
  },
  {
    slug: "traffic-sign-recognition",
    title: "Traffic Signs Recognition System",
    organization: "Artificial Intelligence Society",
    description:
      "A CNN-based traffic sign classifier trained on 50,000+ preprocessed images, achieving 95% accuracy, with a Tkinter GUI for live image upload and classification.",
    bullets: [
      "Developed a Traffic Signs Recognition system using Python and deep learning, achieving 95% accuracy with a Convolutional Neural Network (CNN) trained on over 50,000 preprocessed images.",
      "Designed and trained a deep learning model with Keras; implemented Conv2D, MaxPooling, Dropout, and Dense layers.",
      "Developed a Tkinter-based GUI for image upload and classification; visualized model metrics using Matplotlib and Scikit-learn.",
    ],
    skills: [
      "Python",
      "Deep Learning",
      "Keras",
      "Python Imaging Library",
      "NumPy",
      "Matplotlib",
      "Scikit-learn",
      "Tkinter",
    ],
    image: "/images/projects/traffic-sign-recognition.png",
    repoUrl: "https://github.com/arsalan5shaik/Traffic-Sign-Classification",
    featured: true,
    stat: { value: "95%", label: "classification accuracy" },
  },
  {
    slug: "restaurant-recommendation-app",
    title: "Restaurant Recommendation App",
    organization: "Association For Computing Machinery",
    description:
      "A full-stack MERN restaurant recommendation app with location, cuisine, and rating filters, backed by a dynamic REST API and MongoDB schema design.",
    bullets: [
      "Developed a full-stack Restaurant Recommendation app using the MERN stack with filters for location, cuisine, and rating.",
      "Designed RESTful APIs and MongoDB schemas for dynamic filtering and efficient data handling.",
      "Built a responsive React.js interface with Context API and custom hooks for state management and real-time updates.",
    ],
    skills: [
      "JavaScript",
      "MongoDB",
      "REST APIs",
      "Performance Optimization",
      "System Monitoring",
    ],
    image: "/images/projects/restaurant-recommendation-app.png",
    repoUrl: "https://github.com/arsalan5shaik/Restaurant-Recommendation",
  },
  {
    slug: "portfolio",
    title: "Developer Portfolio",
    description:
      "The site you're looking at — a single-page portfolio built with Next.js and Tailwind, featuring a React Three Fiber hero, drag-scroll project carousels, and scroll-driven animations, deployed on Vercel.",
    bullets: [
      "Designed and built a responsive, content-as-code portfolio with Next.js (App Router) and Tailwind CSS.",
      "Added an interactive React Three Fiber hero scene and Framer Motion scroll choreography, with graceful reduced-motion fallbacks.",
      "Set up SEO metadata, a dynamic Open Graph image, sitemap/robots, and Vercel Analytics; auto-deploys on every push.",
    ],
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Three Fiber",
      "Framer Motion",
      "Vercel",
    ],
    image: "/images/projects/portfolio.png",
    repoUrl: "https://github.com/arsalan5shaik/Arsalan_Resume_Portfolio",
    liveUrl: "https://shaik-arsalan-resume-portfolio.vercel.app",
  },
];
