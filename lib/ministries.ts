export type MinistryMeeting = {
  day: string;
  time: string;
  location: string;
  note?: string;
};

export type Ministry = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  whoFor: string;
  meetings: MinistryMeeting[];
  whatToExpect: string[];
  leader: { name: string; role: string; email: string; photo: string };
  gallery: string[];
};

const galleries = {
  kids: [
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1597392582469-a697322d5c16?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1607000395837-eea7a02d2390?auto=format&fit=crop&w=900&q=80",
  ],
  youth: [
    "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=80",
  ],
  youngAdults: [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1543372088-bd0bb47d4a14?auto=format&fit=crop&w=900&q=80",
  ],
  women: [
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1521120098171-c0a99c1273fd?auto=format&fit=crop&w=900&q=80",
  ],
  men: [
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80",
  ],
  overcomers: [
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=900&q=80",
  ],
  missions: [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
  ],
};

export const ministries: Ministry[] = [
  {
    slug: "kids",
    title: "Kids",
    tagline: "Where the smallest hear that they are seen, safe, and loved.",
    description:
      "Sunday classes and Awana — a safe, joyful place for children to learn who Jesus is.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1800&q=80",
    whoFor: "Newborns through 6th grade.",
    meetings: [
      {
        day: "Sundays",
        time: "9:00 AM",
        location: "Kids Wing",
        note: "Nursery, toddlers, K–2, 3rd–6th — separate rooms by age.",
      },
      {
        day: "Wednesdays",
        time: "6:10 – 7:40 PM",
        location: "Kids Wing",
        note: "Awana clubs (school year).",
      },
    ],
    whatToExpect: [
      "Secure check-in at the front desk — every child gets a tag that matches yours.",
      "A Bible story, songs, a craft, and a snack at every gathering.",
      "Every volunteer is background-checked and trained.",
      "We never separate you from your child if they're not ready. You can stay as long as it takes.",
    ],
    leader: {
      name: "Rebecca Tanner",
      role: "Kids Ministry Director",
      email: "rebecca@mvckiowa.com",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    gallery: galleries.kids,
  },
  {
    slug: "youth",
    title: "Youth",
    tagline: "Middle and high schoolers — known, growing, and not alone.",
    description:
      "Middle and high schoolers growing in faith together through teaching, games, and honest conversation.",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1800&q=80",
    whoFor: "7th through 12th grade.",
    meetings: [
      {
        day: "Sundays",
        time: "9:00 AM",
        location: "The Loft",
        note: "Combined with morning service for teaching.",
      },
      {
        day: "Wednesdays",
        time: "6:30 – 8:00 PM",
        location: "The Loft",
        note: "Games, teaching, small groups by grade.",
      },
    ],
    whatToExpect: [
      "Real conversation, not a youth-group performance.",
      "Small groups split by grade and gender for the second half.",
      "One annual summer camp + a few weekend retreats through the year.",
      "Snacks. Always snacks.",
    ],
    leader: {
      name: "Mike Hardin",
      role: "Youth & Young Adults Director",
      email: "mike@mvckiowa.com",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
    gallery: galleries.youth,
  },
  {
    slug: "young-adults",
    title: "Young Adults",
    tagline: "20s and 30s figuring out faith and life together.",
    description:
      "20s and 30s — building real friendships and going deeper in Scripture on Monday nights.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80",
    whoFor:
      "Anyone roughly 20–35 — single or married, new to faith or wrestling through it.",
    meetings: [
      {
        day: "Mondays",
        time: "6:30 PM",
        location: "The Loft",
        note: "Dinner provided.",
      },
    ],
    whatToExpect: [
      "Walk through a book of the Bible at the group's pace.",
      "Honest discussion in smaller groups for the second hour.",
      "Hikes, game nights, and the occasional camping trip.",
      "Show up once and see — there's no membership step.",
    ],
    leader: {
      name: "Mike Hardin",
      role: "Youth & Young Adults Director",
      email: "mike@mvckiowa.com",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
    gallery: galleries.youngAdults,
  },
  {
    slug: "women",
    title: "Women",
    tagline: "Bible, prayer, friendship — every week and through every season.",
    description:
      "Bible studies, fellowships, and Moms in Prayer — women walking with Jesus together.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1800&q=80",
    whoFor: "Women of every age and stage.",
    meetings: [
      {
        day: "Tuesdays",
        time: "9:30 AM",
        location: "Conference Room",
        note: "Women's Bible Study (after kid drop-off).",
      },
      {
        day: "Saturdays",
        time: "7:30 AM",
        location: "Conference Room",
        note: "Moms in Prayer — every week.",
      },
      {
        day: "Second Saturday",
        time: "9:00 AM",
        location: "Fellowship Hall",
        note: "Women's Fellowship brunch.",
      },
    ],
    whatToExpect: [
      "Real Bible study — we work through one book at a time.",
      "Coffee, brunch, and conversations that wander where they need to.",
      "Mentorship pairings if you'd like one.",
      "An annual women's retreat in the fall.",
    ],
    leader: {
      name: "Sarah Mitchell",
      role: "Women's Ministry Coordinator",
      email: "sarah@mvckiowa.com",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    },
    gallery: galleries.women,
  },
  {
    slug: "men",
    title: "Men",
    tagline: "Brothers sharpening one another — not a club, a band of brothers.",
    description:
      "Men of Valor and the monthly breakfast — brothers sharpening one another.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1800&q=80",
    whoFor: "Men, any age. Show up in work boots or a suit, no one cares.",
    meetings: [
      {
        day: "Saturdays",
        time: "7:00 AM",
        location: "Fellowship Hall",
        note: "Men's Bible Study — every week.",
      },
      {
        day: "Third Saturday",
        time: "7:30 AM",
        location: "Fellowship Hall",
        note: "Men of Valor — monthly breakfast and teaching.",
      },
      {
        day: "Last Sunday",
        time: "7:15 AM",
        location: "Fellowship Hall",
        note: "Men's Breakfast — monthly potluck.",
      },
    ],
    whatToExpect: [
      "A real breakfast — eggs, bacon, the works.",
      "30 minutes of teaching, 30 minutes of conversation at your table.",
      "Annual men's retreat in the spring.",
      "Service days — chopping wood, fixing porches, looking after widows.",
    ],
    leader: {
      name: "Pastor John Smith",
      role: "Lead Pastor",
      email: "john@mvckiowa.com",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    },
    gallery: galleries.men,
  },
  {
    slug: "overcomers",
    title: "Overcomers",
    tagline:
      "A Christ-centered space for anyone fighting addiction, hurt, or compulsion.",
    description:
      "Christ-centered recovery for anyone fighting addiction, hurt, or compulsion. Mondays, 6:30 PM.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80",
    whoFor:
      "Anyone — believer or not — looking for freedom from any kind of bondage.",
    meetings: [
      {
        day: "Mondays",
        time: "6:30 – 8:00 PM",
        location: "Room 203",
        note: "Childcare provided.",
      },
    ],
    whatToExpect: [
      "Confidential. What's said here stays here.",
      "Large-group teaching, then small groups by category.",
      "No 13th step. No agendas other than walking with Christ together.",
      "Sponsors available if you'd like one.",
    ],
    leader: {
      name: "Pastor David Greene",
      role: "Associate Pastor · Discipleship",
      email: "david@mvckiowa.com",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    },
    gallery: galleries.overcomers,
  },
  {
    slug: "missions",
    title: "Missions",
    tagline: "Partnering with people making Jesus known — here and far.",
    description:
      "Partnering with workers locally and around the world to make Jesus known.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=80",
    whoFor: "Anyone wanting to pray, give, or go.",
    meetings: [
      {
        day: "Quarterly",
        time: "Sunday afternoons",
        location: "Fellowship Hall",
        note: "Missions Sunday — meet our partners.",
      },
    ],
    whatToExpect: [
      "We support seven partner families on three continents.",
      "Quarterly updates from each partner, prayed for by name in our gatherings.",
      "Annual short-term teams — one international, one stateside.",
      "Local partnership with the Elbert County food pantry.",
    ],
    leader: {
      name: "Tom Reyes",
      role: "Operations & Missions",
      email: "tom@mvckiowa.com",
      photo:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
    },
    gallery: galleries.missions,
  },
];

export function getMinistry(slug: string): Ministry | undefined {
  return ministries.find((m) => m.slug === slug);
}
