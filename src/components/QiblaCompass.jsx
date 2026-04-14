"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from './Providers';

export default function QiblaCompass() {
  const { t } = useLanguage();
  const [heading, setHeading] = useState(0);
  const qiblaAngle = 58.5; // From Bronx to Mecca

  useEffect(() => {
    const handleOrientation = (e) => {
      let compassHeading = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      if (compassHeading) {
        setHeading(compassHeading);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  const rotation = qiblaAngle - heading;

  return (
    <div className="glass-panel" style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '0.5rem', color: 'var(--accent-color)', fontSize: '1.8rem' }}>{t.qiblaDirection}</h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>{t.qiblaTarget}</p>
      
      <div style={{ position: 'relative', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)', border: '2px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}>
        
        <div style={{ position: 'absolute', top: '10px', fontSize: '1rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.5)' }}>N</div>
        <div style={{ position: 'absolute', bottom: '10px', fontSize: '1rem', color: 'rgba(255,255,255,0.5)' }}>S</div>
        <div style={{ position: 'absolute', right: '10px', fontSize: '1rem', color: 'rgba(255,255,255,0.5)' }}>E</div>
        <div style={{ position: 'absolute', left: '10px', fontSize: '1rem', color: 'rgba(255,255,255,0.5)' }}>W</div>
        
        {/* Outer Ring Dashes */}
        <div style={{position: 'absolute', width: '100%', height: '100%', border: '4px dashed var(--glass-border)', borderRadius: '50%', opacity: 0.5}}></div>

        {/* The Arrow */}
        <div style={{
          width: '0', height: '0',
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '110px solid var(--accent-color)',
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'bottom center',
          transition: 'transform 0.1s ease-out',
          position: 'absolute',
          top: '0',
          filter: 'drop-shadow(0 0 10px rgba(229, 179, 49, 0.5))'
        }} />
        
        <div style={{width: '20px', height: '20px', background: 'var(--accent-color)', borderRadius: '50%', zIndex: 10, position: 'absolute', top: '100px'}} />
      </div>
    </div>
  );
}
