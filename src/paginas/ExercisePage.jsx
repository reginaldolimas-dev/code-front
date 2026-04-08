import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Typography, Card, Tag, Button, Alert, Spin, message } from 'antd'
import { ArrowLeftOutlined, PlayCircleOutlined } from '@ant-design/icons'
import Editor from '@monaco-editor/react' // 🆕 Editor profissional

const { Title, Paragraph, Text } = Typography

export default function ExercisePage() {
    const { id } = useParams()
    const [exercise, setExercise] = useState(null)
    const [loading, setLoading] = useState(true)
    const [code, setCode] = useState('')
    const [output, setOutput] = useState(null)
    const [running, setRunning] = useState(false)

    useEffect(() => {
        fetch('/exercicios.json')
            .then(res => res.json())
            .then(data => {
                const found = data.find(ex => ex.id === parseInt(id))
                setExercise(found)
                setCode(found?.starterCode || '')
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
                message.error('Erro ao carregar exercícios')
            })
    }, [id])

    const handleRun = () => {
        if (!code.trim()) return message.warning('Digite algum código antes de executar')

        setRunning(true)
        setOutput(null)

        // 🔌 PLACEHOLDER: Substitua por chamada real ao Judge0/Backend
        setTimeout(() => {
            setOutput({
                success: true,
                message: `✅ Compilação simulada!\nEntrada: ${exercise.inputExample}\nSaída esperada: ${exercise.expectedOutput}\n\n🔜 Integração com compilador real em breve.`,
                testsPassed: exercise?.tests.length || 0,
                totalTests: exercise?.tests.length || 0
            })
            setRunning(false)
            message.success('Código enviado para validação!')
        }, 1200)
    }

    if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
    if (!exercise) return <Alert message="Exercício não encontrado" type="error" showIcon />

    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 16, color: '#1677ff' }}>
                <ArrowLeftOutlined /> Voltar para lista
            </Link>

            <Card>
                <Tag color={exercise.difficulty === 'Fácil' ? 'green' : exercise.difficulty === 'Médio' ? 'orange' : 'red'} style={{ marginBottom: 8 }}>
                    {exercise.difficulty}
                </Tag>
                <Title level={3} style={{ marginTop: 0 }}>{exercise.title}</Title>
                <Paragraph>{exercise.description}</Paragraph>

                <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 8, marginBottom: 20, border: '1px solid #eee' }}>
                    <Text strong>📥 Entrada de exemplo:</Text> <code style={{ marginLeft: 8 }}>{exercise.inputExample}</code><br/>
                    <Text strong>📤 Saída esperada:</Text> <code style={{ marginLeft: 8 }}>{exercise.expectedOutput}</code>
                </div>

                <Title level={5} style={{ marginBottom: 8 }}>Seu Código</Title>
                <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                    <Editor
                        height="400px"
                        defaultLanguage="java"
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value ?? '')}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            wordWrap: 'on',
                            tabSize: 4,
                            insertSpaces: true,
                            bracketPairColorization: { enabled: true },
                            formatOnPaste: true,
                            formatOnType: true
                        }}
                        loading={
                            <div style={{ padding: '20px', textAlign: 'center', background: '#1e1e1e', color: '#888' }}>
                                <Spin tip="Carregando editor profissional..." />
                            </div>
                        }
                    />
                </div>

                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Button type="primary" icon={<PlayCircleOutlined />} onClick={handleRun} loading={running} size="large">
                        Executar Código
                    </Button>
                    <Text type="secondary">💡 Dica: Cole apenas a classe/método solicitada. O sistema injetará os testes automaticamente.</Text>
                </div>

                {output && (
                    <Alert
                        message={output.success ? `✅ ${output.testsPassed}/${output.totalTests} testes passaram` : '❌ Erro na execução'}
                        description={<pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'Consolas, monospace', fontSize: 13 }}>{output.message}</pre>}
                        type={output.success ? 'success' : 'error'}
                        showIcon
                        style={{ marginTop: 16 }}
                    />
                )}
            </Card>
        </div>
    )
}