export type Group = {
  id: string;
  name: string;
  day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  time: string;
  neighborhood: string;
  lifeStage:
    | "Young Adults"
    | "Couples"
    | "Men"
    | "Women"
    | "Moms"
    | "Mixed"
    | "Empty Nesters";
  leader: string;
  leaderPhoto: string;
  description: string;
};

export const groups: Group[] = [
  {
    id: "young-adults-monday",
    name: "Young Adults · The Loft",
    day: "Monday",
    time: "6:30 PM",
    neighborhood: "Downtown Kiowa",
    lifeStage: "Young Adults",
    leader: "Adam & Lisa Carter",
    leaderPhoto:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
    description: "20s & 30s working through a book of the Bible — dinner included.",
  },
  {
    id: "couples-pace",
    name: "Couples Group · North Kiowa",
    day: "Wednesday",
    time: "7:00 PM",
    neighborhood: "North Kiowa",
    lifeStage: "Couples",
    leader: "Mark & Beth Pace",
    leaderPhoto:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
    description: "Married couples studying Scripture and praying for each other's homes.",
  },
  {
    id: "mens-saturday",
    name: "Men's Study · Saturday Mornings",
    day: "Saturday",
    time: "7:00 AM",
    neighborhood: "Church · Fellowship Hall",
    lifeStage: "Men",
    leader: "Mike Hardin",
    leaderPhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    description: "Coffee, breakfast, and one chapter at a time. New guys always welcome.",
  },
  {
    id: "womens-tuesday",
    name: "Women's Bible Study",
    day: "Tuesday",
    time: "9:30 AM",
    neighborhood: "South Kiowa",
    lifeStage: "Women",
    leader: "Sarah Mitchell",
    leaderPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    description: "After kid drop-off — bring your Bible, your coffee, and your questions.",
  },
  {
    id: "family-friday",
    name: "Friday Family Group",
    day: "Friday",
    time: "6:00 PM",
    neighborhood: "Elbert Road",
    lifeStage: "Mixed",
    leader: "Tom & Cindy Reyes",
    leaderPhoto:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80",
    description: "Potluck, kids playing in the backyard, parents in the living room.",
  },
  {
    id: "empty-nesters",
    name: "Empty Nesters",
    day: "Thursday",
    time: "6:30 PM",
    neighborhood: "Hilltop",
    lifeStage: "Empty Nesters",
    leader: "Bob & Jane Wilkins",
    leaderPhoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    description: "Stage of life is its own ministry. Honest conversation, deep friendships.",
  },
  {
    id: "moms-wednesday",
    name: "Moms Together",
    day: "Wednesday",
    time: "10:00 AM",
    neighborhood: "Church · Conference Room",
    lifeStage: "Moms",
    leader: "Becca Holland",
    leaderPhoto:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    description: "Moms of littles — childcare provided. Coffee, study, and the occasional cry.",
  },
  {
    id: "bible-study-sunday",
    name: "Sunday Evening Bible Study",
    day: "Sunday",
    time: "6:00 PM",
    neighborhood: "West Kiowa",
    lifeStage: "Mixed",
    leader: "Pastor David Greene",
    leaderPhoto:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    description: "A deeper dive into the morning's text. Open to anyone, any stage.",
  },
];
