export const classifyThreat = async (content, type = 'text') => {
  const response = await fetch('http://localhost:3001/api/classify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, type })
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || 'Classification failed');
  return data.data;
};
