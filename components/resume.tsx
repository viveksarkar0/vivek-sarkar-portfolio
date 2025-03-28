import { Icons } from "../components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Dillion Verma",
  initials: "DV",
  url: "https://dillion.io",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "Software Engineer turned Entrepreneur. I love building things and helping people. Very active on Twitter.",
  summary:
    "At the end of 2022, I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, [I pursued a double degree in computer science and business](/#education), [interned at big tech companies in Silicon Valley](https://www.youtube.com/watch?v=d-LJ2e5qKdE), and [competed in over 21 hackathons for fun](/#hackathons). I also had the pleasure of being a part of the first ever in-person cohort of buildspace called [buildspace sf1](https://buildspace.so/sf1).",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "C++",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/viveksarkar0",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/vivek-sarkar-1358a4244/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/imvivek009",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://dub.sh/dillion-youtube",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

 

  projects: [
    {
      title: "easyJackeckts",
      href: "https://www.easyjackets.com/",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        " Developed EasyJackets, a scalable e-commerce platform using the MERN stack, enabling jacket purchases with real-time customization. Integrated Stripe for secure payments with webhooks and PCI compliance. Built an admin dashboard for order tracking and product management using MongoDB aggregation pipelines. Optimized performance with server-side pagination, lazy loading, and JWT-based authentication",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.easyjackets.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "/record.mov",
    },
    {
      title: "Task Manager",
      href: "https://www.easyjackets.com/",
      dates: "sept 2024 - Dec 2024",
      active: true,
      description:
        "Designed, developed a Task manager app with Next.js, Prisma, PostgreSQL, and TailwindCSS. Integrated Stripe for subscription payments and Magic for passwordless authentication. Implemented a responsive UI with Shadcn and Magic UI.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://taskmanager-rho-three.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://taskmanager-rho-three.vercel.app/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/record2.mov",
    },
    {
      title: "Mystiyfy me",
      href: "https://llm.report",
      dates: "April 2024 - September 2024",
      active: true,
      description:
        "Developed an Anonymous message sending platform with next js prisma Postgres .",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://mystify-me-irca.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/viveksarkar0/MystifyMe.git",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/record3.mov",
    },
    {
      title: "Automatic Chat",
      href: "https://automatic.cha",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/come.jpg",
      video:
        "",
    },
  ],

} as const;
