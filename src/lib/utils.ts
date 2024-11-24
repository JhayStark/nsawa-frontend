import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CryptoJS from 'crypto-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const secretKey: string = process.env.NEXT_PUBLIC_SECRET_KEY || '';

export const encryptData = (data: any) => {
  if (!secretKey) {
    console.log('Secret key is missing');
    return '';
  }
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (ciphertext: any) => {
  if (!secretKey) {
    return console.log('Secret key is missing');
  }
  if (typeof ciphertext !== 'string') return null;
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.log('Error decrypting data');
    return null;
  }
};

export function formatToGhanaCurrency(amount: number) {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  })
    .format(amount)
    .replace('GH₵', 'GH₵ ');
}
