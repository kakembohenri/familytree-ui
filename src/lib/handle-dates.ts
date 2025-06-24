import { format, isToday, isYesterday, parse } from "date-fns";

export const formatChatTimestamp = (timestamp: string | Date) => {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return format(date, "p"); // Example: "10:30 AM"
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "dd/MM/yyyy"); // Example: "28/03/2025"
  }
};

export const formatTime = (timestamp: string) => {
  // Parse to a Date object (format: HH:mm for 24-hour time)
  const parsedTime = parse(timestamp, "HH:mm", new Date());
  // const formattedTime = new Date(timestamp);
  return format(parsedTime, "hh:mm a"); // Example: "06:24 PM"
};

export const formatToHumanReadableDate = (day: string) => {
  // return format(day, "EEEE wo LLLL yyyy");
  return format(new Date(day), "EEEE, MMMM do, yyyy");
};
