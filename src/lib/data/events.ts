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
    project: "Location Discovery Platform",
    description:
      "At UT Dallas's flagship 24-hour hackathon, built a location-discovery platform with a team of four that scrapes TikTok and Instagram for trending places, uses AI to interpret natural-language search and generate location descriptions, and runs geospatial search over PostgreSQL/PostGIS.",
    links: [
      { label: "GitHub", url: "https://github.com/arsalan5shaik/HackUTD-2025" },
    ],
  },
  {
    name: "OpenAI Hackathon",
    type: "Hackathon",
    // TODO: fill in the real details — date, location, what you built, team
    // size, any result, and add an image at public/images/events/openai.png
    // plus a GitHub/Devpost link if you have one.
    description:
      "Participated in OpenAI's hackathon. Project details coming soon.",
  },
];
