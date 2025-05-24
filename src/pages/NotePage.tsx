import React, { useState, useEffect } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import ReactMarkdown from 'react-markdown';
import { parseNoteLinks } from '../utils/linkParser';
import './NotePage.css';

export default function NotePage() {
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');
  // Carrega pastas do localStorage ou usa valor padrão
  const [pastas, setPastas] = useState<string[]>(() => {
    const saved = localStorage.getItem('pastas');
    return saved ? JSON.parse(saved) : ['Pasta Principal'];
  });
  const [notas, setNotas] = useState<{ [pasta: string]: { titulo: string; conteudo: string }[] }>(() => {
    const saved = localStorage.getItem('notas');
    return saved ? JSON.parse(saved) : {
      'Pasta Principal': [{ titulo: 'Nota 1', conteudo: '' }, { titulo: 'Nota 2', conteudo: '' }]
    };
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [editorAberto, setEditorAberto] = useState(true);
  const [pastaSelecionada, setPastaSelecionada] = useState('');

  // Salva notas no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('notas', JSON.stringify(notas));
  }, [notas]);

  // Salva pastas no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('pastas', JSON.stringify(pastas));
  }, [pastas]);


  const selecionarNota = (nota: { titulo: string; conteudo: string }) => {
    setTitle(nota.titulo);
    setPastaSelecionada('');
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

  const handleLinkClick = (href: string) => {
  if (href.startsWith('#')) {
    const decoded = decodeURIComponent(href.slice(1));
    const firstSlash = decoded.indexOf('/');
    if (firstSlash === -1) return;
    const pasta = decoded.slice(0, firstSlash);
    const titulo = decoded.slice(firstSlash + 1);
    const nota = notas[pasta]?.find(n => n.titulo.trim() === titulo.trim());
    if (nota) {
      setTitle(nota.titulo);
      setNote(nota.conteudo);
      setEditorAberto(false);
    } else {
      alert(`Nota "${titulo}" não encontrada na pasta "${pasta}"`);
    }
  }
};

  const confirmarSalvar = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert('O título da nota não pode estar vazio!');
      return;
    }
    if (pastaSelecionada) {
      const novaNota = {
        titulo: trimmedTitle,
        conteudo: note
      };

      setNotas((prev) => {
        const notasDaPasta = prev[pastaSelecionada] || [];
        const notaIndex = notasDaPasta.findIndex(n => n.titulo.trim() === trimmedTitle);

        let novasNotasDaPasta;
        if (notaIndex !== -1) {
          // Override existing note
          novasNotasDaPasta = [...notasDaPasta];
          novasNotasDaPasta[notaIndex] = novaNota;
        } else {
          // Add new note
          novasNotasDaPasta = [...notasDaPasta, novaNota];
        }

        return {
          ...prev,
          [pastaSelecionada]: novasNotasDaPasta
        };
      });

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
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={handleSave} className="save-button">
                Salvar
              </button>
            </div>
          </>
        )}

        {!editorAberto && (
          <>
            <div className='prose-note'>
              {title && <h2>{title}</h2>}
              <ReactMarkdown
                components={{
                  a: ({ href = '', children, ...props }) => (
                    <a
                      href={href}
                      {...props}
                      onClick={e => {
                        e.preventDefault();
                        handleLinkClick(href);
                      }}
                      style={{ color: '#7c3aed', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {parseNoteLinks(note)}
              </ReactMarkdown>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={handleEdit} className="edit-button">
                Editar
              </button>
            </div>
          </>
        )}
        {modalAberto && (
          <div className="modal-background">
            <div className="modal-content">
              <h2>Escolha a pasta</h2>
              <select
                value={pastaSelecionada}
                onChange={(e) => setPastaSelecionada(e.target.value)}
                className="select-custom border p-2 rounded mb-4 w-full"
              >
                <option value="" className="select-option">Selecione uma pasta</option>
                {pastas.map((pasta) => (
                  <option key={pasta} value={pasta} className="select-option">
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
