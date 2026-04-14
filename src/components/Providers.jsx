"use client";
import React, { createContext, useState, useContext } from 'react';

const translations = {
  EN: {
    heading: "Baitul Aman Islamic Center Inc.",
    address: "2351 Newbold Ave, Bronx, NY 10462",
    notice: "NOTICE:",
    nextPrayer: "Next Prayer",
    prayerTimes: "Prayer Timings",
    qiblaDirection: "Qibla Direction",
    qiblaTarget: "Mecca is precisely 58.5° target",
    gregorian: "Gregorian",
    hijri: "Hijri",
    bangla: "Bangla",
    currentWeather: "Current Weather in Bronx",
    dailyReflection: "Daily Reflection",
    followFb: "Follow our Facebook Page",
    rights: "© 2026 Baitul Aman Islamic Center Inc. All Rights Reserved.",
    Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha", Jummah: "Jummah",
    fullCalendar: "View Full Calendar",
    close: "Close",
    donate: "Donate Now",
    playAzan: "Play Azan",
    stopAzan: "Stop Azan"
  },
  AR: {
    heading: "مركز بيت الأمان الإسلامي",
    address: "2351 نيوبولد أفينيو، برونكس، نيويورك 10462",
    notice: "إشعار:",
    nextPrayer: "الصلاة القادمة",
    prayerTimes: "مواقيت الصلاة",
    qiblaDirection: "اتجاه القبلة",
    qiblaTarget: "مكة المكرمة بزاوية 58.5 درجة",
    gregorian: "ميلادي",
    hijri: "هجري",
    bangla: "بنغالي",
    currentWeather: "الطقس الحالي في برونكس",
    dailyReflection: "تأمل يومي",
    followFb: "تابع صفحتنا على فيسبوك",
    rights: "© 2026 مركز بيت الأمان. جميع الحقوق محفوظة.",
    Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء", Jummah: "الجمعة",
    fullCalendar: "عرض التقويم الكامل",
    close: "إغلاق",
    donate: "تبرع الآن",
    playAzan: "تشغيل الأذان",
    stopAzan: "إيقاف الأذان"
  },
  BN: {
    heading: "বায়তুল আমান ইসলামিক সেন্টার ইনক.",
    address: "২৩৫১ নিউবোল্ড এভ, ব্রঙ্কস, নিউ ইয়র্ক ১০৪৬২",
    notice: "বিজ্ঞপ্তি:",
    nextPrayer: "পরবর্তী নামায",
    prayerTimes: "নামাযের সময়সূচী",
    qiblaDirection: "কিবলার দিক",
    qiblaTarget: "মক্কা নির্ভুলভাবে ৫৮.৫° লক্ষ্য",
    gregorian: "ইংরেজি",
    hijri: "হিজরি",
    bangla: "বাংলা",
    currentWeather: "বর্তমান আবহাওয়া",
    dailyReflection: "প্রাত্যহিক উপলব্ধি",
    followFb: "আমাদের ফেসবুক পাতা",
    rights: "© 2026 তয়তুল আমান ইসলামিক সেন্টার. সমস্ত অধিকার সংরক্ষিত।",
    Fajr: "ফজর", Dhuhr: "যোহর", Asr: "আসর", Maghrib: "মাগরিব", Isha: "ইশা", Jummah: "জুম্মা",
    fullCalendar: "পূর্ণ ক্যালেন্ডার দেখুন",
    close: "বন্ধ করুন",
    donate: "দান করুন",
    playAzan: "আযান শুনুন",
    stopAzan: "আযান বন্ধ"
  }
};

const LanguageContext = createContext();

export function Providers({ children }) {
  const [lang, setLang] = useState('EN');
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
