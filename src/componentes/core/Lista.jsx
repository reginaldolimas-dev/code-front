import { List } from 'antd';

export function Lista({ grade, fonteDados, renderizarItem }) {
    return (
        <List
            grid={grade}
            dataSource={fonteDados}
            renderItem={renderizarItem}
        />
    );
}
