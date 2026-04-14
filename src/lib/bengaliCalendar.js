export function getBengaliDateFull(gregDate) {
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  
  const bdDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, isLeapYear(gregDate.getFullYear()) ? 30 : 29, 30];
  const bdMonths = ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];
  const bnNumerals = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  
  const toBn = (num) => String(num).split('').map(c => bnNumerals[parseInt(c)] || c).join('');
  
  // Create an exact day representation stripping out time to avoid timezone edge case bugs mapping
  const startOfYear = new Date(gregDate.getFullYear(), 3, 14, 0, 0, 0); 
  const current = new Date(gregDate.getFullYear(), gregDate.getMonth(), gregDate.getDate(), 0, 0, 0);

  let diffDays = Math.floor((current - startOfYear) / (1000 * 60 * 60 * 24));
  let bYear = gregDate.getFullYear() - 593;
  
  if (diffDays < 0) {
      bYear -= 1;
      const prevYearLeap = isLeapYear(gregDate.getFullYear() - 1);
      const prevBdDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, prevYearLeap ? 30 : 29, 30];
      const totalDaysPrev = prevBdDays.reduce((a, b) => a + b, 0);
      diffDays += totalDaysPrev;
  }
  
  let mIndex = 0;
  const bdDaysActive = diffDays < 0 ? [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, isLeapYear(gregDate.getFullYear() - 1) ? 30 : 29, 30] : bdDays;
  
  while(diffDays >= bdDaysActive[mIndex]) {
      diffDays -= bdDaysActive[mIndex];
      mIndex++;
  }
  
  const bDate = diffDays + 1;
  return {
    day: bDate,
    dayBn: toBn(bDate),
    month: bdMonths[mIndex],
    year: bYear,
    yearBn: toBn(bYear),
    formatted: `${toBn(bDate)} ${bdMonths[mIndex]} ${toBn(bYear)}`
  };
}
