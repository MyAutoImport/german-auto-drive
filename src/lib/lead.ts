// src/lib/lead.ts
export type LeadPayload = { 
  name: string; 
  email: string; 
  phone?: string; 
  message?: string; 
  source: string; 
};

export async function submitLead(payload: LeadPayload) {
  const res = await fetch('/api/lead-create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: payload.name,
      email: payload.email,
      phone: payload.phone || '',
      message: payload.message || '',
      vehicleType: payload.source, // Use source as vehicleType for compatibility
    }),
  });
  
  if (!res.ok) {
    throw new Error('Lead request failed');
  }
  
  return res.json();
}