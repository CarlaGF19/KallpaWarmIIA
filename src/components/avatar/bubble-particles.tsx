"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useRef, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Bot, Telescope, Wrench, Palette } from 'lucide-react';
import { StellarParticles } from '@/components/landing/stellar-particles';


const avatars = [
  { 
    id: 1, 
    name: 'Vicuña-Bot',
    type: 'Tecnología',
    icon: <Bot className="w-4 h-4" />,
    color: 'text-sky-400',
    bgColor: 'bg-sky-900/50',
    borderColor: 'border-sky-400',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png', 
    alt: 'Vicuña-Bot, avatar de tecnología', 
    hint: 'futuristic vicuña robot cute glowing digital eyes soft pastel modern colors' 
  },
  { 
    id: 2, 
    name: 'Astronoma Inti',
    type: 'Ciencia',
    icon: <Telescope className="w-4 h-4" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/50',
    borderColor: 'border-purple-400',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png',
    alt: 'Astronoma Inti, avatar de ciencia', 
    hint: 'female space explorer star telescope astronomy biology' 
  },
  { 
    id: 3, 
    name: 'Ingeniera Allpa',
    type: 'Ingeniería',
    icon: <Wrench className="w-4 h-4" />,
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/50',
    borderColor: 'border-amber-400',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png',
    alt: 'Ingeniera Allpa, avatar de ingeniería', 
    hint: 'female creator shiny helmet magic tools builder'
  },
  { 
    id: 4, 
    name: 'Artista Qori',
    type: 'Arte',
    icon: <Palette className="w-4 h-4" />,
    color: 'text-pink-400',
    bgColor: 'bg-pink-900/50',
    borderColor: 'border-pink-400',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png',
    alt: 'Artista Qori, avatar de arte y matemáticas', 
    hint: 'female color music mage creative mathematics'
  },
];

const AvatarCard = ({ avatar, isSelected, onSelect }: { avatar: typeof avatars[0], isSelected: boolean, onSelect: (id: number) => void }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        
        const mouseX = x / width;
        const mouseY = y / height;

        const rotateX = (mouseY - 0.5) * -45;
        const rotateY = (mouseX - 0.5) * 45;
        
        const bgX = mouseX * 100;
        const bgY = mouseY * 100;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        const holo = card.querySelector('.holo-effect') as HTMLDivElement;
        if (holo) {
            holo.style.backgroundPosition = `${bgX}% ${bgY}%`;
        }
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            const holo = card.querySelector('.holo-effect') as HTMLDivElement;
            if (holo) {
                holo.style.backgroundPosition = `50% 50%`;
            }
        }
    };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(avatar.id)}
      className={cn(
        'relative rounded-3xl p-1 transition-all duration-300 ease-out cursor-pointer w-full aspect-[3/4] max-w-[280px]',
        'transform-style-preserve-3d',
        isSelected ? 'ring-4 ring-primary ring-offset-4 ring-offset-background' : 'ring-2 ring-transparent',
        'bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600'
      )}
    >
        <div className="relative w-full h-full bg-background rounded-[22px] p-4 flex flex-col justify-between overflow-hidden">
            <div 
                className="holo-effect absolute inset-0 opacity-20 transition-all duration-300" 
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)',
                    backgroundSize: '200% 200%',
                    mixBlendMode: 'screen',
                }}
            ></div>
            <div className="relative z-10">
                <div className="flex justify-between items-center">
                    <Badge variant="outline" className={cn("border-2", avatar.borderColor, avatar.color, avatar.bgColor)}>
                        {avatar.icon}
                        <span className="ml-1.5">{avatar.type}</span>
                    </Badge>
                     <Badge variant="secondary" className="text-xs">70/100 HP</Badge>
                </div>
            </div>
            <div className="relative z-10 flex-grow flex items-center justify-center my-4">
                 <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    width={200}
                    height={200}
                    data-ai-hint={avatar.hint}
                    className="object-contain w-full h-auto max-h-[220px] drop-shadow-[0_8px_15px_rgba(0,0,0,0.4)]"
                    style={{ transform: 'translateZ(40px)'}}
                />
            </div>
            <div className="relative z-10 text-center">
                 <h3 className="font-headline text-2xl font-bold text-white" style={{ transform: 'translateZ(20px)'}}>{avatar.name}</h3>
            </div>
        </div>
    </div>
  )
}

export default function AvatarSelectionPage() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const handleSelectAvatar = (id: number) => {
    setSelectedAvatar(id);
  };

  const handleContinue = () => {
    if (selectedAvatar) {
        router.push('/quiz');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black p-4 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
            <Image
            src="https://i.ibb.co/d0PvKQQ6/fondo-final.png"
            alt="Pixel art de Machu Picchu"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="pixel art machu picchu"
            priority
            />
            {/* Wave transparency overlay */}
            <div className="absolute inset-0 z-10 wave-overlay"
                 style={{
                   background: `
                     radial-gradient(ellipse 800px 400px at 20% 30%, rgba(0, 0, 0, 0.3) 0%, transparent 50%),
                     radial-gradient(ellipse 600px 300px at 80% 70%, rgba(0, 0, 0, 0.25) 0%, transparent 45%),
                     radial-gradient(ellipse 1000px 200px at 50% 20%, rgba(0, 0, 0, 0.2) 0%, transparent 40%),
                     radial-gradient(ellipse 700px 350px at 30% 80%, rgba(0, 0, 0, 0.15) 0%, transparent 35%)
                   `,
                   mixBlendMode: 'multiply',
                   opacity: 0.8
                 }}>
            </div>
        </div>
        <div className="absolute inset-0 z-10">
             <StellarParticles />
        </div>
        <div className="relative z-20 text-center mb-10">
            <h1 className="font-headline text-4xl font-bold text-primary">Elige tu Kallpa Card</h1>
            <p className="text-lg text-gray-300 mt-2">Selecciona tu compañera de aventura STEM.</p>
        </div>

        <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 place-items-center w-full max-w-6xl">
        {avatars.map((avatar) => (
            <AvatarCard
                key={avatar.id}
                avatar={avatar}
                isSelected={selectedAvatar === avatar.id}
                onSelect={handleSelectAvatar}
            />
        ))}
        </div>
        
        <div className="relative z-20 mt-12">
        <Button
            onClick={handleContinue}
            disabled={!selectedAvatar}
            size="lg"
            className="font-headline text-lg rounded-full px-10 py-4"
        >
            Continuar a mi Aventura
        </Button>
        </div>
    </div>
  );
}