export interface Writing {
  date: string;
  desc: string;
  slug: string;
  num: string;
  title: string;
}

export const writings: Writing[] = [
  {
    date: "Jan 2025",
    desc: "A deep dive into how I think about building software that lasts.",
    num: "01",
    slug: "on-writing-code-that-ages-well",
    title: "On Writing Code That Ages Well",
  },
  {
    date: "Mar 2025",
    desc: "What embedded systems taught me about constraints and clarity.",
    num: "02",
    slug: "lessons-from-the-bare-metal",
    title: "Lessons from the Bare Metal",
  },
  {
    date: "May 2025",
    desc: "The small decisions that quietly define a product's character.",
    num: "03",
    slug: "details-are-the-product",
    title: "Details Are the Product",
  },
];
