"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import CardContent from "@/components/CardContent";

export default function About() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      title: "About Me",
      text: [
        "I'm a Computer Science undergrad at SRM IST with a passion for artificial intelligence, embedded systems, and full-stack development. I love blending hardware with intelligent software to build impactful solutions.",
        "I've worked on a variety of projects—both solo and collaborative—ranging from IoT-based systems like the Smart Greenhouse to socially-driven apps like Feast Forward. My core strengths lie in creating systems that combine data, design, and hardware control to solve real-world problems.",
        "Since early 2023, I've also been running an AI tutoring service for high school students. I specialize in simplifying complex topics like neural networks, machine learning algorithms, and NLP, using custom exercises and hands-on approaches to make AI more accessible and engaging.",
        "Beyond tech, I have a deep appreciation for music theory and enjoy analyzing the structure of compositions across genres. I also played competitive volleyball in high school, which taught me a lot about teamwork, discipline, and mental focus—skills that still influence how I approach engineering and problem-solving today.",
      ],
      icon: "👨‍💻",
      bg: "from-purple-600 to-indigo-700",
    },
    {
      title: "Experience",
      text: [
        "AI Tutoring Service – Tutor (Jan 2023 – Present)",
        "• Provided personalized AI tutoring to high school students on topics like machine learning, neural networks, and NLP.",
        "• Designed customized learning paths, exercises, and projects to fit each student's level and interest.",
        "• Helped students improve their conceptual understanding and confidence in advanced AI topics.",
      ],
      icon: "🚀",
      bg: "from-teal-600 to-cyan-700",
    },
    {
      title: "Education",
      text: [
        "SRM Institute of Science and Technology, Kattankulathur",
        "B.Tech in Computer Science (Graduation: May 2027)",
        "GPA: 8.92/10.00",
        "Concentrations: AI, Modeling/Simulations, Hardware, and Embedded Projects",
        "Relevant Coursework: Data Structures & Algorithms, Machine Learning, AI, Object-Oriented Programming, and Statistics.",
      ],
      icon: "🎓",
      bg: "from-yellow-500 to-orange-600",
    },
    {
      title: "Certifications",
      text: [
        "•  Nptel, Programming in Java ",
        "•	C Programming For Beginners - Master the C Language, Udemy",
        "•	Learn C++ Programming -Beginner to Advance- Deep Dive in C++, Udemy",
      ],
      icon: "🏆",
      bg: "from-red-600 to-pink-700",
    },
  ];

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
        boxShadow: `0 0 ${size}px ${color}`
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
      }}
    />
  );

  const PixelMoon = ({ x, y, size, baseColor }: { x: number; y: number; size: number; baseColor: string }) => {
    const pixelSize = size / 10;
    const moonPixels = [
      [0,1,1,1,0],
      [1,1,1,1,1],
      [1,1,1,1,1],
      [1,1,1,1,1],
      [0,1,1,1,0],
    ];
    
    return (
      <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
        {moonPixels.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((pixel, pixelIndex) => (
              pixel ? (
                <div 
                  key={pixelIndex} 
                  style={{ 
                    width: pixelSize, 
                    height: pixelSize, 
                    backgroundColor: baseColor,
                    opacity: 0.7 + Math.random() * 0.3
                  }} 
                />
              ) : <div key={pixelIndex} style={{ width: pixelSize, height: pixelSize }} />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const PixelComet = ({startX,startY,length,angle,speed}: {startX: number;startY: number;length: number;angle: number;speed: number;}) => {
    const animationDuration = 15 / speed;
    
    return (
      <div 
        className="absolute" 
        style={{
          left: `${startX}%`,
          top: `${startY}%`,
          width: `${length}px`,
                    background: 'linear-gradient(to left, rgba(255,255,255,0.8), rgba(255,255,255,0))',
          transform: `rotate(${angle}deg)`,
          animation: `comet ${animationDuration}s linear infinite`,
          animationDelay: `${Math.random() * animationDuration}s`
        }}
      />
    );
  };

  const PixelConstellation = ({points,x,y,scale}: {points: { x: number; y: number }[];x: number;y: number;scale: number;}) => {
    return (
      <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
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
  const stars = Array.from({ length: 150 }, (_, i) => ({
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
      x: 15,
      y: 20,
      scale: 0.8,
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
      x: 65,
      y: 60,
      scale: 0.6,
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
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Space Background */}
      <div className="fixed inset-0 bg-black" style={{ zIndex: -10 }}>
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
          x={10} 
          y={30} 
          size={60} 
          colors={["#FF9D00", "#FF4D00", "#7E2500"]} 
        />
        <PixelPlanet 
          x={80} 
          y={70} 
          size={40} 
          colors={["#00FFFF", "#0099FF", "#0044AA"]} 
        />
        <PixelMoon x={75} y={20} size={30} baseColor="#CCCCFF" />

        {/* Comets */}
        <PixelComet startX={10} startY={15} length={50} angle={30} speed={0.7} />
        <PixelComet startX={80} startY={40} length={40} angle={-15} speed={1.2} />

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
      <div className="container mx-auto py-16 px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
              About Me
            </span>
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full"></div>
        </div>

        {/* Animated Pixel Border */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-32 w-3/4 h-1 overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="transform transition duration-500 hover:scale-105"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transform: `translateY(${Math.min(0, -30 + scrollPosition/10)}px)` 
              }}
            >
              <div className={`bg-gradient-to-r ${section.bg} rounded-2xl shadow-xl overflow-hidden border border-gray-700`}>
                {/* Pixelated Card Corner Decorations */}
                <div className="absolute w-3 h-3 top-0 left-0 border-t border-l border-cyan-400"></div>
                <div className="absolute w-3 h-3 top-0 right-0 border-t border-r border-cyan-400"></div>
                <div className="absolute w-3 h-3 bottom-0 left-0 border-b border-l border-cyan-400"></div>
                <div className="absolute w-3 h-3 bottom-0 right-0 border-b border-r border-cyan-400"></div>
                
                <div className="flex items-center p-6 border-b border-gray-700 relative">
                  <span className="text-4xl mr-4">{section.icon}</span>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  
                  {/* Pixel Decoration */}
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <div className="w-1 h-1 bg-cyan-300 inline-block mr-1"></div>
                    <div className="w-1 h-1 bg-cyan-400 inline-block mr-1"></div>
                    <div className="w-1 h-1 bg-cyan-500 inline-block"></div>
                  </div>
                </div>
                
                <div className="p-6 bg-black bg-opacity-50 relative">
                  {section.text.map((line, i) => (
                    <p key={i} className={`text-gray-200 ${i > 0 ? 'mt-4' : ''}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
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

      {/* KeyFrame Animation for Comets */}
      <style jsx global>{`
        @keyframes comet {
          0% { transform: translateX(0) rotate(var(--angle)); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(-100vw) rotate(var(--angle)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
