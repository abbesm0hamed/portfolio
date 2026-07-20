export interface Work {
  desc: string;
  slug: string;
  images: string[];
  title: string;
  num: string;
  role: string;
  stack: string;
  year: string;
}

export const works: Work[] = [
  {
    desc: "A short description of what this work does and why it matters.",
    images: ["/images/work/work-01.jpg", "/images/work/work-01.jpg"],
    num: "01",
    role: "Full-Stack",
    slug: "work-01",
    stack: "TypeScript, React",
    title: "Work One",
    year: "2025",
  },
  {
    desc: "Another work, different scope, same attention to detail.",
    images: ["/images/work/work-02.jpg"],
    num: "02",
    role: "Frontend",
    slug: "work-02",
    stack: "Astro, Tailwind",
    title: "Work Two",
    year: "2025",
  },
  {
    desc: "The one that taught me the most. Full-stack, end to end.",
    images: ["/images/work/work-03.jpg"],
    num: "03",
    role: "Backend",
    slug: "work-03",
    stack: "Go, PostgreSQL",
    title: "Work Three",
    year: "2024",
  },
];
