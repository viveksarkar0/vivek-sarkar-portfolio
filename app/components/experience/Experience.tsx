"use client";
import { useState} from "react";
import React, { useEffect } from 'react';
import gsap from 'gsap';
import Flip from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExperienceItem from './ExperienceItem';
// Fixed typo in import path
import { Page } from './ui/Page';
import { StyledExperienceLayout } from "./ExperienceLaayout.styled";


gsap.registerPlugin(Flip, ScrollTrigger);
export const useScreenWidth = () => {
    const [width, setWidth] = useState<number>(0);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        // Only run this code on the client side
        setWidth(window.innerWidth);
  
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
  
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    }, []);
  
    return { width };
  };
  

const experiences = [
  { logo: '/images/logo1.png', title: 'Stealth Startup', description: 'Description for Stealth Startup' },
  { logo: '/images/logo2.png', title: 'RBL Bank', description: 'Description for RBL Bank' },
  { logo: '/images/logo3.png', title: 'GenioBits', description: 'Description for GenioBits' },
  { logo: '/images/logo4.png', title: 'DRAIC', description: 'Description for DRAIC' },
];

const Experience: React.FC = () => {
  const { width } = useScreenWidth();

  useEffect(() => {
    let cards = document.querySelectorAll(".experience-item");

    cards.forEach((card, i) => {
      card.classList.remove("active");
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener(width < 720 ? "click" : "mouseenter", () => {
        if (card.classList.contains("active")) return;

        const state = Flip.getState(cards);
        cards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");

        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });

    gsap.fromTo(
      '.experience-item',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1 }
    );
  }, [width]);

  return (
    <Page header='Experience'>
      <StyledExperienceLayout>
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            logo={exp.logo}
            title={exp.title}
            description={exp.description}
            className="experience-item"  // <-- Pass className prop here
          />
        ))}
      </StyledExperienceLayout>
    </Page>
  );
};

export default Experience;
