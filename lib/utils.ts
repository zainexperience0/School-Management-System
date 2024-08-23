import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, addMonths, formatDistanceToNowStrict } from 'date-fns';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export const calculateRemainingDays = (createdAt: any, durationInMonths: any) => {
  // Convert createdAt to a Date object
  const startDate = new Date(createdAt);
  
  // Calculate the end date by adding the duration in months
  const endDate = addMonths(startDate, durationInMonths);
  
  // Calculate the difference in days between the end date and the current date
  const remainingDays = differenceInDays(endDate, new Date());
  
  return remainingDays > 0 ? remainingDays : 0; // Ensure that we don't return negative values
};


export function isoToDate(isoString: string): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function timeAgo(isoString: string): string {
  const now = new Date();
  const date = new Date(isoString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}


export function calculateAge(birthDate: any) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();
  const dayDifference = today.getDate() - birthDateObj.getDate();

  // Adjust age if the current date is before the birth date in the current year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}