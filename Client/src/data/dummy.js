import { FaMap, FaPray, FaUserCheck } from "react-icons/fa";
import { RiAdminFill, RiLinksFill } from "react-icons/ri";

export const links = [
  {
    title: "namaz timing",
    link: "",
    icon: <FaPray />,
    isProtected: false,
  },
  {
    title: "Map",
    link: "map",
    icon: <FaMap />,
    isProtected: false,
  },
  {
    title: "Prayer Limit",
    link: "prayerlimit",
    icon: <FaPray />,
    isProtected: false,
  },
  {
    title: "admin",
    link: "admin",
    icon: <RiAdminFill />,
    isProtected: true,
  },
  {
    title: "editor",
    link: "editor",
    icon: <FaUserCheck />,
    isProtected: true,
  },
  {
    title: "linkpage",
    link: "linkpage",
    icon: <RiLinksFill />,
    isProtected: true,
  },
];

export const city = [
  {
    id: 1,
    name: "Mumbai",
  },
  {
    id: 2,
    name: "Delhi",
  },
  {
    id: 3,
    name: "Jammu",
  },
  {
    id: 4,
    name: "Kashmir",
  },
  {
    id: 5,
    name: "Pune",
  },
  {
    id: 6,
    name: "Hydrabad",
  },
  {
    id: 7,
    name: "Chennai",
  },
  {
    id: 8,
    name: "Kolkatta",
  },
];

export const method = [
  {
    id: 0,
    name: "Shia Ithna-Ansari",
  },
  {
    id: 1,
    name: "University of Islamic Sciences, Karachi",
  },
  {
    id: 2,
    name: "Islamic Society of North America",
  },
  {
    id: 3,
    name: "Muslim World League",
  },
  {
    id: 4,
    name: "Umm Al-Qura University, Makkah",
  },
  {
    id: 5,
    name: "Egyptian General Authority of Survey",
  },
  {
    id: 6,
    name: "Islamic Society of North America (ISNA)",
  },
  {
    id: 7,
    name: "Institute of Geophysics, University of Tehran",
  },
  {
    id: 8,
    name: "Gulf Region",
  },
  {
    id: 9,
    name: "Kuwait",
  },
  {
    id: 10,
    name: "Qatar",
  },
  {
    id: 11,
    name: "Majlis Ugama Islam Singapura, Singapore",
  },
  {
    id: 12,
    name: "Union Organization islamic de France",
  },
  {
    id: 13,
    name: "Diyanet İşleri Başkanlığı, Turkey",
  },
  {
    id: 14,
    name: "Spiritual Administration of Muslims of Russia",
  },
];
