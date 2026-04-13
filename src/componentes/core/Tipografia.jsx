import { Typography } from 'antd';

const { Text, Title, Paragraph } = Typography;

export function Texto({ children, tipo, forte, estilo }) {
    return <Text type={tipo} strong={forte} style={estilo}>{children}</Text>;
}

export function Titulo({ children, nivel, estilo }) {
    return <Title level={nivel} style={estilo}>{children}</Title>;
}

export function Paragrafo({ children, estilo }) {
    return <Paragraph style={estilo}>{children}</Paragraph>;
}
