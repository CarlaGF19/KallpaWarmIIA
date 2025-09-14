'use client';

import GameHeader from '@/components/dashboard/GameHeader';
import HeroPlanetBlock from '@/components/dashboard/HeroPlanetBlock';
import QuickAccessColumn from '@/components/dashboard/QuickAccessColumn';
import BadgesCollection from '@/components/dashboard/BadgesCollection';
import { ChatIA } from '@/components/dashboard/chat-ia';

export default function DashboardPage() {

  return (
    <>
      {/* Vista por defecto del dashboard */}
      <div id="default-view">
        {/* 🌌 Fondo Cósmico Exclusivo Dashboard */}
      <div className="cosmic-dashboard-bg">
        {/* Nebulosas suaves */}
        <div className="cosmic-nebula nebula-purple"></div>
        <div className="cosmic-nebula nebula-pink"></div>
        <div className="cosmic-nebula nebula-cyan"></div>
        
        {/* Estrellas dinámicas */}
        <div className="cosmic-stars">
          <div className="star star-small"></div>
          <div className="star star-medium"></div>
          <div className="star star-large"></div>
          <div className="star star-small"></div>
          <div className="star star-medium"></div>
          <div className="star star-small"></div>
          <div className="star star-large"></div>
          <div className="star star-medium"></div>
          <div className="star star-small"></div>
          <div className="star star-medium"></div>
          
          {/* Estrellas fugaces */}
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
        </div>
        
        {/* Constelaciones STEM avanzadas */}
        {/* Fórmula de Einstein E=mc² */}
        <svg className="constellation constellation-einstein" width="140" height="80" viewBox="0 0 140 80">
          <g className="constellation-line">
            <circle cx="20" cy="40" r="3" fill="#10B981" opacity="0.9"/> {/* E */}
            <circle cx="50" cy="40" r="2" fill="#10B981" opacity="0.7"/> {/* = */}
            <circle cx="70" cy="40" r="3" fill="#10B981" opacity="0.9"/> {/* m */}
            <circle cx="90" cy="40" r="3" fill="#10B981" opacity="0.9"/> {/* c */}
            <circle cx="110" cy="30" r="2" fill="#10B981" opacity="0.7"/> {/* ² */}
            <line x1="20" y1="40" x2="50" y2="40" stroke="#10B981" strokeWidth="1.5" opacity="0.6"/>
            <line x1="50" y1="40" x2="70" y2="40" stroke="#10B981" strokeWidth="1.5" opacity="0.6"/>
            <line x1="70" y1="40" x2="90" y2="40" stroke="#10B981" strokeWidth="1.5" opacity="0.6"/>
            <line x1="90" y1="40" x2="110" y2="30" stroke="#10B981" strokeWidth="1.5" opacity="0.6"/>
          </g>
        </svg>
        
        {/* Molécula de ADN */}
        <svg className="constellation constellation-dna" width="100" height="120" viewBox="0 0 100 120">
          <g className="constellation-line">
            <circle cx="30" cy="20" r="2" fill="#3B82F6" opacity="0.8"/>
            <circle cx="70" cy="30" r="2" fill="#3B82F6" opacity="0.8"/>
            <circle cx="25" cy="50" r="2" fill="#3B82F6" opacity="0.8"/>
            <circle cx="75" cy="60" r="2" fill="#3B82F6" opacity="0.8"/>
            <circle cx="35" cy="80" r="2" fill="#3B82F6" opacity="0.8"/>
            <circle cx="65" cy="90" r="2" fill="#3B82F6" opacity="0.8"/>
            <path d="M30,20 Q50,35 25,50 Q50,65 35,80" stroke="#3B82F6" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <path d="M70,30 Q50,45 75,60 Q50,75 65,90" stroke="#3B82F6" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <line x1="30" y1="20" x2="70" y2="30" stroke="#3B82F6" strokeWidth="1" opacity="0.4"/>
            <line x1="25" y1="50" x2="75" y2="60" stroke="#3B82F6" strokeWidth="1" opacity="0.4"/>
            <line x1="35" y1="80" x2="65" y2="90" stroke="#3B82F6" strokeWidth="1" opacity="0.4"/>
          </g>
        </svg>
        
        {/* Teorema de Pitágoras */}
        <svg className="constellation constellation-pythagoras" width="90" height="90" viewBox="0 0 90 90">
          <g className="constellation-line">
            <circle cx="20" cy="70" r="3" fill="#F59E0B" opacity="0.9"/>
            <circle cx="70" cy="70" r="3" fill="#F59E0B" opacity="0.9"/>
            <circle cx="20" cy="20" r="3" fill="#F59E0B" opacity="0.9"/>
            <line x1="20" y1="70" x2="70" y2="70" stroke="#F59E0B" strokeWidth="2" opacity="0.7"/>
            <line x1="20" y1="70" x2="20" y2="20" stroke="#F59E0B" strokeWidth="2" opacity="0.7"/>
            <line x1="20" y1="20" x2="70" y2="70" stroke="#F59E0B" strokeWidth="2" opacity="0.7"/>
            <rect x="15" y="65" width="10" height="10" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.5"/>
            <rect x="65" y="65" width="10" height="10" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.5"/>
            <rect x="15" y="15" width="10" height="10" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.5"/>
          </g>
        </svg>
        
        {/* Átomo con electrones */}
        <svg className="constellation constellation-atom-advanced" width="110" height="110" viewBox="0 0 110 110">
          <g className="constellation-line">
            <circle cx="55" cy="55" r="4" fill="#EC4899" opacity="1"/> {/* Núcleo */}
            <circle cx="25" cy="55" r="2" fill="#A5F3FC" opacity="0.8"/> {/* Electrón 1 */}
            <circle cx="85" cy="55" r="2" fill="#A5F3FC" opacity="0.8"/> {/* Electrón 2 */}
            <circle cx="55" cy="25" r="2" fill="#A5F3FC" opacity="0.8"/> {/* Electrón 3 */}
            <circle cx="55" cy="85" r="2" fill="#A5F3FC" opacity="0.8"/> {/* Electrón 4 */}
            <ellipse cx="55" cy="55" rx="30" ry="12" stroke="#A5F3FC" strokeWidth="1" fill="none" opacity="0.5"/>
            <ellipse cx="55" cy="55" rx="12" ry="30" stroke="#A5F3FC" strokeWidth="1" fill="none" opacity="0.5"/>
            <ellipse cx="55" cy="55" rx="25" ry="25" stroke="#EC4899" strokeWidth="1" fill="none" opacity="0.3"/>
          </g>
        </svg>
        
        {/* Halos reactivos */}
        <div className="cosmic-halo planet-halo"></div>
        <div className="cosmic-halo quick-access-halo"></div>
      </div>
      
      <div className="w-full space-y-6 relative z-10">
        {/* Header con identidad gamer, misión activa y HUD */}
        <GameHeader 
          playerLevel={1}
          playerName="Exploradora Wami"
          currentStreak={1}
          notifications={1}
          activeCosmicChallenge={{
            title: "Reto: Construye tu invento en mini-juego",
            category: "innovation",
            progress: 0,
            maxProgress: 1
          }}
        />
        
        <div className="space-y-6 max-w-full overflow-hidden">
          {/* Zona Hero: dos columnas equilibradas con control de overflow */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 w-full">
            {/* Planeta activo - zona protagonista reducida (50% del ancho) */}
            <div className="lg:col-span-2 w-full max-w-full overflow-hidden">
              <HeroPlanetBlock 
                playerLevel={1}
                currentXP={0}
                maxXP={100}
                planetType="earth"
                activeMissions={1}
              />
            </div>
            {/* Accesos rápidos - columna ampliada (50% del ancho) */}
            <div className="lg:col-span-3 w-full max-w-full overflow-hidden">
              <QuickAccessColumn />
            </div>
          </div>
          

          
          {/* Fila 3: Badges - carrusel horizontal estilo cartas Pokémon */}
          <div className="w-full max-w-full overflow-hidden">
            <BadgesCollection />
          </div>
        </div>
      </div>
      </div>
      
      {/* Vista del chat integrado */}
      <div id="chat-view" className="hidden">
        <ChatIA />
      </div>
    </>
  );
}