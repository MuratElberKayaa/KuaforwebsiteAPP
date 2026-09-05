/**
 * Utility functions for sanitizing user inputs and escaping special characters
 * to prevent XSS (Cross-Site Scripting) and injection vulnerabilities.
 */

export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Strip angle brackets
    .trim();
}

export function sanitizePhone(input: string): string {
  if (!input) return '';
  return input.replace(/[^\d\s+()-]/g, '').trim();
}

export function sanitizeEmail(input: string): string {
  if (!input) return '';
  return input.replace(/[^\w.@+-]/g, '').trim();
}

