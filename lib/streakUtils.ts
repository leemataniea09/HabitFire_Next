import { today, prevDay, calcStreak } from "./dateUtils";

export function missedYesterday(log: string[], freezeDates: string[] = []) {
  const yesterday = prevDay(today());
  return !new Set(log).has(yesterday) && !new Set(freezeDates).has(yesterday);
}

export function getFreezesUsedThisWeek(freezeDates: string[] = []) {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return freezeDates.filter((d) => {
    const date = new Date(d + "T00:00:00");
    return date >= sevenDaysAgo && date <= now;
  }).length;
}

export function canUseFreeze(freezeDates: string[] = []) {
  return getFreezesUsedThisWeek(freezeDates) < 1;
}

export function getFreezesRemaining(freezeDates: string[] = []) {
  return Math.max(0, 1 - getFreezesUsedThisWeek(freezeDates));
}

export function applyFreeze(freezeDates: string[] = []) {
  const yesterday = prevDay(today());
  if (freezeDates.includes(yesterday)) return freezeDates;
  return [...freezeDates, yesterday];
}

export function shouldShowFreezePopup(
  habit: { log: string[]; freezeDates?: string[] },
  dismissedToday: boolean
) {
  if (dismissedToday) return false;
  const { log = [], freezeDates = [] } = habit;
  if (calcStreak(log, freezeDates) === 0) return false;
  if (!missedYesterday(log, freezeDates)) return false;
  if (!canUseFreeze(freezeDates)) return false;
  return true;
}