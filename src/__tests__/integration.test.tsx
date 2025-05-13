import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SaveNoteModal from '../components/SaveNoteModal';

describe('Integração: SaveNoteModal', () => {
  it('deve chamar cancelar() ao clicar no botão Cancelar', () => {
    const mockCancelar = jest.fn();

    render(
      <SaveNoteModal
        pastas={['Pessoal', 'Trabalho']}
        pastaSelecionada=""
        setPastaSelecionada={() => {}}
        confirmar={() => {}}
        cancelar={mockCancelar}
      />
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockCancelar).toHaveBeenCalled();
  });
});
