// src/utils/linkParser.ts

export function parseNoteLinks(text: string): string {
  return text.replace(/\[\[(.*?)\]\]/g, (_, title: string) => {
    return `[${title}](/nota/${title})`;
  });
}
