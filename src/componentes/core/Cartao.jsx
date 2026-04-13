import { Card } from 'antd';

export function Cartao({ children, hoverable, titulo, descricao, extra, estilo }) {
    if (descricao) {
        return (
            <Card hoverable={hoverable} style={estilo}>
                {children}
                <Card.Meta title={titulo} description={descricao} />
            </Card>
        );
    }

    return (
        <Card hoverable={hoverable} style={estilo} title={titulo} extra={extra}>
            {children}
        </Card>
    );
}
