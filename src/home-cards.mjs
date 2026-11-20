// Limit only the homepage; the public feed remains the complete archive.
export function homeCards(cards) {
  const counts = new Map();
  return [...cards].sort((a,b) => Date.parse(b.at || b.date) - Date.parse(a.at || a.date) || a.id.localeCompare(b.id)).filter(c => {
    const group = c.action || (['note','project'].includes(c.category) ? c.category : c.source);
    const count = counts.get(group) || 0;
    counts.set(group, count + 1);
    return count < (group === 'note' || group === 'project' ? 10 : 5);
  });
}
