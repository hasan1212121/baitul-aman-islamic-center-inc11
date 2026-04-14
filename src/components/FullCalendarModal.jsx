"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from './Providers';
import { getBengaliDateFull } from '@/lib/bengaliCalendar';

export default function FullCalendarModal() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const days = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const startDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const hijriStart = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {day: 'numeric', month: 'short'}).format(new Date(year, month, 1));
  const monthName = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(today);
  
  const bdStartTemp = getBengaliDateFull(new Date(year, month, 1));

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  if (!open) {
    return (
      <button className="btn" style={{ background: 'var(--glass-border)', color: '#fff', fontSize: '1.2rem', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setOpen(true)}>
        📅 {t.fullCalendar}
      </button>
    );
  }

  const modalContent = (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--primary-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
             <h2 style={{ color: 'var(--accent-color)' }}>{monthName} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>({hijriStart} / {bdStartTemp.month})</span></h2>
          </div>
          <button className="btn" style={{ padding: '0.5rem', background: '#cc4444', color: '#fff' }} onClick={() => setOpen(false)}>✕ {t.close}</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
           <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
          {days.map((d, i) => {
             let bDate = null;
             let arDate = null;
             if (d) {
                const dt = new Date(year, month, d);
                bDate = getBengaliDateFull(dt).dayBn;
                arDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {day: 'numeric'}).format(dt);
             }
             return (
               <div key={i} style={{ 
                  padding: '0.5rem', 
                  background: d ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: d === today.getDate() ? '2px solid var(--accent-color)' : '1px solid transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem'
               }}>
                  {d && <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{d}</div>}
                  {d && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'serif' }}>{arDate}</div>}
                  {d && <div style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>{bDate}</div>}
               </div>
             );
          })}
        </div>
      </div>
    </div>
  );

  return mounted ? createPortal(modalContent, document.body) : null;
}
