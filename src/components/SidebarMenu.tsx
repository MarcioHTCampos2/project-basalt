import React, { useState } from 'react';
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import "./SidebarMenu.css"

interface Nota {
  titulo: string;
  conteudo: string;
}

interface SidebarMenuProps {
  pastas: string[];
  notas: { [pasta: string]: Nota[] };
  selecionarNota: (nota: Nota) => void;
  criarNovaNota: () => void;
  criarNovaPasta: () => void;
}

export default function SidebarMenu({
  pastas,
  notas,
  selecionarNota,
  criarNovaNota,
  criarNovaPasta
}: SidebarMenuProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [pastasAbertas, setPastasAbertas] = useState<{ [key: string]: boolean }>({});

  const togglePasta = (pasta: string) => {
    setPastasAbertas((prev) => ({ ...prev, [pasta]: !prev[pasta] }));
  };

  return (
    <div className="screen">
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="menu-button"
      >
        {menuAberto ? <FiX size={15} /> : <FiMenu size={15} />}
      </button>

      {menuAberto && (
        <div className="sidebar">
          <div className='sidebar-divider'></div>

          <button onClick={criarNovaNota} className="w-full mb-2">
            Criar Nova Nota
          </button>
          <button onClick={criarNovaPasta} className="w-full mb-4">
            Criar Nova Pasta
          </button>

          <div className='sidebar-divider'></div>

          <h2 className="text-white mb-2 font-bold">Pastas</h2>

          <div className='sidebar-scroll'>
            {pastas.map((pasta) => (
              <div key={pasta} className="mb-2">
                <button
                  onClick={() => togglePasta(pasta)}
                  className="pasta-button flex items-center justify-between w-full"
                >
                  {pasta}
                  {pastasAbertas[pasta] ? <FiChevronDown /> : <FiChevronRight />}
                </button>

                {pastasAbertas[pasta] && (
                  <div className="ml-4">
                    {notas[pasta]?.map((nota, idx) => (
                      <button
                        key={idx}
                        onClick={() => selecionarNota(nota)}
                        className="nota-item"
                      >
                        {nota.titulo}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
