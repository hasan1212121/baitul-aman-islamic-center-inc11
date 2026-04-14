"use client";
import React, { useEffect, useState } from 'react';

export default function NoticeBanner() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.notice) {
           const arr = Array.isArray(data.notice) ? data.notice : [data.notice];
           // Filter expiration
           const validNotices = arr.filter(n => {
              if (typeof n === 'string') return true;
              if (n.expiresAt) {
                 return new Date(n.expiresAt) > new Date();
              }
              return true;
           });
           setNotices(validNotices);
        }
      })
      .catch(console.error);
  }, []);

  if (notices.length === 0) return null;

  return (
    <div className="glass-panel marquee-container" style={{ padding: '1rem', borderLeft: '4px solid var(--accent-color)', marginBottom: '2rem' }}>
      <div className="marquee-content" style={{ animationDuration: `${Math.max(20, notices.length * 15)}s` }}>
        <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>NOTICE:</span> 
        {notices.map((n, index) => {
          const text = typeof n === 'string' ? n : n.text;
          return (
            <span key={index} style={{ marginLeft: '1rem', marginRight: '2rem', fontSize: '1.2rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', marginRight: '0.5rem' }}>•</span> 
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
