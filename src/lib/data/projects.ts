import { Project } from "@/lib/types";

// Drop a screenshot per project at public/images/projects/<slug>.png and
// fill in liveUrl/repoUrl if available.
export const projects: Project[] = [
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
    featured: true,
  },
];
