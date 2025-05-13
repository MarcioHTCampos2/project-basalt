import { capitalizeFirstLetter } from '../utils/textUtils';

describe('capitalizeFirstLetter', () => {
  it('deve capitalizar a primeira letra', () => {
    expect(capitalizeFirstLetter('clayton')).toBe('Clayton');
  });

  it('deve retornar string vazia se entrada for vazia', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });
});
