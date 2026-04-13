import { Spin } from 'antd';

export function Carregamento({ tamanho = 'large', estilo, texto }) {
    return <Spin size={tamanho} style={estilo} tip={texto} />;
}
