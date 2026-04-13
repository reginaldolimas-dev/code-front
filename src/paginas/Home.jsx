import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Cartao } from '../componentes/core/Cartao.jsx';
import { Etiqueta } from '../componentes/core/Etiqueta.jsx';
import { Carregamento } from '../componentes/core/Carregamento.jsx';
import { EntradaTexto } from '../componentes/core/EntradaTexto.jsx';
import { Texto } from '../componentes/core/Tipografia.jsx';
import { Lista } from '../componentes/core/Lista.jsx';
import { filtrarExercicios, obterCorDificuldade } from '../utils/exercicio.js';
import _ from 'lodash';

export default function Inicio() {
    const [exercicios, definirExercicios] = useState([]);
    const [carregando, definirCarregando] = useState(true);
    const [busca, definirBusca] = useState('');

    useEffect(() => {
        const carregarExercicios = async () => {
            try {
                const resposta = await fetch('/exercicios.json');
                const dados = await resposta.json();
                definirExercicios(dados);
            } catch (erro) {
                console.error("Erro ao carregar exercícios:", erro);
            } finally {
                definirCarregando(false);
            }
        };

        carregarExercicios().catch(console.error);
    }, []);

    const exerciciosFiltrados = filtrarExercicios(exercicios, busca);

    if (carregando) {
        return <Carregamento tamanho="large" estilo={{ display: 'block', margin: '50px auto' }} />;
    }

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <EntradaTexto
                espacoReservado="Buscar por título ou tag (ex: for, lista, fácil)"
                iconePrefixo={<SearchOutlined />}
                valor={busca}
                aoMudar={(e) => definirBusca(_.get(e, 'target.value', ''))}
                estilo={{ marginBottom: 24, maxWidth: 400 }}
            />
            
            <Lista
                grade={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
                fonteDados={exerciciosFiltrados}
                renderizarItem={(ex) => (
                    <div style={{ padding: 8 }}>
                        <Link to={`/exercise/${_.get(ex, 'id')}`} style={{ width: '100%', textDecoration: 'none' }}>
                            <Cartao 
                                hoverable 
                                titulo={_.get(ex, 'title')} 
                                descricao={
                                    <div style={{ marginTop: 8 }}>
                                        <Texto tipo="secondary" estilo={{ fontSize: 12 }}>
                                            {_.join(_.get(ex, 'tags', []), ' • ')}
                                        </Texto>
                                    </div>
                                }
                            >
                                <Etiqueta cor={obterCorDificuldade(_.get(ex, 'difficulty'))} estilo={{ marginBottom: 8 }}>
                                    {_.get(ex, 'difficulty')}
                                </Etiqueta>
                            </Cartao>
                        </Link>
                    </div>
                )}
            />
        </div>
    );
}
