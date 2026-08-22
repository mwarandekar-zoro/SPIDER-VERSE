// ============================================================
// RELATIONSHIPS DATA
// ------------------------------------------------------------
// Per section 23: kept intentionally simple for v1 — a flat list
// of directed edges, not a full graph visualization yet.
// ============================================================

export const relationships = [
  { characterId: 'miles-morales', relatedId: 'peter-b-parker', type: 'Mentor' },
  { characterId: 'miles-morales', relatedId: 'gwen-stacy', type: 'Friend' },
  { characterId: 'miles-morales', relatedId: 'miguel-ohara', type: 'Uneasy Ally' },

  { characterId: 'gwen-stacy', relatedId: 'miles-morales', type: 'Friend' },
  { characterId: 'gwen-stacy', relatedId: 'peter-b-parker', type: 'Mentor' },

  { characterId: 'miguel-ohara', relatedId: 'miles-morales', type: 'Uneasy Ally' },
  { characterId: 'miguel-ohara', relatedId: 'pavitr-prabhakar', type: 'Recruit' },

  { characterId: 'pavitr-prabhakar', relatedId: 'miguel-ohara', type: 'Mentor' },
  { characterId: 'pavitr-prabhakar', relatedId: 'gwen-stacy', type: 'Friend' },

  { characterId: 'peter-b-parker', relatedId: 'miles-morales', type: 'Mentee' },
  { characterId: 'peter-b-parker', relatedId: 'gwen-stacy', type: 'Mentee' },
];
