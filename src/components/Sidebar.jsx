import React from 'react';

const backlogItems = [
  'Aplicação Desktop com Electron',
  'Buscar Notas',
  'Conectar Notas',
  'Criar Nota',
  'Criar Pastas para Organização',
  'Interface Intuitiva (React)',
  'Salvar Localmente'
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-indigo-700 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Backlog</h2>
      <ul className="space-y-2">
        {backlogItems.map((item, index) => (
          <li key={index} className="bg-white text-black rounded px-2 py-1">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
