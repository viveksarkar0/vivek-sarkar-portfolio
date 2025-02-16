"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Heart, Link } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  tags: string[];
  likes: number;
}

const FavoriteProjects: Project[] = [
  {
    id: 1,
    title: "Project One",
    description: "This is a dummy description for Project One.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    github: "https://github.com",
    tags: ["Next.js", "Sanity", "TailwindCSS"],
    likes: 128
  },
  {
    id: 2,
    title: "Project Two",
    description: "This is a dummy description for Project Two.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    github: "https://github.com",
    tags: ["React", "Drizzle", "NeonDB"],
    likes: 245
  }
];

const FavoriteProject = () => {
  const [likedProjects, setLikedProjects] = useState<Set<number>>(new Set());
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-16 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Featured Projects
          </span>
        </motion.h1>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {FavoriteProjects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { 
                  y: 0, 
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }
                }
              }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl">
                <div className="relative h-[300px] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={(e) => handleLike(project.id, e)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          likedProjects.has(project.id) ? 'fill-pink-500 text-pink-500' : ''
                        }`}
                      />
                      <span>{project.likes + (likedProjects.has(project.id) ? 1 : 0)}</span>
                    </motion.button>

                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                      whileHover={{ x: 5 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-5 h-5" />
                      <span>View Source</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedId(null)}
            >
              <motion.div
                layoutId={`project-${selectedId}`}
                className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {FavoriteProjects.find(p => p.id === selectedId) && (
                  <div>
                    <div className="relative h-[400px]">
                      <motion.img
                        src={FavoriteProjects.find(p => p.id === selectedId)!.image}
                        alt={FavoriteProjects.find(p => p.id === selectedId)!.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>

                    <motion.div 
                      className="p-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-4xl font-bold mb-4">
                        {FavoriteProjects.find(p => p.id === selectedId)!.title}
                      </h2>
                      <p className="text-gray-600 text-lg mb-6">
                        {FavoriteProjects.find(p => p.id === selectedId)!.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {FavoriteProjects.find(p => p.id === selectedId)!.tags.map((tag) => (
                          <motion.span
                            key={tag}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4">
                        <motion.button
                          onClick={(e) => handleLike(selectedId, e)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          <Heart
                            className={`w-6 h-6 transition-colors ${
                              likedProjects.has(selectedId) ? 'fill-pink-500 text-pink-500' : ''
                            }`}
                          />
                          <span className="text-lg">
                            {FavoriteProjects.find(p => p.id === selectedId)!.likes + 
                              (likedProjects.has(selectedId) ? 1 : 0)}
                          </span>
                        </motion.button>

                        <motion.a
                          href={FavoriteProjects.find(p => p.id === selectedId)!.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                          whileHover={{ x: 5 }}
                        >
                          <Github className="w-6 h-6" />
                          <span className="text-lg">View Source</span>
                        </motion.a>
                        <motion.a
                          href={FavoriteProjects.find(p => p.id === selectedId)!.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                          whileHover={{ x: 5 }}
                        >
                          <Link className="w-6 h-6" />
                          <span className="text-lg">View Source</span>
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      
      </div>
    </div>
  );
};

export default FavoriteProject;