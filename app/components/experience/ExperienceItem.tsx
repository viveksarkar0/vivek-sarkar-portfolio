"use client"
import React, { useEffect, useRef } from 'react';
import { StyledExperienceItem } from './ExperienceItem.styled';
import gsap from 'gsap';

interface ExperienceItemProps {
  logo: string;
  title: string;
  description: string;
  className?: string; // Ensure className is optional
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ logo, title, description, className }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = itemRef.current;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%', // Trigger animation when the item is in the viewport
        },
      }
    );
  }, []);

  return (
    <StyledExperienceItem ref={itemRef} className={className}>
      <div className="header">
        <div className="image">
          <div className="wrapper">
            {/* <img src={logo} alt={title} /> */}
          </div>
        </div>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </StyledExperienceItem>
  );
};

export default ExperienceItem;