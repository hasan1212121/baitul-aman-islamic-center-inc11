"use client";
import React, { useState } from 'react';
import { Providers, useLanguage } from '@/components/Providers';
import NoticeBanner from '@/components/NoticeBanner';
import DateTimeWeather from '@/components/DateTimeWeather';
import PrayerTimes from '@/components/PrayerTimes';
import QiblaCompass from '@/components/QiblaCompass';
import UpcomingPrayer from '@/components/UpcomingPrayer';
import QuranVerse from '@/components/QuranVerse';

function PageContent() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="main-container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1rem' }}>
         {['EN', 'AR', 'BN'].map(l => (
            <button key={l} onClick={() => setLang(l)} className="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', opacity: lang === l ? 1 : 0.5, border: '1px solid var(--glass-border)' }}>{l}</button>
         ))}
      </div>

      <header className="glass-panel" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', color: 'var(--accent-color)', marginBottom: '0.5rem', fontFamily: 'serif' }}>{t.heading}</h1>
        <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: 'var(--text-muted)' }} dir={lang === 'AR' ? 'rtl' : 'ltr'}>{t.address}</p>
        <div className="header-contact" style={{ marginTop: '1rem', alignItems: 'center' }}>
           <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, whiteSpace: 'nowrap' }}>
             📞 <a href="tel:+17189048828" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>+1 (718) 904-8828</a>
           </p>
           <button className="btn btn-donate" style={{ background: '#28a745', color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '50px', whiteSpace: 'nowrap' }}>💚 {t.donate}</button>
        </div>
      </header>

      {/* Moved to top priority */}
      <UpcomingPrayer />

      <NoticeBanner />

      <div className="modules-grid">
        <div className="mod-time"><DateTimeWeather /></div>
        <div className="mod-prayer"><PrayerTimes /></div>
        <div className="mod-compass"><QiblaCompass /></div>
        <div className="mod-quran"><QuranVerse /></div>
      </div>

      <footer className="footer" style={{ marginTop: '3rem' }}>
        <a href="https://www.facebook.com/baicbronx/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', color: 'var(--text-light)', textDecoration: 'none', transition: 'color 0.2s' }}>
           <svg style={{ width: '28px', height: '28px', fill: '#1877F2' }} viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
           {t.followFb}
        </a>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.rights}</p>
          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Managed by <a href="https://pixiilab.net" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Pixiilab</a>
          </p>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Providers>
      <PageContent />
    </Providers>
  );
}
