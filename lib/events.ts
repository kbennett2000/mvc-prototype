export type ChurchEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  description?: string;
  recurrence?: string;
};

export const upcomingEvents: ChurchEvent[] = [
  {
    id: "supper-2026-05-13",
    title: "Wednesday Supper",
    date: "2026-05-13",
    time: "5:15 PM",
    location: "Fellowship Hall",
    description: "Free meal for the whole church family before midweek programs.",
    recurrence: "Every Wednesday",
  },
  {
    id: "awana-2026-05-13",
    title: "Awana",
    date: "2026-05-13",
    time: "6:10 PM",
    location: "Kids Wing",
    description: "Bible-rooted clubs for kids age 3 through 6th grade.",
    recurrence: "Wednesdays during the school year",
  },
  {
    id: "moms-2026-05-16",
    title: "Moms in Prayer",
    date: "2026-05-16",
    time: "7:30 AM",
    location: "Conference Room",
    description: "An hour of prayer for our kids, schools, and community.",
    recurrence: "Every Saturday",
  },
  {
    id: "worship-2026-05-17",
    title: "Sunday Worship",
    date: "2026-05-17",
    time: "9:00 AM",
    location: "Main Sanctuary",
    description: "Singing, teaching from Scripture, and coffee after.",
    recurrence: "Every Sunday",
  },
  {
    id: "overcomers-2026-05-18",
    title: "Overcomers",
    date: "2026-05-18",
    time: "6:30 PM",
    location: "Room 203",
    description: "Christ-centered addiction recovery for anyone seeking freedom.",
    recurrence: "Every Monday",
  },
  {
    id: "young-adults-2026-05-18",
    title: "Young Adults",
    date: "2026-05-18",
    time: "6:30 PM",
    location: "The Loft",
    description: "20s & 30s gathering — teaching, discussion, and community.",
    recurrence: "Every Monday",
  },
  {
    id: "men-of-valor-2026-05-23",
    title: "Men of Valor",
    date: "2026-05-23",
    time: "7:30 AM",
    location: "Fellowship Hall",
    description: "Breakfast, teaching, and brotherhood for the men of MVC.",
    recurrence: "3rd Saturday monthly",
  },
];
