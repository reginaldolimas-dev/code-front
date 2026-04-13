import { message } from 'antd';

export const Mensagem = {
    sucesso: (texto) => message.success(texto),
    erro: (texto) => message.error(texto),
    aviso: (texto) => message.warning(texto),
    info: (texto) => message.info(texto),
};
