export function pickAllowedFields(body, allowedFields) {
  const filtered = {};
  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      filtered[field] = body[field];
    }
  }
  return filtered;
}
