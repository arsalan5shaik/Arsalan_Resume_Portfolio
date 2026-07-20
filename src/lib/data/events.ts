import { Event } from "@/lib/types";

// TODO: add your other hackathons and tech events here. Example shape:
// {
//   name: "HackUTD 2025",
//   type: "Hackathon", // or "Conference", "Meetup", "Workshop", etc.
//   date: "Nov 2025",
//   location: "Richardson, TX",
//   project: "Project name (optional — skip for talks/conferences)",
//   description: "What you built/attended and your role.",
//   result: "1st Place / Finalist / etc. (optional)",
//   image: "/images/events/hackutd-2025.png", // small logo thumb, not a banner
//   links: [{ label: "Devpost", url: "https://..." }],
// }
export const events: Event[] = [
  {
    name: "HackUTD",
    type: "Hackathon",
    date: "Nov 2025",
    location: "Richardson, TX",
    image: "/images/events/hackutd.png",
    // TODO: replace this with what you actually built, your team size, and
    // any result — the GitHub link below points at your HackUTD-2025 repo.
    description:
      "UT Dallas's flagship student hackathon, and North America's largest 24-hour hackathon. Details on what I built here coming soon.",
    links: [
      { label: "GitHub", url: "https://github.com/arsalan5shaik/HackUTD-2025" },
    ],
  },
];
