"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from './Providers';

const ARABIC_MAPPING = {
  Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء", Jummah: "الجمعة"
};

export default function PrayerTimes() {
  const { t } = useLanguage();
  const [times, setTimes] = useState({
    Fajr: "5:45 AM", Dhuhr: "1:30 PM", Asr: "6:00 PM", Maghrib: "7:35 PM", Isha: "9:15 PM", Jummah: "1:30 PM"
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data && data.prayerTimes) {
          setTimes(d => ({ ...d, ...data.prayerTimes }));
        }
      });
  }, []);

  const toggleAzan = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--accent-color)', fontSize: '2rem' }}>{t.prayerTimes}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {Object.entries(times).map(([prayer, time]) => (
          <div key={prayer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
               <span style={{ fontSize: '1.2rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
                 {t[prayer] || prayer}
               </span>
               <span style={{ color: 'var(--text-muted)', fontFamily: 'serif', fontSize: '1.3rem' }}>
                 {ARABIC_MAPPING[prayer]}
               </span>
            </div>
            <span style={{ fontSize: '1.3rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>{time}</span>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '1.5rem' }}>
        <button className="btn" onClick={toggleAzan} style={{ width: '100%', marginBottom: '1rem', background: isPlaying ? '#cc4444' : 'var(--accent-color)', color: isPlaying ? '#fff' : 'var(--primary-color)' }}>
           {isPlaying ? `⏹ ${t.stopAzan}` : `▶ ${t.playAzan}`}
        </button>
        <audio ref={audioRef} src="https://media.blubrry.com/muslim_central_adhan/content.blubrry.com/muslim_central_adhan/Adhan_Makkah.mp3" preload="none" />
      </div>
    </div>
  );
}
