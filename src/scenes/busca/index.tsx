import React, { useState } from 'react';
import axios from 'axios';
import Clientes from '@/scenes/clientes';
import HomeDois from '@/scenes/busca/homeDois';
import Navbar from '@/scenes/navbar';


const BuscaDoencas: React.FC = () => {
  const [nomeDoenca, setNomeDoenca] = useState('');
  const [doencas, setDoencas] = useState<any[]>([]);
  const [noticias, setNoticias] = useState<any[]>([]);
  const [mostrarMedicos, setMostrarMedicos] = useState(false);

  const buscarDoenca = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/buscarDoenca?nome=${nomeDoenca}`);
      setDoencas(response.data);
    } catch (error) {
      console.error('Erro ao buscar doenças:', error);
    }
  };

  const buscarNoticias = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${nomeDoenca}&language=pt&apiKey=ce81af908d4f42c09436b4b1c861d418&pageSize=3`);
      setNoticias(response.data.articles);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
    }
  };

  const handleSearch = async () => {
    if (nomeDoenca.trim()) {
      await Promise.all([buscarDoenca(), buscarNoticias()]);
      setMostrarMedicos(true);
    }
  };


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 py-20 gap-10">
      <div className="w-full">
        <Navbar isTopOfPage={false} />
        <HomeDois />
      </div>

      <div id="buscar-doencas" className="flex flex-col md:flex-row justify-center items-center w-full gap-10 mt-10">
        <div className="flex-1 max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-primary-500 text-center">Buscar Doenças</h1>
          <input
            type="text"
            placeholder="Digite o nome da doença"
            value={nomeDoenca}
            onChange={(e) => setNomeDoenca(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button
            onClick={handleSearch}
            className="w-full rounded-md bg-secondary-500 px-4 py-2 text-white hover:bg-primary-500 transition duration-300"
          >
            Buscar
          </button>

          <div className="mt-8 bg-white p-4 border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Resultados para {nomeDoenca}</h2>
            <ul>
              {doencas.map((doenca, index) => (
                <li key={index} className="mb-4">
                  <p className="text-gray-800 font-semibold">{doenca.nome}</p>
                  <p className="text-gray-600">{doenca.descricao}</p>
                  {doenca.tipo_recomendacao && (
                    <p className="text-gray-600">Recomendação: {doenca.tipo_recomendacao}</p>
                  )}
                  {doenca.especialista_nome && (
                    <p className="text-gray-600">Especialista: {doenca.especialista_nome}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 bg-white p-4 border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Notícias sobre {nomeDoenca}</h2>
            <ul>
              {noticias.map((noticia, index) => (
                <li key={index} className="mb-2">
                  <a href={noticia.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {noticia.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {mostrarMedicos && (
          <div className="flex-1 max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
            <Clientes setSelectedPage={function (): void {
              throw new Error('Function not implemented.');
            } } />
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscaDoencas;
