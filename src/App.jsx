import { BrowserRouter as Roteador, Routes as Rotas, Route as Rota } from 'react-router-dom';
import Inicio from "./paginas/Home.jsx";
import PaginaExercicio from "./paginas/ExercisePage.jsx";
import { LayoutBase } from './componentes/core/LayoutBase.jsx';
import { Titulo } from './componentes/core/Tipografia.jsx';

function App() {
    return (
        <Roteador>
            <LayoutBase
                cabecalho={
                    <Titulo nivel={4} estilo={{ color: '#fff', margin: 0 }}>
                        🧠 Java Logic Trainer
                    </Titulo>
                }
                rodape="Java Logic Trainer ©2026"
            >
                <Rotas>
                    <Rota path="/" element={<Inicio />} />
                    <Rota path="/exercise/:id" element={<PaginaExercicio />} />
                </Rotas>
            </LayoutBase>
        </Roteador>
    );
}

export default App;
