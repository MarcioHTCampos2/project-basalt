import React, { useState } from 'react';
import SidebarMenu from '../components/SidebarMenu';  // Importando SidebarMenu
import ReactMarkdown from 'react-markdown';
import { parseNoteLinks } from '../utils/linkParser';  // Função que converte links
import './NotePage.css'

export default function NotePage() {
  const [note, setNote] = useState('# Minha Nota\nEscreva algo aqui...');
  const [title, setTitle] = useState('');
  const [pastas, setPastas] = useState<string[]>(['Pasta Principal']);
  const [notas, setNotas] = useState<{ [pasta: string]: string[] }>({
    'Pasta Principal': ['Nota 1', 'Nota 2']
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [pastaSelecionada, setPastaSelecionada] = useState('');



  const selecionarNota = (conteudo: string) => {
    
    setNote(conteudo);
  };

  const criarNovaNota = () => {
    setTitle('# Título...');
    setNote('# Nova Nota\nDigite seu conteúdo...');
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

  const confirmarSalvar = () => {
    if (pastaSelecionada) {
      setNotas((prev) => ({
        ...prev,
        [pastaSelecionada]: [...(prev[pastaSelecionada] || []), note]
      }));
      alert('Nota salva com sucesso!');
      setModalAberto(false);
      setPastaSelecionada('');
    } else {
      alert('Selecione uma pasta para salvar!');
    }
  };

  const renderedNote = parseNoteLinks(note);

  return (
    <div className='menu'>
      <div className='sidebar-menu'>
        {/* Sidebar com as pastas e notas */}
        <SidebarMenu
          pastas={pastas}
          notas={notas}
          selecionarNota={selecionarNota}
          criarNovaNota={criarNovaNota}
          criarNovaPasta={criarNovaPasta}
        />

      </div>
      {/* Editor de Notas */}
      <main className='editor-notas'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Título'
          className='note-title'
        />
        <div className='divider'></div>
        <textarea
          className='text-area'
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/*<h2 className="text-xl font-semibold mb-2">Pré-visualização:</h2>
        <div className='prose-note'>
          <ReactMarkdown>{renderedNote}</ReactMarkdown>
        </div> */}

        <button onClick={handleSave} className="save-button">
          Salvar
        </button>

        {/* Modal de salvar nota */}
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
