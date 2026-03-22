import {
  collection, doc, getDocs,
  setDoc, deleteDoc, updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const today = () => new Date().toISOString().split("T")[0];

export const fmt = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" });

export const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
export const startDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

export function prevDay(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

export function calcStreak(log: string[], freezeDates: string[] = []) {
  if (!log.length && !freezeDates.length) return 0;
  const validDays = new Set([...log, ...freezeDates]);
  const sorted = [...validDays].sort((a, b) => b.localeCompare(a));
  let streak = 0;
  let cur = today();
  for (const d of sorted) {
    if (d === cur) { streak++; cur = prevDay(cur); }
    else if (d < cur) break;
  }
  return streak;
}

export function calcLongest(log: string[]) {
  if (!log || log.length === 0) return 0;
  const sorted = [...new Set(log)].sort();
  let max = 1, cur = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = (new Date(sorted[i]).getTime() - new Date(sorted[i - 1]).getTime()) / 86400000;
    if (diff === 1) { cur++; max = Math.max(max, cur); }
    else cur = 1;
  }
  return max;
}

export interface Habit {
  id: string;
  name: string;
  log: string[];
  createdAt: string;
  reminderTime?: string;
  freezeDates?: string[];
  category?: string;  // ← add this
  color?: 'pink' | 'peach' | 'lavender' | 'purple' | 'gold';
}

export function newHabit(name: string): Habit {
  return {
    id: Date.now().toString(),
    name,
    log: [],
    createdAt: today(),
    freezeDates: [],
    category: ""
  };
}

const habitsRef = (userId: string) =>
  collection(db, "users", userId, "habits");

const habitDocRef = (userId: string, habitId: string) =>
  doc(db, "users", userId, "habits", habitId);

export async function loadHabitsFromFirestore(userId: string): Promise<Habit[]> {
  try {
    const snapshot = await getDocs(habitsRef(userId));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Habit));
  } catch (err) {
    console.error("Failed to load habits:", err);
    return [];
  }
}

export async function saveHabitToFirestore(userId: string, habit: Habit) {
  try {
    await setDoc(habitDocRef(userId, habit.id), habit);
  } catch (err) {
    console.error("Failed to save habit:", err);
  }
}

export async function updateHabitInFirestore(userId: string, habitId: string, fields: Partial<Habit>) {
  try {
    await updateDoc(habitDocRef(userId, habitId), fields as Record<string, unknown>);
  } catch (err) {
    console.error("Failed to update habit:", err);
  }
}

export async function deleteHabitFromFirestore(userId: string, habitId: string) {
  try {
    await deleteDoc(habitDocRef(userId, habitId));
  } catch (err) {
    console.error("Failed to delete habit:", err);
  }
}