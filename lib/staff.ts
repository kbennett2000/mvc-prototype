export type StaffMember = {
  name: string;
  role: string;
  email: string;
  bio: string;
  photo: string;
};

export const staff: StaffMember[] = [
  {
    name: "Pastor John Smith",
    role: "Lead Pastor",
    email: "john@mvckiowa.com",
    bio: "Has been at MVC since 2014. Husband, dad of four, lifelong Coloradoan.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Pastor David Greene",
    role: "Associate Pastor · Discipleship",
    email: "david@mvckiowa.com",
    bio: "Leads small groups and the Sunday evening Bible study. Loves trail running.",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mike Hardin",
    role: "Youth & Young Adults Director",
    email: "mike@mvckiowa.com",
    bio: "Pours coffee, plays guitar, and shepherds students from 6th grade through college.",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Rebecca Tanner",
    role: "Kids Ministry Director",
    email: "rebecca@mvckiowa.com",
    bio: "Runs Sunday Kids and Awana. Mom of three, former elementary teacher.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sarah Mitchell",
    role: "Women's Ministry Coordinator",
    email: "sarah@mvckiowa.com",
    bio: "Volunteer role. Coordinates Women's Fellowship, Moms in Prayer, and studies.",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Tom Reyes",
    role: "Operations & Administration",
    email: "tom@mvckiowa.com",
    bio: "Keeps the building running and answers most of the emails to admin@mvckiowa.com.",
    photo:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
  },
];
