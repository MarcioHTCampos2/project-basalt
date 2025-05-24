// src/utils/linkParser.ts

export function parseNoteLinks(text: string): string {
  // Converte [pasta/titulo] para [pasta/titulo](#pasta%20titulo)
  return text.replace(/\[([^\]/]+)\/([^\]]+)\]/g, (_, pasta, titulo) => {
    const pastaEncoded = encodeURIComponent(pasta);
    const tituloEncoded = encodeURIComponent(titulo);
    return `[${pasta}/${titulo}](#${pastaEncoded}/${tituloEncoded})`;
  });
}