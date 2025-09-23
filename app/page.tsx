"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIdRef = useRef<number>(0);
  const pixelsRef = useRef<{x: number, y: number, alpha: number, destroyed: boolean}[]>([]);
  const rocketsRef = useRef<{x: number, y: number}[]>([]);
  const shipsRef = useRef<{x: number, dx: number}[]>([
    { x: 100, dx: 1 },
    { x: 300, dx: -1 },
    { x: 500, dx: 1 },
  ]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Configuration constants
  const TEXT = "(^.-)   Manoj Srivatsava   (^.^)";
  const PIXEL_SIZE = 2;
  const PIXEL_GAP = 1;
  const ROCKET_SPEED = 8;
  const SHIP_SPEED = 1.5;
  const ROCKET_LAUNCH_INTERVAL = 200; // ms
  const EXPLOSION_RADIUS = 10;
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Initialize the pixels from text
  const initializePixels = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    // Set canvas dimensions
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the text that will be pixelated
    ctx.fillStyle = "#ffffff";
    // Responsive font size and y position
    const fontSize = Math.max(32, Math.floor(canvas.height / 9));
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText(TEXT, canvas.width / 2, fontSize + 40);
    // Extract pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = [];
    for (let y = 0; y < imageData.height; y += PIXEL_SIZE + PIXEL_GAP) {
      for (let x = 0; x < imageData.width; x += PIXEL_SIZE + PIXEL_GAP) {
        const i = (y * imageData.width + x) * 4;
        if (imageData.data[i + 3] > 128) {
          pixels.push({ 
            x, 
            y, 
            alpha: 1, 
            destroyed: false 
          });
        }
      }
    }
    pixelsRef.current = pixels;
    setIsInitialized(true);
  }, [canvasSize]);

  // Launch rockets at intervals
  useEffect(() => {
    if (!isInitialized) return;
    const launchRocket = () => {
      const shipIndex = Math.floor(Math.random() * shipsRef.current.length);
      const ship = shipsRef.current[shipIndex];
      rocketsRef.current.push({ x: ship.x, y: canvasSize.height - 50 });
    };
    const interval = setInterval(launchRocket, ROCKET_LAUNCH_INTERVAL);
    return () => clearInterval(interval);
  }, [isInitialized, canvasSize.height]);

  // Main animation loop
  // Responsive canvas size
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: Math.min(window.innerWidth * 0.98, 1500),
        height: Math.min(window.innerHeight * 0.7, 700)
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (canvasSize.width && canvasSize.height) {
      initializePixels();
    }
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [initializePixels, canvasSize]);

  // Animation function
  useEffect(() => {
    if (!isInitialized || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStarryBackground(ctx, canvas.width, canvas.height);
      updateAndDrawShips(ctx);
      updateAndDrawPixels(ctx);
      updateAndDrawRockets(ctx);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, [isInitialized, canvasSize]);

  // Draw starry background
  const drawStarryBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    
    // Draw stars
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 1.5;
      const opacity = Math.random() * 0.8 + 0.2;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(x, y, size, size);
    }
  };

  // Update and draw spaceships
  const updateAndDrawShips = (ctx: CanvasRenderingContext2D) => {
    shipsRef.current.forEach((ship) => {
      // Move ships
      ship.x += ship.dx * SHIP_SPEED;
      if (ship.x < 40 || ship.x > canvasSize.width - 40) ship.dx *= -1;
      // Draw ship body
      ctx.fillStyle = "#8f8f8f";
      ctx.fillRect(ship.x - 15, canvasSize.height - 30, 30, 10);
      // Draw ship top
      ctx.fillStyle = "#6f6f6f";
      ctx.beginPath();
      ctx.moveTo(ship.x - 10, canvasSize.height - 30);
      ctx.lineTo(ship.x + 10, canvasSize.height - 30);
      ctx.lineTo(ship.x, canvasSize.height - 38);
      ctx.fill();
      // Draw cockpit
      ctx.fillStyle = "#3fdfff";
      ctx.fillRect(ship.x - 4, canvasSize.height - 28, 8, 4);
      // Draw thrusters
      ctx.fillStyle = "#ff7700";
      ctx.fillRect(ship.x - 12, canvasSize.height - 20, 4, 2);
      ctx.fillRect(ship.x + 8, canvasSize.height - 20, 4, 2);
    });
  };

  // Update and draw text pixels
  const updateAndDrawPixels = (ctx: CanvasRenderingContext2D) => {
    pixelsRef.current.forEach((p) => {
      if (!p.destroyed) {
        // Draw intact pixels bright white
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fillRect(p.x, p.y, PIXEL_SIZE, PIXEL_SIZE);
      } else {
        // Draw destroyed pixels as fading white
        ctx.fillStyle = `rgba(180, 180, 200, ${p.alpha})`;
        ctx.fillRect(p.x, p.y + p.alpha * 5, PIXEL_SIZE, PIXEL_SIZE);
        p.alpha = Math.max(0, p.alpha - 0.015);
      }
    });
  };

  // Update and draw rockets
  const updateAndDrawRockets = (ctx: CanvasRenderingContext2D) => {
    const newRockets = [];
    
    for (const rocket of rocketsRef.current) {
      rocket.y -= ROCKET_SPEED;
      
      // Check for collisions with text pixels
      if (rocket.y < 200) {
        let hitSomething = false;
        
        // Check if rocket hit any pixels
        for (const pixel of pixelsRef.current) {
          if (!pixel.destroyed && 
              Math.hypot(pixel.x - rocket.x, pixel.y - rocket.y) < EXPLOSION_RADIUS) {
            pixel.destroyed = true;
            hitSomething = true;
          }
        }
        
        // Draw explosion if hit something
        if (hitSomething) {
          drawExplosion(ctx, rocket.x, rocket.y);
          continue; // Don't add this rocket back to the array
        }
      }
      
      // If rocket is still on screen, draw it and keep it
      if (rocket.y > 0) {
        drawRocket(ctx, rocket.x, rocket.y);
        newRockets.push(rocket);
      }
    }
    
    rocketsRef.current = newRockets;
  };

  // Draw pixelated rocket
  const drawRocket = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Rocket body
    ctx.fillStyle = "#ff5050";
    ctx.fillRect(x - 2, y, 4, 8);
    
    // Rocket head
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x - 2, y - 4, 4, 4);
    
    // Fins
    ctx.fillStyle = "#ff5050";
    ctx.fillRect(x - 4, y + 4, 2, 3);
    ctx.fillRect(x + 2, y + 4, 2, 3);
    
    // Flame
    ctx.fillStyle = "#ffaa00";
    ctx.fillRect(x - 1, y + 8, 2, 2);
    ctx.fillStyle = "#ffff00";
    ctx.fillRect(x - 1, y + 10, 2, Math.random() * 3 + 1);
  };

  // Draw explosion effect
  const drawExplosion = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const particles = 12;
    const radius = 8;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 200, 50, 0.8)";
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 200, 0.9)";
    ctx.fill();
    
    // Draw particle lines
    for (let i = 0; i < particles; i++) {
      const angle = (i / particles) * Math.PI * 2;
      const length = radius * (0.7 + Math.random() * 0.5);
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        x + Math.cos(angle) * length,
        y + Math.sin(angle) * length
      );
      ctx.strokeStyle = "rgba(255, 200, 50, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  };

  return (
    <div className="bg-black w-full h-full flex flex-col items-center justify-center flex-1 p-0 m-0 max-w-full overflow-x-hidden">
      <h1 className="text-white text-lg sm:text-xl md:text-2xl mb-2 sm:mb-4 text-center"><strong>Portfolio of </strong></h1>
      <canvas
        ref={canvasRef}
        className="bg-black rounded-lg shadow-lg w-full h-full max-w-full max-h-full"
        style={{ width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh' }}
      />
      <p className="text-gray-400 mt-2 sm:mt-4 text-xs sm:text-sm"></p>
    </div>
  );
}