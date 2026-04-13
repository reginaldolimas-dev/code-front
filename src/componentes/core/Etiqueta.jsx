import { Tag } from 'antd';

export function Etiqueta({ cor, estilo, children }) {
    return <Tag color={cor} style={estilo}>{children}</Tag>;
}
