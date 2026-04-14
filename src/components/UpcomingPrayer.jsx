"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from './Providers';

export default function UpcomingPrayer() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState("");
  const [nextPrayerName, setNextPrayerName] = useState("");
  const [prayerTimes, setPrayerTimes] = useState({});

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data && data.prayerTimes) {
          setPrayerTimes(data.prayerTimes);
        }
      });
  }, []);

  useEffect(() => {
    if (Object.keys(prayerTimes).length === 0) return;

    const timer = setInterval(() => {
      const now = new Date();
      let nextP = null;
      let minDiff = Infinity;

      let checkTimes = {...prayerTimes};
      if (now.getDay() === 5 && checkTimes.Jummah) {
         checkTimes.Dhuhr = checkTimes.Jummah;
      }
      delete checkTimes.Jummah;

      Object.entries(checkTimes).forEach(([name, timeStr]) => {
         const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
         if(match) {
            let [_, h, m, p] = match;
            h = parseInt(h); m = parseInt(m);
            if(p.toUpperCase() === 'PM' && h !== 12) h += 12;
            if(p.toUpperCase() === 'AM' && h === 12) h = 0;
            
            const pTime = new Date();
            pTime.setHours(h, m, 0, 0);

            if (pTime > now) {
               const diff = pTime - now;
               if (diff < minDiff) { minDiff = diff; nextP = name; }
            }
         }
      });

      if (!nextP) {
         const match = prayerTimes.Fajr.match(/(\d+):(\d+)\s*(AM|PM)/i);
         if(match) {
            let [_, h, m, p] = match;
            h = parseInt(h); m = parseInt(m);
            const tmrw = new Date();
            tmrw.setDate(tmrw.getDate() + 1);
            tmrw.setHours(h, m, 0, 0);
            minDiff = tmrw - now;
            nextP = "Fajr";
         }
      }

      if (nextP) {
         setNextPrayerName(nextP);
         const hrs = Math.floor((minDiff / (1000 * 60 * 60)) % 24);
         const mins = Math.floor((minDiff / 1000 / 60) % 60);
         const secs = Math.floor((minDiff / 1000) % 60);
         setTimeLeft(`${hrs}h ${mins}m ${secs}s`);
      }

    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  if (!nextPrayerName) return null;

  return (
    <div className="glass-panel" style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{t.nextPrayer}</h3>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>{t[nextPrayerName] || nextPrayerName}</div>
      <div style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>- {timeLeft}</div>
    </div>
  );
}
