
import { parseLinksFromText } from '../utils/linkParser';

describe('parseLinksFromText', () => {
  it('deve extrair links corretamente de um texto', () => {
    const input = "Veja este link: https://openai.com e também este: http://example.com";
    const expected = ["https://openai.com", "http://example.com"];
    const result = parseLinksFromText(input);
    expect(result).toEqual(expected);
  });

  it('deve retornar array vazio quando não houver links', () => {
    const input = "Texto sem nenhum link.";
    const result = parseLinksFromText(input);
    expect(result).toEqual([]);
  });
});
