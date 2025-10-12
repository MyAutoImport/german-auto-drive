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
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorData.error || 'Lead request failed');
  }
  
  const result = await res.json();
  if (!result.ok) {
    throw new Error(result.error || 'Lead request failed');
  }
  
  return result;
}