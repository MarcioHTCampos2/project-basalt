// src/pages/NotePage.jsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { parseNoteLinks } from '../utils/linkParser';

export default function NotePage() {
  const [note, setNote] = useState("# Minha Nota\nEscreva algo aqui...");

  const handleChange = (e) => setNote(e.target.value);

  const handleSave = () => {
    localStorage.setItem('minhaNota', note);
    alert('Nota salva com sucesso!');
  };

  const renderedNote = parseNoteLinks(note);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editor de Notas</h1>

      <textarea
        className="w-full h-48 p-2 border rounded mb-4"
        value={note}
        onChange={handleChange}
      />

      <h2 className="text-xl font-semibold mb-2">Pré-visualização:</h2>
      <div className="prose bg-gray-100 p-4 rounded mb-4">
        <ReactMarkdown>{renderedNote}</ReactMarkdown>
      </div>

      <button onClick={handleSave} className="save-button">
  Salvar
</button>

    </div>
  );
}
