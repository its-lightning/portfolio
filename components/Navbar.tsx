"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const pathname = usePathname(); // Get the current route
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const animationFrameRef = useRef<number>(0);
  const textPositionsRef = useRef<Map<string, number>>(new Map());
  const targetPositionRef = useRef<{x: number, width: number}>({x: 0, width: 0});
  const currentPositionRef = useRef<{x: number, width: number}>({x: 0, width: 0});

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    //{ name: "Contact", href: "/contact" },
  ];

  // Track the current active link (either hovered or current path)
  const activeLink = hoveredLink || pathname;

  // Initialize text positions for bobbing animation
  useEffect(() => {
    links.forEach(link => {
      textPositionsRef.current.set(link.href, 0);
    });
  }, [links]);

  // Update target position when active link changes
  useEffect(() => {
    if (!navRef.current) return;
    
    const nav = navRef.current;
    const rect = nav.getBoundingClientRect();
    
    // Find position of active link
    links.forEach(link => {
      const linkElement = document.getElementById(`nav-link-${link.href.replace(/\//g, '-')}`);
      if (linkElement && link.href === activeLink) {
        const linkRect = linkElement.getBoundingClientRect();
        targetPositionRef.current = {
          x: linkRect.left - rect.left,
          width: linkRect.width
        };
        
        // Initialize current position if it's at 0
        if (currentPositionRef.current.width === 0) {
          currentPositionRef.current = { ...targetPositionRef.current };
        }
      }
    });
  }, [activeLink, links]);

  // Draw the hoverboard and animate it
  useEffect(() => {
    const canvas = canvasRef.current;
    const nav = navRef.current;
    if (!canvas || !nav) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match navbar
    const dpr = window.devicePixelRatio || 1;
    const rect = nav.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Helper function to draw a pixel with specified color
    const drawPixel = (x: number, y: number, color: string, size = 2) => {
      ctx.fillStyle = color;
      ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
    };

    // Draw pixelated hoverboard
    const drawPixelatedHoverboard = (x: number, width: number, y: number, time: number) => {
      const hoverHeight = Math.sin(time * 1.5) * 1;
      const boardWidth = Math.max(20, width * 0.8);
      const boardHeight = 6; 
      const boardX = x + 8 + (width - boardWidth) / 2;
      // Move the hoverboard lower by increasing the offset (was y + 10)
      const boardY = y + 3 + hoverHeight;
      
      const pixelSize = 2;
      
      // Board base colors
      const boardOutline = "#3a6eff";
      const boardFill = "#2a3a8d";
      const thrusterColor = "#888";
      const glowColor = "#5d8fff";
      
      // Draw curved-style board with pixels
      // Outline top
      for (let i = 2; i < boardWidth - 2; i++) {
        drawPixel(boardX + i, boardY, boardOutline, pixelSize);
      }
      
      // Corner pixels
      drawPixel(boardX + 1, boardY + 1, boardOutline, pixelSize);
      drawPixel(boardX + boardWidth - 2, boardY + 1, boardOutline, pixelSize);
      drawPixel(boardX, boardY + 2, boardOutline, pixelSize);
      drawPixel(boardX + boardWidth - 1, boardY + 2, boardOutline, pixelSize);
      
      // Sides
      for (let i = 2; i < boardHeight - 1; i++) {
        drawPixel(boardX, boardY + i, boardOutline, pixelSize);
        drawPixel(boardX + boardWidth - 1, boardY + i, boardOutline, pixelSize);
      }
      
      // Bottom outline
      for (let i = 2; i < boardWidth - 2; i++) {
        drawPixel(boardX + i, boardY + boardHeight - 1, boardOutline, pixelSize);
      }
      
      // Corner pixels (bottom)
      drawPixel(boardX + 1, boardY + boardHeight - 2, boardOutline, pixelSize);
      drawPixel(boardX + boardWidth - 2, boardY + boardHeight - 2, boardOutline, pixelSize);
      
      // Fill the board
      for (let i = 2; i < boardWidth - 2; i++) {
        for (let j = 1; j < boardHeight - 1; j++) {
          drawPixel(boardX + i, boardY + j, boardFill, pixelSize);
        }
      }
      
      // Top highlight
      for (let i = 2; i < boardWidth - 4; i++) {
        if (i % 4 < 3) { // Create dashed highlight effect
          drawPixel(boardX + i, boardY + 1, glowColor, pixelSize);
        }
      }
      
      // Left thruster
      drawPixel(boardX + 4, boardY + boardHeight, thrusterColor, pixelSize);
      drawPixel(boardX + 6, boardY + boardHeight, thrusterColor, pixelSize);
      
      // Right thruster
      drawPixel(boardX + boardWidth - 6, boardY + boardHeight, thrusterColor, pixelSize);
      drawPixel(boardX + boardWidth - 4, boardY + boardHeight, thrusterColor, pixelSize);
      
      // Draw exhaust particles
      drawPixelatedExhaust(boardX + 5, boardY + boardHeight + 2, time);
      drawPixelatedExhaust(boardX + boardWidth - 5, boardY + boardHeight + 2, time + 0.5);
      
      // Hover glow effect
      const glowY = boardY + boardHeight + 3;
      
      // This creates a pixelated glow effect under the board
      const glowWidth = boardWidth * 0.7;
      const glowHeight = 2;
      const glowX = boardX + (boardWidth - glowWidth) / 2;
      
      // Center glow pixels (brightest)
      for (let i = 4; i < glowWidth - 4; i++) {
        drawPixel(glowX + i, glowY, "rgba(93, 143, 255, 0.6)", pixelSize);
      }
      
      // Outer glow pixels (fading)
      for (let i = 1; i < 4; i++) {
        drawPixel(glowX + i, glowY, `rgba(93, 143, 255, ${0.3 + i * 0.1})`, pixelSize);
        drawPixel(glowX + glowWidth - i - 1, glowY, `rgba(93, 143, 255, ${0.3 + i * 0.1})`, pixelSize);
      }
      
      // Outer edges (dimmest)
      drawPixel(glowX, glowY, "rgba(93, 143, 255, 0.2)", pixelSize);
      drawPixel(glowX + glowWidth - 1, glowY, "rgba(93, 143, 255, 0.2)", pixelSize);
    };

    // Function to draw pixelated exhaust
    const drawPixelatedExhaust = (x: number, baseY: number, time: number) => {
      const exhaustColors = [
        "#ffffff", // brightest
        "#97c4ff",
        "#5d8fff",
        "#3a6eff",
        "#2a3a8d"  // dimmest
      ];
      
      // Draw multiple exhaust particles
      for (let i = 0; i < 4; i++) {
        const t = (time * 3 + i * 0.25) % 1;
        const spread = t * 3;
        const xOffset = Math.sin(time * 10 + i * Math.PI) * spread;
        const y = baseY + t * 10;
        
        // Determine color based on particle lifetime
        const colorIndex = Math.min(Math.floor(t * exhaustColors.length), exhaustColors.length - 1);
        const color = exhaustColors[colorIndex];
        
        // Make pixels smaller as they travel
        const size = Math.max(1, 2 * (1 - t * 0.7));
        
        drawPixel(x + xOffset, y, color, size);
      }
    };

    let time = 0;

    // Main animation loop
    const animate = () => {
      time += 0.1;
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Spring animation for smooth movement
      currentPositionRef.current.x += (targetPositionRef.current.x - currentPositionRef.current.x) * 0.12;
      currentPositionRef.current.width += (targetPositionRef.current.width - currentPositionRef.current.width) * 0.12;
      
      const { x: currentX, width: currentWidth } = currentPositionRef.current;
      
      if (currentWidth > 0) {
        // Make sure to position the hoverboard BELOW the text (navbar height - some offset)
        drawPixelatedHoverboard(currentX, currentWidth, 30, time);
      }
      
      // Remove bobbing effect for nav links
      links.forEach(link => {
        const linkElement = document.getElementById(`nav-link-${link.href.replace(/\//g, '-')}`);
        if (linkElement) {
          linkElement.style.transform = '';
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [links]);

  return (
  <nav className="bg-black/80 backdrop-blur-sm py-1 pl-2 relative shadow-none">
  <ul ref={navRef} className="flex gap-0 sm:gap-2 md:gap-4 text-gray-400 text-xs sm:text-sm md:text-base font-bold px-1">
        {links.map((link) => (
          <li 
            key={link.href} 
            className="relative pb-2 sm:pb-3 md:pb-4 px-1 sm:px-2 md:px-2"
            onMouseEnter={() => setHoveredLink(link.href)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <Link 
              href={link.href} 
              id={`nav-link-${link.href.replace(/\//g, '-')}`}
              className="hover:text-white transition-colors duration-300 inline-block py-0 sm:py-1 px-1 sm:px-2 rounded-lg text-center w-full tracking-tight"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </nav>
  );
}