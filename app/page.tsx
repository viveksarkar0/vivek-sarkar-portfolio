import { ProjectCard } from "@/components/project-card";
import { AboutSection } from "./components/AboutSection";
import { ExperienceTab } from "./components/ExperienceTab";
import FavoriteProject from "./components/FavoriteProjects";

import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { SectionTwo } from "./components/SectionTwo";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/components/resume";
import { Card } from "@/components/ui/card";
const BLUR_FADE_DELAY = 0.04;
export default function Home() {
  return (
    <div className="max-w-7xl w-full px-4 md:px-8 mx-auto">
           
       <BlurFade delay={BLUR_FADE_DELAY*2 }>
       <Hero />
       </BlurFade>
    
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
      <SectionTwo />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
      <AboutSection />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
      <ExperienceTab/>
      </BlurFade>
      
      <div className=" gap-4 mt-10">
      <Card className="  border-none bg-gray-100 p-8">
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-11 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      </Card>
      </div>
      <Footer />
    </div>
  );
}
