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
//   image: "/images/events/hackutd-2025.jpg",
//   links: [{ label: "Devpost", url: "https://..." }],
// }
export const events: Event[] = [
  {
    name: "HackUTD",
    type: "Hackathon",
    location: "Richardson, TX",
    // TODO: fill in the year, what you built, team size, and any result —
    // placeholder for now so the section renders. Add a photo at
    // public/images/events/hackutd.jpg if you have one.
    description:
      "UT Dallas's flagship student hackathon. Details on what I built here coming soon.",
  },
];
