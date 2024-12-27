export const sanitizeText = (text) => {
  const phoneNumberPattern = /(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,10}/g;
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  const linkedInPattern = /https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+/g;
  const addressPattern = /\d+\s[A-Za-z]+\s[A-Za-z]+/g;

  let sanitizedText = text.replace(phoneNumberPattern, '[REDACTED]');
  sanitizedText = sanitizedText.replace(emailPattern, '[REDACTED]');
  sanitizedText = sanitizedText.replace(linkedInPattern, '[REDACTED]');
  sanitizedText = sanitizedText.replace(addressPattern, '[REDACTED]');

  return sanitizedText;
};
