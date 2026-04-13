import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { CodeEditor } from '../componentes/CodeEditor.jsx';
import { Cartao } from '../componentes/core/Cartao.jsx';
import { Titulo, Paragrafo, Texto } from '../componentes/core/Tipografia.jsx';
import { Etiqueta } from '../componentes/core/Etiqueta.jsx';
import { Botao } from '../componentes/core/Botao.jsx';
import { Alerta } from '../componentes/core/Alerta.jsx';
import { Carregamento } from '../componentes/core/Carregamento.jsx';
import { Mensagem } from '../componentes/core/Mensagem.jsx';
import { obterCorDificuldade, extrairResultadoExecucao } from '../utils/exercicio.js';
import _ from 'lodash';

export default function PaginaExercicio() {
    const { id } = useParams();
    const [exercicio, definirExercicio] = useState(null);
    const [carregando, definirCarregando] = useState(true);
    const [codigo, definirCodigo] = useState('');
    const [resultadoSaida, definirResultadoSaida] = useState(null);
    const [executando, definirExecutando] = useState(false);

    useEffect(() => {
        const buscarExercicio = async () => {
            try {
                const resposta = await fetch('/exercicios.json');
                const dados = await resposta.json();
                
                const encontrado = _.find(dados, (ex) => ex.id === _.toInteger(id));
                definirExercicio(encontrado);
                definirCodigo(_.get(encontrado, 'starterCode', ''));
            } catch (erro) {
                console.error("Erro ao carregar exercícios:", erro);
                Mensagem.erro('Erro ao carregar exercícios');
            } finally {
                definirCarregando(false);
            }
        };

        buscarExercicio().catch(console.error);
    }, [id]);

    const lidarComExecucao = async () => {
        if (_.isEmpty(_.trim(codigo))) {
            return Mensagem.aviso('Digite algum código antes de executar');
        }

        definirExecutando(true);
        definirResultadoSaida(null);

        try {
            const resposta = await fetch('http://localhost:8080/api/code/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: 'java',
                    code: codigo,
                }),
            });

            if (!resposta.ok) {
                throw new Error(`Erro na API: ${resposta.status}`);
            }

            const resultadoJson = await resposta.json();
            
            const totalTestes = _.get(exercicio, 'tests.length', 0);
            const dadosSaida = extrairResultadoExecucao(resultadoJson, totalTestes);
            
            definirResultadoSaida(dadosSaida);
            Mensagem.sucesso('Execução concluída!');
        } catch (erro) {
            definirResultadoSaida({
                sucesso: false,
                mensagem: `Falha ao executar o código.\nErro: ${_.get(erro, 'message', 'Erro desconhecido')}`,
                testesPassados: 0,
                totalTestes: _.get(exercicio, 'tests.length', 0)
            });
            Mensagem.erro('Erro na execução');
        } finally {
            definirExecutando(false);
        }
    };

    if (carregando) {
        return <Carregamento tamanho="large" estilo={{ display: 'block', margin: '50px auto' }} />;
    }

    if (!exercicio) {
        return <Alerta mensagem="Exercício não encontrado" tipo="error" />;
    }

    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 16, color: '#1677ff' }}>
                <ArrowLeftOutlined /> Voltar para lista
            </Link>

            <Cartao>
                <Etiqueta 
                    cor={obterCorDificuldade(_.get(exercicio, 'difficulty'))} 
                    estilo={{ marginBottom: 8 }}
                >
                    {_.get(exercicio, 'difficulty')}
                </Etiqueta>
                
                <Titulo nivel={3} estilo={{ marginTop: 0 }}>{_.get(exercicio, 'title')}</Titulo>
                <Paragrafo>{_.get(exercicio, 'description')}</Paragrafo>

                <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 8, marginBottom: 20, border: '1px solid #eee' }}>
                    <Texto forte>📥 Entrada de exemplo:</Texto> <code style={{ marginLeft: 8 }}>{_.get(exercicio, 'inputExample')}</code><br/>
                    <Texto forte>📤 Saída esperada:</Texto> <code style={{ marginLeft: 8 }}>{_.get(exercicio, 'expectedOutput')}</code>
                </div>

                <Titulo nivel={5} estilo={{ marginBottom: 8 }}>Seu Código</Titulo>
                
                <CodeEditor codigo={codigo} aoMudar={definirCodigo} />

                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Botao 
                        tipo="primary" 
                        icone={<PlayCircleOutlined />} 
                        aoClicar={lidarComExecucao} 
                        carregando={executando} 
                        tamanho="large"
                    >
                        Executar Código
                    </Botao>
                    <Texto tipo="secondary">
                        💡 Dica: Cole apenas a classe/método solicitada. O sistema injetará os testes automaticamente.
                    </Texto>
                </div>

                {resultadoSaida && (
                    <div style={{ marginTop: 16 }}>
                        <Alerta
                            mensagem={_.get(resultadoSaida, 'sucesso') ? `Execução finalizada` : 'Erro na execução'}
                            descricao={
                                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'Consolas, monospace', fontSize: 13 }}>
                                    {_.get(resultadoSaida, 'mensagem')}
                                </pre>
                            }
                            tipo={_.get(resultadoSaida, 'sucesso') ? 'success' : 'error'}
                        />
                    </div>
                )}
            </Cartao>
        </div>
    );
}
