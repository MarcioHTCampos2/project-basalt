import React, { useState } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import ReactMarkdown from 'react-markdown';
import { parseNoteLinks } from '../utils/linkParser';
import './NotePage.css';

export default function NotePage() {
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');
  const [pastas, setPastas] = useState<string[]>(['Pasta Principal']);
  const [notas, setNotas] = useState<{ [pasta: string]: { titulo: string; conteudo: string }[] }>({
    'Pasta Principal': [{ titulo: 'Nota 1', conteudo: '' }, { titulo: 'Nota 2', conteudo: '' }]
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [editorAberto, setEditorAberto] = useState(true);
  const [pastaSelecionada, setPastaSelecionada] = useState('');

  const selecionarNota = (nota: { titulo: string; conteudo: string }) => {
    setTitle(nota.titulo);
    setNote(nota.conteudo);
    setEditorAberto(false);
  };

  const criarNovaNota = () => {
    setTitle('');
    setNote('');
    setEditorAberto(true);
  };

  const criarNovaPasta = () => {
    const nome = prompt('Digite o nome da nova pasta:');
    if (nome && !pastas.includes(nome)) {
      setPastas([...pastas, nome]);
      setNotas({ ...notas, [nome]: [] });
    }
  };

  const handleSave = () => {
    setModalAberto(true);
  };

  const handleEdit = () => {
    setEditorAberto(true);
  };

  const confirmarSalvar = () => {
    if (pastaSelecionada) {
      const novaNota = {
        titulo: title,
        conteudo: note
      };
      setNotas((prev) => ({
        ...prev,
        [pastaSelecionada]: [...(prev[pastaSelecionada] || []), novaNota]
      }));
      alert('Nota salva com sucesso!');
      setModalAberto(false);
      setPastaSelecionada('');
    } else {
      alert('Selecione uma pasta para salvar!');
    }
  };

  const renderedNote = parseNoteLinks(note);
  const renderedTitle = parseNoteLinks(title);

  return (
    <div className='menu'>
      <div className='sidebar-menu'>
        <SidebarMenu
          pastas={pastas}
          notas={notas}
          selecionarNota={selecionarNota}
          criarNovaNota={criarNovaNota}
          criarNovaPasta={criarNovaPasta}
        />
      </div>

      <main className='editor-notas'>
        {editorAberto && (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Título...'
              className='note-title'
            />
            <textarea
              className='text-area'
              placeholder='Nova Nota...'
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button onClick={handleSave} className="save-button">
              Salvar
            </button>
          </>
        )}

        {!editorAberto && (
          <>
            <div className='prose-note'>
              <ReactMarkdown>{renderedTitle}</ReactMarkdown>
              <ReactMarkdown>{renderedNote}</ReactMarkdown>
            </div>
            <button onClick={handleEdit} className="edit-button">
              Editar
            </button>
          </>
        )}

        {modalAberto && (
          <div>
            <div className="modal-content">
              <h2>Escolha a pasta</h2>
              <select
                value={pastaSelecionada}
                onChange={(e) => setPastaSelecionada(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
              >
                <option value="">Selecione uma pasta</option>
                {pastas.map((pasta) => (
                  <option key={pasta} value={pasta}>
                    {pasta}
                  </option>
                ))}
              </select>

              <div className="flex justify-end space-x-2">
                <button onClick={() => setModalAberto(false)} className="px-4 py-2 bg-gray-300 rounded">
                  Cancelar
                </button>
                <button onClick={confirmarSalvar} className="px-4 py-2 bg-indigo-600 text-white rounded">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
