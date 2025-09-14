import React from 'react';

interface WaveSeparatorProps {
  className?: string;
}

export default function WaveSeparator({ className = '' }: WaveSeparatorProps) {
  return (
    <div className={`${className}`}>
      {/* Componente simplificado sin ondas */}
    </div>
  );
}