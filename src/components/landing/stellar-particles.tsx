"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function StellarParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let renderer: THREE.WebGLRenderer | undefined;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      console.error("Failed to create WebGL context for StellarParticles:", e);
      return; // Stop execution if renderer fails to initialize
    }

    if (!renderer) {
      return;
    }
    
    const finalRenderer = renderer;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    finalRenderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    finalRenderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(finalRenderer.domElement);

    // Particles
    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const pastelColors = [
      new THREE.Color('#AEE6FF'), // Celeste
      new THREE.Color('#FFB3C6'), // Rosado
      new THREE.Color('#FFE08C'), // Amarillo
    ];

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      colors[i3] = randomColor.r;
      colors[i3 + 1] = randomColor.g;
      colors[i3 + 2] = randomColor.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse tracking
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    let animationFrameId: number;
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      particles.rotation.y = elapsedTime * 0.1;
      particles.rotation.x = mouse.y * 0.2;
      particles.rotation.y += mouse.x * 0.2;

      finalRenderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        finalRenderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (finalRenderer?.domElement?.parentElement === currentMount) {
        currentMount.removeChild(finalRenderer.domElement);
      }
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      finalRenderer?.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 w-full h-full" />;
}
