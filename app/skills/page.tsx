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
  programming: ["Python", "Java", "C++", "JavaScript", "SQL"],
  hardware: ["Arduino", "ESP32 libraries (PlatformIO integration)"],
  frameworks: ["Flask", "Node.js", "Spring Boot", "Django", "Next.js", "React Native"],
  tools: ["PlatformIO", "Eclipse", "PyCharm", "Git", "Jupyter Notebook"],
};

export default function Skills() {
  const [isClient, setIsClient] = useState(false);
  
  // Only set this state after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Pre-determined star positions (for SSR consistency)
  const fixedStars = [
    { id: 1, x: 5, y: 15, size: 2, color: "#FFFFFF" },
    { id: 2, x: 25, y: 40, size: 1, color: "#8BE9FD" },
    { id: 3, x: 45, y: 20, size: 2, color: "#BD93F9" },
    { id: 4, x: 65, y: 60, size: 1, color: "#FFFFFF" },
    { id: 5, x: 85, y: 30, size: 2, color: "#8BE9FD" },
    { id: 6, x: 15, y: 70, size: 1, color: "#BD93F9" },
    { id: 7, x: 35, y: 85, size: 2, color: "#FFFFFF" },
    { id: 8, x: 55, y: 45, size: 1, color: "#8BE9FD" },
    { id: 9, x: 75, y: 10, size: 2, color: "#BD93F9" },
    { id: 10, x: 95, y: 75, size: 1, color: "#FFFFFF" }
  ];

  // Star component with fixed positioning
  const Star = ({ x, y, size, color }: { x: number; y: number; size: number; color: string }) => (
    <div 
      className="absolute" 
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        width: size, 
        height: size, 
        backgroundColor: color,
        boxShadow: `0 0 ${size}px ${color}`,
        borderRadius: "50%"
      }} 
    />
  );

  // Client-side component to generate random floating particles
  const RandomParticles = () => {
    interface Particle {
      id: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      delay: number;
      color: string;
    }
    const [particles, setParticles] = useState<Particle[]>([]);
    
    useEffect(() => {
      // Generate random particles only on client-side
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        color: Math.random() > 0.6 ? 
          Math.random() > 0.5 ? "#8BE9FD" : "#BD93F9" : 
          "#FFFFFF"
      }));
      
      setParticles(newParticles);
    }, []);
    
    return (
      <>
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full floating-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size}px ${particle.color}`,
              animation: `float ${particle.speed}s infinite ease-in-out`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </>
    );
  };
  
  // Modified to remove the animate-pulse option
  const getRandomCardStyle = (index: number) => {
    if (!isClient) return {};
    
    const animations = [
      // Removed "animate-pulse" from here
      "hover:scale-105 transition duration-300",
      "hover:shadow-lg hover:shadow-cyan-500/20 transition duration-300",
      "hover:border-cyan-400 transition duration-300"
    ];
    
    // Use a deterministic way to get a "random" animation
    const animIndex = (index * 7919) % animations.length; // Using prime number for distribution
    return { className: animations[animIndex] };
  };
  
  // Generate random skill item animations after hydration
  const getRandomItemStyle = (categoryIndex: number, itemIndex: number) => {
    if (!isClient) return {};
    
    // Use a seeded function for deterministic "randomness"
    const seed = categoryIndex * 100 + itemIndex; 
    const pseudoRandom = ((seed * 9719) % 1000) / 1000;  // Using prime number for distribution
    
    return {
      transform: `translateX(${pseudoRandom * 10 - 5}px)`,
      transition: `transform ${(pseudoRandom * 2 + 1)}s ease-in-out infinite`,
      animationDelay: `${pseudoRandom * 2}s`
    };
  };

  // Generate color styles for categories
  const categoryColors = [
    "from-purple-600 to-indigo-700",
    "from-cyan-600 to-blue-700",
    "from-rose-600 to-pink-700",
    "from-amber-600 to-orange-700"
  ];

  return (
    <div className="min-h-screen font-sans overflow-hidden relative">
      {/* Removed "bg-black" from the class above ^ */}
      
      {/* Fixed stars (SSR-compatible) - changed from fixed to absolute positioning */}
      <div className="absolute inset-0" style={{ zIndex: -10 }}>
        {fixedStars.map((star) => (
          <Star 
            key={star.id}
            x={star.x} 
            y={star.y} 
            size={star.size} 
            color={star.color} 
          />
        ))}
        
        {/* Client-side only random particles */}
        {isClient && <RandomParticles />}
        
        {/* Nebula background */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(130, 70, 190, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(60, 100, 190, 0.4) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl text-white font-extrabold mb-12 text-center tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
            Skills & Technologies
          </span>
        </h1>
        
        {/* Pixel art divider */}
        <div className="flex justify-center mb-10">
          <div className="flex space-x-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i} 
                className="h-1 w-3" 
                style={{ 
                  backgroundColor: i % 2 === 0 ? '#8BE9FD' : '#BD93F9',
                  opacity: 0.8
                }} 
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items], index) => {
            const randomStyle = getRandomCardStyle(index);
            
            return (
              <div
                key={index}
                className={`bg-gradient-to-r ${categoryColors[index % categoryColors.length]} rounded-xl p-6 shadow-md border border-gray-800 relative overflow-hidden ${randomStyle.className || ''}`}
              >
                {/* Card corner decorations */}
                <div className="absolute w-3 h-3 top-0 left-0 border-t border-l border-cyan-400"></div>
                <div className="absolute w-3 h-3 top-0 right-0 border-t border-r border-cyan-400"></div>
                <div className="absolute w-3 h-3 bottom-0 left-0 border-b border-l border-cyan-400"></div>
                <div className="absolute w-3 h-3 bottom-0 right-0 border-b border-r border-cyan-400"></div>
                
                {/* Background "circuit" pattern - only on client */}
                {isClient && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute" style={{ 
                      left: `${(index * 25) % 100}%`, 
                      top: `${(index * 15) % 100}%`,
                      width: '150px',
                      height: '150px',
                      background: 'radial-gradient(circle, rgba(139, 233, 253, 0.3) 0%, transparent 70%)'
                    }}></div>
                  </div>
                )}

                <h2 className="text-2xl font-bold capitalize text-white mb-6 flex items-center">
                  {/* Category Icon */}
                  <span className="inline-block mr-3 text-3xl">
                    {index === 0 ? "👨‍💻" : index === 1 ? "🔌" : index === 2 ? "🚀" : "🛠️"}
                  </span>
                  {category}
                </h2>
                
                <ul className="space-y-4">
                  {items.map((item, idx) => {
                    const itemStyle = getRandomItemStyle(index, idx);
                    
                    return (
                      <li 
                        key={idx} 
                        className="flex items-center text-gray-200 bg-black bg-opacity-40 p-3 rounded-lg backdrop-blur-sm"
                        style={isClient ? itemStyle : {}}
                      >
                        {iconMap[item] ? (
                          <div className="w-8 h-8 mr-3 bg-gray-800 rounded-md flex items-center justify-center">
                            <img
                              src={iconMap[item]}
                              alt={item}
                              className="w-6 h-6"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 mr-3 bg-gray-800 rounded-md flex items-center justify-center">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                          </div>
                        )}
                        <span>{item}</span>
                        
                        {/* Client-side only decoration dot */}
                        {isClient && (
                          <span 
                            className="ml-auto w-2 h-2 rounded-full" 
                            style={{ 
                              backgroundColor: idx % 2 === 0 ? '#8BE9FD' : '#BD93F9',
                              boxShadow: `0 0 5px ${idx % 2 === 0 ? '#8BE9FD' : '#BD93F9'}`
                            }}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Client-side only animations */}
      {isClient && (
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          
          .floating-particle {
            opacity: 0.7;
            transition: all 0.3s ease;
          }
        `}</style>
      )}
    </div>
  );
}