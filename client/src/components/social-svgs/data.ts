import nextId from "react-id-generator";

import {
  returnLinkedIn,
  returnGithub,
  returnInstagram,
  returnYoutube,
} from "./SocialSvgs";

export type SocialSvgsType = {
  id: string;
  href: string;
  icon: () => JSX.Element;
  label: string;
  data: string;
};

export const socialSvgs = [
  {
    id: nextId(),
    href: "https://linkedin.com/",
    icon: returnLinkedIn,
    label: "LinkedIn",
    data: "linkedin",
  },
  {
    id: nextId(),
    href: "https://www.github.com/",
    icon: returnGithub,
    label: "GitHub",
    data: "github",
  },
  {
    id: nextId(),
    href: "https://www.instagram.com/",
    icon: returnInstagram,
    label: "Instagram",
    data: "instagram",
  },
  {
    id: nextId(),
    href: "https://youtube.com/",
    icon: returnYoutube,
    label: "Youtube",
    data: "youtube",
  },
];
