import { Input } from 'antd';

export function EntradaTexto({ valor, aoMudar, espacoReservado, iconePrefixo, estilo }) {
    return (
        <Input 
            value={valor}
            onChange={aoMudar}
            placeholder={espacoReservado}
            prefix={iconePrefixo}
            style={estilo}
        />
    );
}
