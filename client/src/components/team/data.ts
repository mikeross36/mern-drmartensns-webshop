import nextId from "react-id-generator";
import steve from "@/assets/images/users/user-2.jpg";
import eliana from "@/assets/images/users/user-8.jpg";
import john from "@/assets/images/users/user-7.jpg";
import izabela from "@/assets/images/users/user-6.jpg";

export type TeamItemType = {
  id: string;
  name: string;
  photo: string;
  role: string;
  email: string;
};

export const teamItems: TeamItemType[] = [
  {
    id: nextId(),
    name: "Steve Myles",
    photo: steve,
    role: "architect & engineer",
    email: "steve@gmail.com",
  },
  {
    id: nextId(),
    name: "Eliana Stout",
    photo: eliana,
    role: "sales manager",
    email: "eliana@gmail.com",
  },
  {
    id: nextId(),
    name: "John Riley",
    photo: john,
    role: "sales manager",
    email: "john@gmail.com",
  },
  {
    id: nextId(),
    name: "Isabel Kirkland",
    photo: izabela,
    role: "sales manager",
    email: "izabela@gmail.com",
  },
];
