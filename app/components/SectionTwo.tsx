import Image from "next/image";
import square from "../../public/square.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import figma from "../../public/tech-icons/figma.svg";
import chatgpt from "../../public/tech-icons/chatgpt.svg";
import framer from "../../public/tech-icons/framer.svg";
import github from "../../public/tech-icons/github.svg";
import slack from "../../public/tech-icons/slack.svg";
import discord from "../../public/tech-icons/discord.svg";
import youtube from "../../public/tech-icons/youtube.svg";
import chrome from "../../public/tech-icons/chrome.svg";
import notion from "../../public/tech-icons/notion.svg";
import reacts from "../../public/tech-icons/react.svg";
import docker from "../../public/tech-icons/discord.svg";
import prisma from "../../public/tech-icons/prisma.svg";
import nextjs from "../../public/tech-icons/nextjs.svg";
import mongodb from "../../public/tech-icons/mongodb.svg";
import typescript from "../../public/tech-icons/typescript.svg";
import js from "../../public/tech-icons/js.svg";
import turborepo from "../../public/tech-icons/turborepo.svg";
import taildwind from "../../public/tech-icons/tailwindcss.svg";

import twitter from "../../public/twitter.svg"
import insta from "../../public/insta.svg";
import linkedin from "../../public/linkedin.svg";
import { Button } from "@/components/ui/button";

const icons = [
 
  figma,
  chatgpt,
 
  framer,
  github,
  slack,
  discord,
  youtube,
  chrome,
 reacts,
  notion,
  docker,
  nextjs,
  mongodb,
  typescript,
  js,
  turborepo,
  prisma,
  taildwind

];

const socialMedia = [
  {
    id: 1,
    icon: insta,
    name: "Instagram",
    username: "@http.vivek.i",
    link: "http://localhost:3000/",
  },
  {
    id: 2,
    icon: twitter,
    name: "X / Twitter",
    username: "@imvivek009",
    link: "https://x.com/imvivek009?t=cIz90THBIcLiaN4sWfeF0Q&s=09",
  },
  {
    id: 3,
    icon: linkedin,
    name: "Linkedin",
    username: "Vivek Sarkar",
    link: "https://www.linkedin.com/in/vivek-sarkar-1358a4244/",
  },
];

export function SectionTwo() {
  return (
    <div className="grid gird-cols-1 lg:grid-cols-3 gap-4 mt-10">
      <div className="w-full relative col-span-1">
        <Image
          src={square}
          alt="square"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-full col-span-1 lg:col-span-2 gap-4">
        <Card className="bg-gray-100 border-none">
          <CardHeader>
            <CardTitle>Explore my stack</CardTitle>
            <CardDescription>Check out the tools i use daily</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {icons.map((item, index) => (
              <Image key={index} src={item} alt="Icon" className="w-16 h-16" />
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4">
          {socialMedia.map((item) => (
            <Card
              key={item.id}
              className="p-4 flex flex-col items-center sm:items-start bg-gray-100 border-none"
            >
              <Image src={item.icon} alt="Icon" className="w-16 h-16" />
              <h1 className="text-2xl font-medium pt-3">{item.name}</h1>
              <p className="text-muted-foreground">{item.username}</p>
              <Button className="mt-4" size="sm" asChild>
                <a href={item.link}>Follow</a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
