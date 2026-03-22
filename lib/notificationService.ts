export async function requestNotificationPermission() {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const permission = await Notification.requestPermission();
  return permission === "granted";
}

export function notificationsGranted() {
  return "Notification" in window && Notification.permission === "granted";
}

export function showHabitNotification(habitName: string) {
  if (!notificationsGranted()) return;
  const notification = new Notification("✦ Habit Reminder", {
    body: `Time to complete: ${habitName}`,
    icon: "/icon.svg",
    tag: `habit-${habitName}`,
  });
  setTimeout(() => notification.close(), 5000);
}

export function startReminderScheduler(
  getHabits: () => { id: string; name: string; reminderTime?: string; log: string[] }[]
) {
  const alreadyFired = new Set<string>();

  const check = () => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const todayStr = now.toISOString().split("T")[0];

    getHabits().forEach((habit) => {
      if (!habit.reminderTime) return;
      const fireKey = `${habit.id}-${todayStr}`;
      if (alreadyFired.has(fireKey)) return;
      if (habit.reminderTime === currentTime) {
        const doneToday = habit.log?.includes(todayStr);
        if (!doneToday) {
          showHabitNotification(habit.name);
          alreadyFired.add(fireKey);
        }
      }
    });
  };

  check();
  const id = setInterval(check, 60000);
  return () => clearInterval(id);
}