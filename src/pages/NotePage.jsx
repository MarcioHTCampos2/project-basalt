import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { parseNoteLinks } from '../utils/linkParser';

export default function NotePage() {
  const [note, setNote] = useState("# Minha Nota\nEscreva algo aqui...");

  const handleChange = (e) => setNote(e.target.value);

  const renderedNote = parseNoteLinks(note);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editor de Notas</h1>
      <textarea
        className="w-full h-48 p-2 border rounded mb-4"
        value={note}
        onChange={handleChange}
      />
      <h2 className="text-xl font-semibold mb-2">Pré-visualização:</h2>
      <div className="prose bg-gray-100 p-4 rounded">
        <ReactMarkdown>{renderedNote}</ReactMarkdown>
      </div>
    </div>
  );
}
