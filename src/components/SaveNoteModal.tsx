import React from 'react';
import { FiX } from 'react-icons/fi';

interface SaveNoteModalProps {
  pastas: string[];
  pastaSelecionada: string;
  setPastaSelecionada: (pasta: string) => void;
  confirmar: () => void;
  cancelar: () => void;
  
}

export default function SaveNoteModal({ pastas, pastaSelecionada, setPastaSelecionada, confirmar, cancelar }: SaveNoteModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded shadow-lg w-96">
        
        <button onClick={cancelar} className="absolute top-2 right-2 text-gray-600 hover:text-black">
          <FiX size={20} />
        </button>

        <h2 className="text-xl mb-4 font-bold text-center">Salvar Nota</h2>

        <select
          value={pastaSelecionada}
          onChange={(e) => setPastaSelecionada(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        >
          <option value="">Selecione uma pasta</option>
          {pastas.map((pasta, idx) => (
            <option key={idx} value={pasta}>
              {pasta}
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-2">
          <button onClick={cancelar} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
          <button onClick={confirmar} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Salvar</button>
        </div>
      </div>
    </div>
  );
}
