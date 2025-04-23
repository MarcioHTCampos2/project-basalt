// Substitui [[nota]] por um link interno simples (futuramente será uma rota)
export function parseNoteLinks(text) {
    return text.replace(/\[\[(.*?)\]\]/g, (_, title) => {
      return `[${title}](/nota/${title})`;
    });
  }
  