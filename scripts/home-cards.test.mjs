import assert from 'node:assert/strict';
import { homeCards } from '../src/home-cards.mjs';
for (const [group,limit] of Object.entries({reading:5,star:5,fork:5,note:10,project:10})) {
  const rows=Array.from({length:12},(_,i)=>({id:`${group}-${i}`,category:group,source:group,date:`2026-01-${String(i+1).padStart(2,'0')}`}));
  assert.deepEqual(homeCards(rows).map(c=>c.id),rows.slice(-limit).reverse().map(c=>c.id));
}
