/**
 * Format currency with Indian Rupee (₹) or standard currency formatting
 */
export const formatCurrency = (amount, currency = 'INR') => {
  if (amount === undefined || amount === null) return '₹0.00';
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(numericAmount);
};

/**
 * Format 10-digit mobile number with standard spacing (e.g. +91 98765 43210 or 98765 43210)
 */
export const formatMobileNumber = (mobileStr, includeCountryCode = true) => {
  if (!mobileStr) return '';
  const cleaned = mobileStr.toString().replace(/\D/g, '');
  const last10 = cleaned.slice(-10);
  
  if (last10.length === 10) {
    const part1 = last10.slice(0, 5);
    const part2 = last10.slice(5);
    return includeCountryCode ? `+91 ${part1} ${part2}` : `${part1} ${part2}`;
  }
  return mobileStr;
};

/**
 * Mask mobile number for privacy (e.g. +91 98••• ••210)
 */
export const maskMobileNumber = (mobileStr) => {
  if (!mobileStr) return '';
  const cleaned = mobileStr.toString().replace(/\D/g, '').slice(-10);
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 2)}••• ••${cleaned.slice(7)}`;
  }
  return mobileStr;
};

/**
 * Format relative or full dates for transaction timestamps
 */
export const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();
  
  const timeStr = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  if (isToday) {
    return `Today, ${timeStr}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (yesterday.toDateString() === date.toDateString()) {
    return `Yesterday, ${timeStr}`;
  }

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }) + `, ${timeStr}`;
};
