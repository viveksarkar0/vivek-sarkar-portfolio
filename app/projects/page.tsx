import BlurFade from '@/components/magicui/blur-fade'
import { ProjectCard } from '@/components/project-card'
import { DATA } from '@/components/resume';
import React from 'react'
const BLUR_FADE_DELAY = 0.04;
const Project = () => {
  return (
    <div className="grid grid-cols-1 gap-11 sm:grid-cols-2 max-w-[800px] mx-auto">
    {DATA.projects.map((project, id) => (
      <BlurFade
        key={project.title}
        delay={BLUR_FADE_DELAY * 12 + id * 0.05}
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
  )
}

export default Project