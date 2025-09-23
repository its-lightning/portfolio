"use client";

import { useState, useEffect } from "react";

const iconMap: { [key: string]: string } = {
  Python: "/images/icons8-python-64.png",
  Java: "/images/icons8-java-64.png",
  "C++": "/images/icons8-c++-64.png",
  JavaScript: "/images/icons8-javascript-64.png",
  SQL: "/images/icons8-sql-64.png",
  Arduino: "/images/icons8-arduino-64.png",
  Flask: "/images/icons8-flask-64.png",
  "Node.js": "/images/icons8-node-js-64.png",
  Django: "/images/icons8-django-64.png",
  "C#": "/images/icons8-c-sharp-logo-64.png",
  "Next.js": "/images/icons8-next.js-64.png",
  "React Native": "/images/icons8-react-native-64.png",
};

const skills = {
  programming: ["Python", "C++", "JavaScript", "SQL"],
  hardware: ["Arduino", "ESP32 libraries (PlatformIO integration)"],
  frameworks: ["Flask", "Django", "Next.js", "Node.js", "React Native"],
  tools: ["Docker", "Git", "PlatformIO", "Eclipse", "Jupyter Notebook"],
};

export default function Skills() {
  // About page's animated pixel-art space background
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pixel art elements (copied from About page)
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

  // Random stars (copied from About page)
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    color: Math.random() > 0.8 ? 
      Math.random() > 0.5 ? "#8BE9FD" : "#BD93F9" : 
      "#FFFFFF"
  }));

  // Constellations data (copied from About page)
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

  // --- SKILLS CARDS ---
  // No card backgrounds, no boxes, no extra styling, just the cards on the animated background
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Space Background (from About page) */}
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

      {/* Content: Only the skill cards, no extra boxes or backgrounds */}
      <div className="container mx-auto pt-16 sm:pt-20 pb-4 px-1 sm:py-6 sm:px-2 relative z-10">
        <div className="text-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
              Skills & Technologies
            </span>
          </h1>
          <div className="h-0.5 w-12 sm:w-16 mx-auto bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {Object.entries(skills).map(([category, items], index) => (
            <div key={index} className="">
              <h2 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center">
                <span className="inline-block mr-2 text-lg sm:text-xl">
                  {index === 0 ? "👨‍💻" : index === 1 ? "🔌" : index === 2 ? "🚀" : "🛠️"}
                </span>
                {category}
              </h2>
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-200">
                    {iconMap[item] ? (
                      <div className="w-7 h-7 mr-2 bg-gray-800 rounded-md flex items-center justify-center">
                        <img
                          src={iconMap[item]}
                          alt={item}
                          className="w-5 h-5"
                        />
                      </div>
                    ) : (
                      <div className="w-7 h-7 mr-2 bg-gray-800 rounded-md flex items-center justify-center">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                      </div>
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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