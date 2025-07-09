import React from 'react';
import '../styles/ParticleBackground.css';

const ParticleBackground = ({ particles }) => (
  <div className="particles-container">
    {particles.map(particle => (
      <div
        key={particle.id}
        className="particle"
        style={{
          left: particle.x,
          top: particle.y,
          width: particle.size,
          height: particle.size,
          opacity: particle.opacity,
          animationDuration: `${particle.speed}s`
        }}
      />
    ))}
  </div>
);

export default ParticleBackground; 