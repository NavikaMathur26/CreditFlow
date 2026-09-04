/**
 * Validate 10-digit mobile number
 */
export const isValidMobileNumber = (mobile) => {
  if (!mobile) return false;
  const cleaned = mobile.toString().replace(/\D/g, '');
  return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
};

/**
 * Validate transaction transfer amount
 */
export const validateAmount = (amount, maxBalance = Infinity) => {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return { isValid: false, error: 'Please enter a valid amount greater than ₹0' };
  }
  if (numericAmount > maxBalance) {
    return { isValid: false, error: 'Transfer amount exceeds current balance' };
  }
  if (numericAmount > 100000) {
    return { isValid: false, error: 'Daily transfer limit is ₹1,00,000' };
  }
  return { isValid: true, error: null };
};

/**
 * Validate 4 or 6-digit security PIN
 */
export const isValidPin = (pin, length = 4) => {
  if (!pin) return false;
  const regex = new RegExp(`^\\d{${length}}$`);
  return regex.test(pin);
};
