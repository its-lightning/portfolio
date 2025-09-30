"use client";

import { useState, useEffect } from "react";
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
    title: "Multiplayer tetris",
    description:
      "A multiplayer Tetris game built with Node.js and Socket.io, featuring real-time gameplay and competitive scoring.",
    image: "/images/tetris.png",
    tags: ["Sockets", "Cloudflare domain", "Game"],
    link: "https://tetris-seven-phi.vercel.app/login"
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
    title: "Sudoku Solver and backtracking visualizer",
    description:
      "A web app that solves Sudoku puzzles using backtracking algorithm and visualizes the solving process step-by-step.",
    image: "/images/sudoku.png",
    tags: ["AI", "Simulation", "Backtracking"],
    link: "https://sudoku-eta-woad.vercel.app/"
  },
  {
    title: "Smart Greenhouse",
    description:
      "An IoT-based greenhouse automation system using ESP32 with sensors for temperature, light, moisture, and gas monitoring, integrated with a website for real-time display.",
    image: "/images/smart-greenhouse.png",
    tags: ["IoT", "ESP32", "Sensors", "Web Dashboard"],
    link: "https://smartgh.vercel.app/"
  },
  {
    title: "Lighto",
    description:
      "Gesture-based lighting system using an ultrasonic sensor. Displays the user profile when recognized gestures are performed.",
    image: "/images/lighto.png",
    tags: ["Gesture Control", "Ultrasonic Sensor", "Hardware"],
    link: "/projects/lighto"
  },
  {
    title: "Mystic Sword",
    description:
      "A wave-based, single/multiplayer game with a customizable keybinding system and MySQL database integration for player stats and progression.",
    image: "/images/mystic-sword.png",
    tags: ["Game", "Multiplayer", "MySQL"],
    link: "/projects/mystic-sword"
  },
  {
    title: "Feast Forward",
    description:
      "A food donation management system that connects donors with NGOs and food banks using a smart logistics algorithm.",
    image: "/images/feast-forward.png",
    tags: ["Donation", "Logistics", "Web App"],
    link: "/projects/feast-forward"
  }
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
}) => {
  // Random rotation for floating effect, different for each card
  const rotation = Math.random() * 4 - 2; // Between -2 and 2 degrees
  
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div 
        className="cursor-pointer transform hover:scale-105 transition-all duration-500 rounded-xl bg-black bg-opacity-60 text-white shadow-lg overflow-hidden border border-gray-700 relative"
        style={{
          animation: `float 6s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
          transform: `rotate(${rotation}deg)`
        }}
      >
        {/* Pixel corner decorations */}
        <div className="absolute w-3 h-3 top-0 left-0 border-t border-l border-cyan-400"></div>
        <div className="absolute w-3 h-3 top-0 right-0 border-t border-r border-cyan-400"></div>
        <div className="absolute w-3 h-3 bottom-0 left-0 border-b border-l border-cyan-400"></div>
        <div className="absolute w-3 h-3 bottom-0 right-0 border-b border-r border-cyan-400"></div>
        
        <div className="p-4 relative">
          <img src={image} alt={title} className="w-full h-50 object-cover rounded-md" />
          
          {/* Subtle pixel grid overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(139, 233, 253, 0.1) 10px, rgba(139, 233, 253, 0.1) 20px),
                repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(189, 147, 249, 0.1) 10px, rgba(189, 147, 249, 0.1) 20px)
              `
            }}
          />
        </div>
        
        <div className="p-6 bg-gradient-to-b from-black to-gray-900 relative">
          {/* Pixel decoration */}
          <div className="absolute right-6 top-4">
            <div className="w-1 h-1 bg-cyan-300 inline-block mr-1"></div>
            <div className="w-1 h-1 bg-cyan-400 inline-block mr-1"></div>
            <div className="w-1 h-1 bg-cyan-500 inline-block"></div>
          </div>
          
          <h2 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
            {title}
          </h2>
          <p className="text-sm text-gray-300 mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-800 border border-gray-700 px-3 py-1 text-xs rounded-full transition-colors hover:border-cyan-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default function Portfolio() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pixel art elements
  const PixelStar = ({ x, y, size, color }: { x: number; y: number; size: number; color: string }) => (
    <div 
      className="absolute" 
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        width: size, 
        height: size, 
        backgroundColor: color,
        boxShadow: `0 0 ${size}px ${color}`,
        opacity: Math.random() * 0.5 + 0.5
      }} 
    />
  );

  const PixelPlanet = ({ x, y, size, colors }: { x: number; y: number; size: number; colors: string[] }) => (
    <div 
      className="absolute" 
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: `radial-gradient(circle at ${size * 0.3}px ${size * 0.3}px, ${colors[0]} 0%, ${colors[1]} 60%, ${colors[2]} 100%)`,
        boxShadow: `0 0 ${size / 5}px ${colors[0]}`,
        transform: `translateY(${Math.sin(scrollPosition / 500) * 10}px)`,
        zIndex: -5
      }}
    />
  );

  const PixelConstellation = ({points, x, y, scale}: {points: { x: number; y: number }[]; x: number; y: number; scale: number;}) => {
    return (
      <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, zIndex: -5 }}>
        <svg width={100 * scale} height={100 * scale} viewBox="0 0 100 100">
          {/* Lines connecting stars */}
          {points.map((point, i) => {
            if (i < points.length - 1) {
              return (
                <line 
                  key={`line-${i}`}
                  x1={point.x} 
                  y1={point.y} 
                  x2={points[i+1].x} 
                  y2={points[i+1].y}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              );
            }
            return null;
          })}
          
          {/* Stars at vertices */}
          {points.map((point, i) => (
            <rect 
              key={`star-${i}`}
              x={point.x - 1} 
              y={point.y - 1} 
              width="2" 
              height="2" 
              fill="white" 
            />
          ))}
        </svg>
      </div>
    );
  };

  // Random stars
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    color: Math.random() > 0.8 ? 
      Math.random() > 0.5 ? "#8BE9FD" : "#BD93F9" : 
      "#FFFFFF"
  }));

  // Constellations data
  const constellations = [
    {
      id: 1,
      x: 10,
      y: 15,
      scale: 0.6,
      points: [
        { x: 10, y: 10 },
        { x: 25, y: 30 },
        { x: 40, y: 20 },
        { x: 60, y: 35 },
        { x: 75, y: 15 }
      ]
    },
    {
      id: 2,
      x: 60,
      y: 60,
      scale: 0.5,
      points: [
        { x: 10, y: 40 },
        { x: 30, y: 30 },
        { x: 50, y: 50 },
        { x: 30, y: 70 },
        { x: 10, y: 40 }
      ]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-black">
      {/* Space Background */}
      <div className="fixed inset-0" style={{ zIndex: -10 }}>
        {/* Pixel Stars */}
        {stars.map(star => (
          <PixelStar 
            key={star.id}
            x={star.x} 
            y={star.y} 
            size={star.size} 
            color={star.color}
          />
        ))}

        {/* Pixel Planets */}
        <PixelPlanet 
          x={15} 
          y={20} 
          size={40} 
          colors={["#8BE9FD", "#0099FF", "#0044AA"]} 
        />
        <PixelPlanet 
          x={85} 
          y={70} 
          size={60} 
          colors={["#FF9D00", "#FF4D00", "#7E2500"]} 
        />

        {/* Constellations */}
        {constellations.map(constellation => (
          <PixelConstellation 
            key={constellation.id}
            x={constellation.x}
            y={constellation.y}
            scale={constellation.scale}
            points={constellation.points}
          />
        ))}

        {/* Subtle Pixelated Nebula Grid */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(86, 30, 160, 0.1) 10px, rgba(86, 30, 160, 0.1) 20px),
              repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(30, 86, 160, 0.1) 10px, rgba(30, 86, 160, 0.1) 20px)
            `
          }}
        />
      </div>

      {/* Content Container */}
  <div className="container mx-auto py-16 px-4 relative z-10 scale-95 md:scale-90" style={{ transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
              My Projects
            </span>
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full mb-8"></div>
          
          {/* Animated Pixel Border */}
          <div className="w-3/4 mx-auto h-1 overflow-hidden relative mb-8">
            <div className="animate-pulse">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute h-1" 
                  style={{ 
                    left: `${i * 5}%`, 
                    width: '4%', 
                    backgroundColor: i % 2 === 0 ? '#8BE9FD' : '#BD93F9',
                    opacity: 0.6
                  }} 
                />
              ))}
            </div>
          </div>
          
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore my universe of projects - from AI simulations to IoT systems. Each project represents a different 
            constellation in my coding journey through the cosmos of technology.
          </p>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1000px' }}
        >
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              style={{ 
                transformStyle: 'preserve-3d',
                transform: `translateZ(${Math.sin(scrollPosition / 1000 + idx) * 10}px)`,
                transition: 'transform 0.5s ease-out'
              }}
            >
              <Project {...project} />
            </div>
          ))}
        </div>
        
        {/* Pixel Art Footer Decoration */}
        <div className="mt-16 text-center">
          <div className="inline-block">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="flex justify-center">
                {Array.from({ length: 11 }).map((_, j) => {
                  const distance = Math.sqrt(Math.pow(i-5, 2) + Math.pow(j-5, 2));
                  return distance <= 5 && distance > 3.5 ? (
                    <div 
                      key={j} 
                      className="w-2 h-2" 
                      style={{ 
                        backgroundColor: j % 2 === 0 ? '#8BE9FD' : '#BD93F9',
                        opacity: 0.6
                      }}
                    />
                  ) : (
                    <div key={j} className="w-2 h-2" />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KeyFrame Animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--rotation, 0deg)); }
          100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
        }
      `}</style>
    </div>
  );
}