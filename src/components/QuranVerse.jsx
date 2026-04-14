"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from './Providers';

export default function QuranVerse() {
  const { t } = useLanguage();
  const [verse, setVerse] = useState({ arabic: "Loading...", translation: "..." });

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const ayahs = [
       { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", en: "Say, 'He is Allah, [who is] One'" },
       { ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "Indeed, with hardship [will be] ease." },
       { ar: "وَاللَّهُ يُحِبُّ الصَّابِرِينَ", en: "And Allah loves the steadfast." },
       { ar: "فَاذْكُرُونِي أَذْكُرْكُمْ", en: "So remember Me; I will remember you." },
       { ar: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ", en: "But My mercy encompasses all things." }
    ];
    
    const selected = ayahs[dayOfYear % ayahs.length];
    setVerse({ arabic: selected.ar, translation: selected.en });
  }, []);

  return (
    <div className="glass-panel" style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>{t.dailyReflection}</h3>
      <p style={{ fontSize: '2rem', fontFamily: 'serif', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '1rem' }}>
        {verse.arabic}
      </p>
      <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
        "{verse.translation}"
      </p>
    </div>
  );
}
