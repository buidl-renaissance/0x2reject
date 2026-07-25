export const DEFAULT_ACTIVITIES = [
  { id: 'pinball', label: 'Pinball', emoji: '🎯' },
  { id: 'crypto', label: 'Crypto', emoji: '📈' },
  { id: 'travel', label: 'Travel / Drifting', emoji: '✈️' },
  { id: 'building', label: 'Building things', emoji: '🛠️' },
  { id: 'events', label: 'Events & nightlife', emoji: '🎉' },
] as const;

export type ActivityId = (typeof DEFAULT_ACTIVITIES)[number]['id'];

export function activityLabel(id: string): string {
  const found = DEFAULT_ACTIVITIES.find((a) => a.id === id);
  return found ? `${found.emoji} ${found.label}` : id;
}
