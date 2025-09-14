"use client";

import { BotIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="cosmic-card border-t py-8" style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}>
      <div className="container mx-auto px-4 text-center cosmic-text-soft">
        <div className="flex justify-center items-center gap-2 mb-4">
          <BotIcon className="w-6 h-6 cosmic-text-primary" />
          <p className="font-headline text-xl font-bold cosmic-gradient-text">KallpaWarmIA</p>
        </div>
        <p className="mb-4 cosmic-text-soft">Únete a nuestra comunidad y comienza tu viaje de descubrimiento hoy.</p>
        <p className="text-sm cosmic-text-soft">
          &copy; {currentYear} KallpaWarmIA. Todos los derechos reservados. El futuro lo construyes tú.
        </p>
      </div>
    </footer>
  );
}
