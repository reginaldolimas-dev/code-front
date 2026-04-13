import Editor from '@monaco-editor/react';
import { Carregamento } from './core/Carregamento.jsx';

export function CodeEditor({ codigo, aoMudar, linguagem = 'java', tema = 'vs-dark', altura = '400px' }) {
    return (
        <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
            <Editor
                height={altura}
                defaultLanguage={linguagem}
                theme={tema}
                value={codigo}
                onChange={(valor) => aoMudar(valor ?? '')}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                    tabSize: 4,
                    insertSpaces: true,
                    bracketPairColorization: { enabled: true },
                    formatOnPaste: true,
                    formatOnType: true
                }}
                loading={
                    <div style={{ padding: '20px', textAlign: 'center', background: '#1e1e1e', color: '#888' }}>
                        <Carregamento texto="Carregando editor profissional..." />
                    </div>
                }
            />
        </div>
    );
}
