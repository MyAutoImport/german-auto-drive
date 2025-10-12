// src/lib/lead.ts
export type LeadPayload = { 
  name: string; 
  email: string; 
  phone?: string; 
  message?: string; 
  source: string; 
};

export async function submitLead(payload: LeadPayload) {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || '',
      message: payload.message || '',
      source: payload.source,
    }),
  });
  
  const result = await res.json().catch(() => ({ error: 'Network error' }));
  
  if (!res.ok || !result.ok) {
    throw new Error(result.error || res.statusText || 'Lead request failed');
  }
  
  return result;
}