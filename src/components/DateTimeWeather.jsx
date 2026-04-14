"use client";
import React, { useEffect, useState } from 'react';
import { useLanguage } from './Providers';
import { getBengaliDateFull } from '@/lib/bengaliCalendar';
import FullCalendarModal from './FullCalendarModal';

export default function DateTimeWeather() {
  const { t } = useLanguage();
  const [time, setTime] = useState(null);
  const [weather, setWeather] = useState({ temp: '--', condition: 'Fetching...' });

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    fetch('https://api.open-meteo.com/v1/forecast?latitude=40.8373&longitude=-73.8860&current_weather=true&temperature_unit=fahrenheit')
      .then(res => res.json())
      .then(data => {
         if(data.current_weather) {
            setWeather({
              temp: data.current_weather.temperature,
              condition: 'Refresh for updates'
            });
         }
      })
      .catch(console.error);

    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  const formatHijri = (date) => new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {day: 'numeric', month: 'long', year : 'numeric'}).format(date);
  const formatEnglish = (date) => new Intl.DateTimeFormat('en-US', {weekday: 'long', day: 'numeric', month: 'long', year : 'numeric'}).format(date);
  const bdDate = getBengaliDateFull(time);

  return (
    <div className="glass-panel" style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>
        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.gregorian}</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{formatEnglish(time)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.hijri}</div>
          <div style={{ fontSize: '1.3rem', fontFamily: 'serif', fontWeight: 'bold' }}>{formatHijri(time)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.bangla}</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>{bdDate.formatted}</div>
        </div>
      </div>
      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
           <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.currentWeather}</div>
           <div style={{ fontSize: '2rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>{weather.temp}°F</div>
        </div>
        <div>
           <FullCalendarModal />
        </div>
      </div>
    </div>
  );
}
