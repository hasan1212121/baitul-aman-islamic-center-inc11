"use client";
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  
  const [notices, setNotices] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState({
    Fajr: "", Dhuhr: "", Asr: "", Maghrib: "", Isha: "", Jummah: ""
  });

  useEffect(() => {
    if (authenticated) {
      fetch('/api/settings').then(r => r.json()).then(data => {
        if(data.notice) {
           const arr = Array.isArray(data.notice) ? data.notice : [data.notice];
           setNotices(arr.map(n => typeof n === 'string' ? {text: n, expiresAt: ""} : n));
        }
        if(data.prayerTimes) setPrayerTimes(data.prayerTimes);
      });
    }
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setAuthenticated(true);
    } else {
      alert("Incorrect username or password");
    }
  };

  const handleSave = async () => {
    const res = await fetch('/api/settings', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notice: notices, prayerTimes })
    });
    if (res.ok) alert("Saved successfully!");
  };

  if (!authenticated) {
    return (
      <main style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="glass-panel" style={{ width: '400px' }}>
          <h2 style={{ marginBottom: '2rem', color: 'var(--accent-color)', textAlign: 'center' }}>Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" className="input-field" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Login</button>
          </form>
          <div style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: '0.8rem' }}>
            <p>Default: admin / admin123</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div className="glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--accent-color)' }}>Mosque Admin Dashboard</h2>
            <button className="btn" style={{ background: 'transparent', border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }} onClick={() => setAuthenticated(false)}>Logout</button>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
             <label style={{ fontWeight: 'bold' }}>Rolling Notices</label>
             <button className="btn" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} onClick={() => setNotices([...notices, {text: "", expiresAt: ""}])}>+ Add Row</button>
          </div>
          {notices.map((n, i) => (
             <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', padding: '1rem', border: '1px dashed var(--glass-border)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                   <div style={{ flex: 1, minWidth: '200px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Notice Text</label>
                      <input type="text" className="input-field" style={{ marginBottom: 0 }} value={n.text} onChange={e => {
                         const newN = [...notices];
                         newN[i].text = e.target.value;
                         setNotices(newN);
                      }} placeholder="Type announcement here..." />
                   </div>
                   <div style={{ minWidth: '200px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expiration Timer (Optional)</label>
                      <input type="datetime-local" className="input-field" style={{ marginBottom: 0 }} value={n.expiresAt} onChange={e => {
                         const newN = [...notices];
                         newN[i].expiresAt = e.target.value;
                         setNotices(newN);
                      }} />
                   </div>
                   <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                     <button className="btn" style={{ background: '#cc4444', color: '#fff', padding: '0.75rem 1rem' }} onClick={() => setNotices(notices.filter((_, idx) => idx !== i))}>X</button>
                   </div>
                </div>
             </div>
          ))}
        </div>

        <h3 style={{ marginBottom: '1.5rem' }}>Update Prayer Times</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {Object.entries(prayerTimes).map(([prayer, time]) => (
            <div key={prayer}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{prayer}</label>
              <input type="text" className="input-field" value={time} onChange={e => setPrayerTimes({...prayerTimes, [prayer]: e.target.value})} />
            </div>
          ))}
        </div>

        <button className="btn" onClick={handleSave} style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }}>Publish Changes Worldwide</button>
      </div>
    </main>
  );
}
