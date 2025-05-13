export function parseLinksFromText(text: string): string[] {
  const regex = /https?:\/\/[^\s]+/g;
  return text.match(regex) || [];
}
