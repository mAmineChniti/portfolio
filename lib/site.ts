export const site = {
  url: "https://maminechniti.dev",
  name: "mAmineChniti.dev",
  title: "Med Amine Chniti — Software Engineer",
  description:
    "Med Amine Chniti builds backend systems, web applications, and developer tools with TypeScript, Python, Go, Rust, React, and Next.js.",
  locale: "en_US",
  language: "en-US",
  category: "technology",
  themeColor: {
    light: "#f3fcff",
    dark: "#010810",
  },
  brandColor: "#5556cd",
  palette: {
    background: "#f3fcff",
    card: "#fcffff",
    foreground: "#07121e",
    mutedForeground: "#3d4f5f",
    border: "#c8dbe6",
    primary: "#5556cd",
    chart2: "#ec5448",
    chart3: "#17a750",
    chart4: "#00ae98",
  },
} as const;

export const author = {
  name: "Med Amine Chniti",
  jobTitle: "Software Engineering Student",
  email: "emin.chniti@esprit.tn",
  github: "https://github.com/mAmineChniti",
  location: {
    locality: "Ariana",
    country: "TN",
  },
} as const;

export const sameAs = [author.github] as const;

export const education = [
  {
    name: "ESPRIT",
    fullName: "Private Higher School of Engineering and Technologies",
    startDate: "2022",
    current: true,
  },
  {
    name: "Higher Institute of Computer Science",
    fullName: "Higher Institute of Computer Science",
    startDate: "2021",
    endDate: "2022",
    current: false,
  },
] as const;

export const siteKeywords = [
  "Med Amine Chniti",
  "mAmineChniti",
  "Med Amine Chniti portfolio",
  "Med Amine Chniti developer",
  "mAmineChniti.dev",
  "software engineer Tunisia",
  "software engineering student ESPRIT",
  "full stack developer Tunisia",
  "backend developer",
  "frontend developer",
  "web developer",
  "software engineer portfolio",
  "open source contributions",
  "GitHub profile",
];
