
import React from 'react';

export function SpaceBackground() {
  return (
    <div className="bg-space" aria-hidden="true">
      <div className="stars layer1"></div>
      <div className="stars layer2"></div>
      <div className="stars layer3"></div>
      <div className="halo"></div>
      <div className="gaming-particles"></div>
      <div className="floating-orbs"></div>
      <div className="floating-cubes">
        <div className="cube cube-1"></div>
        <div className="cube cube-2"></div>
        <div className="cube cube-3"></div>
        <div className="cube cube-4"></div>
      </div>
      <div className="depth-layers">
        <div className="depth-layer layer-1"></div>
        <div className="depth-layer layer-2"></div>
        <div className="depth-layer layer-3"></div>
      </div>
      <div className="constellation" style={{ '--c': 'hsl(var(--primary))' } as React.CSSProperties}>
        <div className="node" style={{ '--x': '15vw', '--y': '20vh' } as React.CSSProperties}></div>
        <div className="node" style={{ '--x': '30vw', '--y': '35vh' } as React.CSSProperties}></div>
        <div className="node" style={{ '--x': '25vw', '--y': '55vh' } as React.CSSProperties}></div>
        <div className="link" style={{ '--x': '15vw', '--y': '20vh', '--rot': '56deg', '--len': '18.02vh' } as React.CSSProperties}></div>
        <div className="link" style={{ '--x': '30vw', '--y': '35vh', '--rot': '123.69deg', '--len': '20.61vh' } as React.CSSProperties}></div>
      </div>
       <div className="constellation" style={{ '--c': 'hsl(var(--accent))' } as React.CSSProperties}>
        <div className="node" style={{ '--x': '85vw', '--y': '70vh' } as React.CSSProperties}></div>
        <div className="node" style={{ '--x': '70vw', '--y': '85vh' } as React.CSSProperties}></div>
        <div className="node" style={{ '--x': '90vw', '--y': '50vh' } as React.CSSProperties}></div>
        <div className="link" style={{ '--x': '85vw', '--y': '70vh', '--rot': '-45deg', '--len': '21.21vh' } as React.CSSProperties}></div>
        <div className="link" style={{ '--x': '85vw', '--y': '70vh', '--rot': '116.56deg', '--len': '22.36vh' } as React.CSSProperties}></div>
      </div>
    </div>
  );
}
