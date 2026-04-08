import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, Card, Tag, Spin, Input, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { Text } = Typography

export default function Home() {
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch('/exercises.json')
            .then(res => res.json())
            .then(data => {
                setExercises(data)
                setLoading(false)
            })
    }, [])

    const filtered = exercises.filter(ex =>
        ex.title.toLowerCase().includes(search.toLowerCase()) ||
        ex.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    )

    if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Input
                placeholder="Buscar por título ou tag (ex: for, lista, fácil)"
                prefix={<SearchOutlined />}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: 24, maxWidth: 400 }}
            />
            <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
                dataSource={filtered}
                renderItem={ex => (
                    <List.Item>
                        <Link to={`/exercise/${ex.id}`} style={{ width: '100%', textDecoration: 'none' }}>
                            <Card hoverable>
                                <Tag color={ex.difficulty === 'Fácil' ? 'green' : ex.difficulty === 'Médio' ? 'orange' : 'red'}>
                                    {ex.difficulty}
                                </Tag>
                                <Card.Meta
                                    title={ex.title}
                                    description={
                                        <div style={{ marginTop: 8 }}>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                {ex.tags.join(' • ')}
                                            </Text>
                                        </div>
                                    }
                                />
                            </Card>
                        </Link>
                    </List.Item>
                )}
            />
        </div>
    )
}