import { Alert } from 'antd';

export function Alerta({ mensagem, descricao, tipo = 'info', mostrarIcone = true, estilo }) {
    return (
        <Alert
            message={mensagem}
            description={descricao}
            type={tipo}
            showIcon={mostrarIcone}
            style={estilo}
        />
    );
}
