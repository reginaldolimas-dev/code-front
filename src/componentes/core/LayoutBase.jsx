import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

export function LayoutBase({ children, cabecalho, rodape }) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#001529', display: 'flex', alignItems: 'center' }}>
                {cabecalho}
            </Header>
            <Content style={{ padding: '24px', background: '#f5f5f5' }}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>{rodape}</Footer>
        </Layout>
    );
}
