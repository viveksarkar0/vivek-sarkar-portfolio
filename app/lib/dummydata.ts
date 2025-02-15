export async function getDummyData() {
    return [
      {
        title: "Project One",
        _id: "1",
        link: "https://example.com/project-one",
        description: "This is a dummy description for Project One.",
        tags: ["Next.js", "Sanity", "TailwindCSS"],
        imageUrl: "https://via.placeholder.com/300",
      },
      {
        title: "Project Two",
        _id: "2",
        link: "https://example.com/project-two",
        description: "This is a dummy description for Project Two.",
        tags: ["React", "Drizzle", "NeonDB"],
        imageUrl: "https://via.placeholder.com/300",
      },
    ];
  }
  