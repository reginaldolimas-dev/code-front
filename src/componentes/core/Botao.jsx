import { Button } from 'antd';

export function Botao({ children, tipo = 'default', icone, aoClicar, carregando, tamanho, estilo }) {
    return (
        <Button type={tipo} icon={icone} onClick={aoClicar} loading={carregando} size={tamanho} style={estilo}>
            {children}
        </Button>
    );
}
