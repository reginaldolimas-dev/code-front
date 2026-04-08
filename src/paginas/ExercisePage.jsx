import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Typography, Card, Tag, Button, Alert, Spin, message } from 'antd'
import { ArrowLeftOutlined, PlayCircleOutlined } from '@ant-design/icons'

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
    }, [id])

    const handleRun = () => {
        setRunning(true)
        setOutput(null)

        // 🔌 PLACEHOLDER: Substitua por chamada real ao Judge0/Backend
        setTimeout(() => {
            setOutput({
                success: true,
                message: `Compilação simulada!\nEntrada: ${exercise.inputExample}\nSaída esperada: ${exercise.expectedOutput}\n\n✅ Integração com compilador real em breve.`,
                testsPassed: exercise?.tests.length || 0,
                totalTests: exercise?.tests.length || 0
            })
            setRunning(false)
            message.success('Código enviado!')
        }, 1200)
    }

    if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
    if (!exercise) return <Alert message="Exercício não encontrado" type="error" showIcon />

    return (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 16, color: '#1677ff' }}>
                <ArrowLeftOutlined /> Voltar para lista
            </Link>

            <Card>
                <Tag color={exercise.difficulty === 'Fácil' ? 'green' : exercise.difficulty === 'Médio' ? 'orange' : 'red'} style={{ marginBottom: 8 }}>
                    {exercise.difficulty}
                </Tag>
                <Title level={3}>{exercise.title}</Title>
                <Paragraph>{exercise.description}</Paragraph>

                <div style={{ background: '#f9f9f9', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                    <Text strong>Entrada de exemplo:</Text> <code>{exercise.inputExample}</code><br/>
                    <Text strong>Saída esperada:</Text> <code>{exercise.expectedOutput}</code>
                </div>

                <Title level={5}>Seu Código</Title>
                <textarea
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    style={{
                        width: '100%',
                        height: 300,
                        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                        fontSize: 14,
                        padding: 12,
                        border: '1px solid #d9d9d9',
                        borderRadius: 6,
                        resize: 'vertical',
                        background: '#1e1e1e',
                        color: '#d4d4d4',
                        outline: 'none'
                    }}
                />

                <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Button type="primary" icon={<PlayCircleOutlined />} onClick={handleRun} loading={running}>
                        Executar Código
                    </Button>
                    <Text type="secondary">Dica: Cole apenas o método/classe solicitada.</Text>
                </div>

                {output && (
                    <Alert
                        message={output.success ? `✅ ${output.testsPassed}/${output.totalTests} testes passaram` : '❌ Erro na execução'}
                        description={<pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{output.message}</pre>}
                        type={output.success ? 'success' : 'error'}
                        showIcon
                        style={{ marginTop: 16 }}
                    />
                )}
            </Card>
        </div>
    )
}