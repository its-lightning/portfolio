import React from "react";
import Link from "next/link";

const projects = [
  {
    title: "AI for Tic Tac Toe",
    description:
      "An unbeatable AI agent built using minimax algorithm with pruning for the classic Tic Tac Toe game.",
    image: "/images/tictactoe.png",
    tags: ["AI", "Minimax", "Game"],
    link: "https://myflask-phi.vercel.app/"
  },
  {
    title: "Wumpus World Simulation",
    description:
      "A simulation of the Wumpus World problem using AI agents to demonstrate knowledge-based inference and decision-making.",
    image: "/images/wumpusworld.png",
    tags: ["AI", "Simulation", "Logic"],
    link: "https://wumpus-world-delta.vercel.app/"
  },
  {
    title: "Smart Greenhouse",
    description:
      "An IoT-based greenhouse automation system using ESP32 with sensors for temperature, light, moisture, and gas monitoring, integrated with a website for real-time display.",
    image: "/images/smart-greenhouse.png",
    tags: ["IoT", "ESP32", "Sensors", "Web Dashboard"],
    link: "https://smartgh.vercel.app/"
  },
  // {
  //   title: "Lighto",
  //   description:
  //     "Gesture-based lighting system using an ultrasonic sensor. Displays the user profile when recognized gestures are performed.",
  //   image: "/images/lighto.png",
  //   tags: ["Gesture Control", "Ultrasonic Sensor", "Hardware"],
  //   link: "/projects/lighto"
  // },
  // {
  //   title: "Mystic Sword",
  //   description:
  //     "A wave-based, single/multiplayer game with a customizable keybinding system and MySQL database integration for player stats and progression.",
  //   image: "/images/mystic-sword.png",
  //   tags: ["Game", "Multiplayer", "MySQL"],
  //   link: "/projects/mystic-sword"
  // },
  // {
  //   title: "Feast Forward",
  //   description:
  //     "A food donation management system that connects donors with NGOs and food banks using a smart logistics algorithm.",
  //   image: "/images/feast-forward.png",
  //   tags: ["Donation", "Logistics", "Web App"],
  //   link: "/projects/feast-forward"
  // }
];

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const Project: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  tags,
  link
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block"
  >
    <div className="cursor-pointer transform hover:scale-105 transition-transform duration-300 rounded-xl bg-[#111111] text-white shadow-md overflow-hidden border border-gray-700">
      <div className="p-4">
        <img src={image} alt={title} className="w-full h-50 object-cover rounded-md" />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-400 mb-3">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-800 px-3 py-1 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </a>
);

export default function Portfolio() {
  return (
    <div className="bg-black min-h-screen">
      <div className="px-6 py-12">
        <h1 className="text-3xl md:text-5xl text-white font-bold mb-10 text-center">
          My Projects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <Project key={idx} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
