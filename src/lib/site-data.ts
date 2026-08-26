// Every string below is sourced verbatim from the client's PROJECT DETAILS.docx and the
// logo animation asset. Do not paraphrase bios or invent contact details here.

export const SITE = {
  brandName: "EYE-NEWS INDIAN TIMES",
  legalName: "EYE NEWS INDIA",
  parentEntity: "EYE-PAC INDIA CONSULTING PRIVATE LIMITED",
  tagline: "Truth. Insight. Impact.",
  domain: "eye-news.in",
  url: "https://eye-news.in",
};

export interface Founder {
  slug: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  socials: { label: string; url: string }[];
}

export const FOUNDERS: Founder[] = [
  {
    slug: "prashanth-kumar-reddy",
    name: "PRASHANTH KUMAR J R REDDY",
    title: "Founder & Managing Director",
    email: "Prasanthjr9771@gmail.com",
    phone: "9440728445",
    photo: "/founders/prashant-reddy.jpg",
    bio: "PRASHANTH KUMAR J R REDDY is a Political Strategist, Entrepreneur and Media Professional, serving as Founder & Director of EYE-PAC INDIA CONSULTING PRIVATE LIMITED and Founder & Managing Director of EYE NEWS INDIA. He combines grassroots intelligence, political strategy, technology and media to build impactful political and public communication solutions.",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/prashanth_reddyoffical?igsi=M3h5MWNjeXN3bnB5" },
      { label: "Facebook", url: "https://www.facebook.com/share/1BkEyVoBXw/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/jrprasanthkumar?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { label: "X", url: "https://x.com/Jrreddy67279544" },
    ],
  },
  {
    slug: "deepak-thakur",
    name: "Deepak Thakur",
    title: "Co-Founder & Director",
    email: "deepakkr2443@gmail.com",
    phone: "7857837221",
    photo: "/founders/deepak-thakur.jpg",
    bio: "Deepak Thakur is a Social Activist, Political Consultant, Entrepreneur and Media Professional, and the Co-Founder & Director of EYE-PAC INDIA CONSULTING PRIVATE LIMITED and Co-Founder & Director of EYE NEWS INDIA. With experience in political campaigns, grassroots engagement, field operations and public communication, he brings together ground intelligence, strategic thinking, technology and media. His professional journey reflects a strong commitment to understanding people, local issues and the realities of public life. Through EYE-PAC, he contributes to building data-driven political strategies and effective campaign solutions, while through EYE NEWS INDIA, he works toward strengthening political and public-interest communication in the digital era.",
    socials: [
      { label: "Facebook", url: "https://www.facebook.com/share/19cSzne8hK/" },
      { label: "Instagram", url: "https://www.instagram.com/deepakkr_thakur_?igsi=YjU0dHY4YzE0aDFv" },
      { label: "X", url: "https://x.com/deepakkr_thakur" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/deepakkrthakur?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { label: "Threads", url: "https://www.threads.com/@deepakkr_thakur_" },
      { label: "Website", url: "http://deepakkr.teachmint.in/" },
    ],
  },
  {
    slug: "asad-shaikh",
    name: "Asad Shaikh",
    title: "Managing Editor & Media Head",
    email: "asadshaikh401@gmail.com",
    phone: "9990299040",
    photo: "/founders/asad-shaikh.png",
    bio: "Asad Shaikh is a Political Consultant & Communication Professional with 6+ years of experience in political consultancy, electoral strategy, political communication, PR, content writing, and social media management. Experience across Delhi, Haryana, and Bihar, with 8 elections and 2 yatras covered. Worked on political campaigns associated with AAP, BJP, Congress, INLD, and Jan Suraj Party. Core expertise includes campaign communication, digital strategy, political content, social media management, PR, research, and electoral messaging.",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/the_asad_speaks?igsi=MWRtNTRkMndnNTZzMQ==" },
      { label: "Facebook", url: "https://www.facebook.com/share/1DZyGXSBeH/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/asad-shaikh-28330527a?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { label: "X", url: "https://x.com/exwriterr" },
    ],
  },
];

export interface Service {
  slug: string;
  name: string;
  description: string;
}

// Drafted from the founders' bio language and approved by the client on 2026-08-22.
export const SERVICES: Service[] = [
  {
    slug: "political-strategy-campaign-consulting",
    name: "Political Strategy & Campaign Consulting",
    description:
      "End-to-end campaign strategy and political consulting under EYE-PAC INDIA CONSULTING — from positioning to full campaign execution.",
  },
  {
    slug: "grassroots-intelligence-field-operations",
    name: "Grassroots Intelligence & Field Operations",
    description:
      "Ground-level intelligence, field operations and local issue mapping, built on direct experience in campaigns and community engagement.",
  },
  {
    slug: "data-driven-campaign-analytics",
    name: "Data-Driven Campaign Analytics",
    description:
      "Data-backed political strategy and decision support that turns ground intelligence into actionable campaign direction.",
  },
  {
    slug: "media-public-communication",
    name: "Media & Public Communication",
    description:
      "Political and public-interest communication delivered by career media professionals across traditional and digital channels.",
  },
  {
    slug: "digital-political-communication",
    name: "Digital Political Communication",
    description:
      "Strengthening political and public communication for the digital era through EYE NEWS INDIA's media and technology platform.",
  },
];

export const CONTACT = {
  primaryEmail: "info@eyenewsindia.com",
  primaryPhone: "8800000000", // official company phone line
  whatsappNumber: "917416343465", // dedicated WhatsApp line, international format for wa.me
  whatsappMessage: "Hi, I'd like to get in touch regarding EYE NEWS INDIA.",
};

export interface JobOpening {
  slug: string;
  title: string;
  location: string;
  type: string;
}

// No open requisitions provided by the client — the Careers page ships with a general
// "join the team" application form and an empty state here rather than invented listings.
export const JOB_OPENINGS: JobOpening[] = [];
