# Diretrizes do Projeto (Code Front)

Este documento define os padrões arquiteturais, de estilo e as boas práticas que devem ser rigorosamente seguidos ao desenvolver ou dar manutenção neste projeto. Ele serve como um guia para desenvolvedores e agentes de IA (como o GitHub Copilot, Cursor, ou assistentes integrados).

## 1. Idioma e Nomenclatura
- **Português (pt-BR):** Todos os nomes de variáveis, funções, componentes, props, métodos e arquivos devem ser escritos em português claro e semântico (ex: `lidarComExecucao`, `carregando`, `definirCarregando`, `Botao`).
- **Exceções:** Bibliotecas externas (ex: `useEffect`, `useState`, `lodash`) e propriedades exigidas por essas bibliotecas (ex: `id`, métodos HTTP) mantêm seus nomes originais. No entanto, o código que as encapsula deve ser em português.

## 2. Encapsulamento de UI (Design System)
- **Não utilize bibliotecas de UI diretamente (ex: Ant Design) nas páginas ou lógicas de negócio.**
- Sempre crie ou utilize componentes genéricos/core (localizados em `src/componentes/core/`) que encapsulam o comportamento e o estilo da biblioteca de UI subjacente.
- Isso garante que a biblioteca de UI possa ser trocada no futuro sem impacto nas páginas do projeto.
- **Exemplo:** Em vez de usar `<Button>` do Ant Design diretamente, importe e use `<Botao>` do diretório `core`.

## 3. Manipulação e Validação de Dados
- **Uso do Lodash:** Priorize o uso da biblioteca `lodash` (importada como `_`) para validações, verificações de nulidade, manipulação de arrays e objetos.
- **Exemplos de uso:**
  - Em vez de `if (array && array.length > 0)`, use `if (!_.isEmpty(array))`.
  - Em vez de `objeto.propriedade?.subpropriedade`, use `_.get(objeto, 'propriedade.subpropriedade')`.
  - Use `_.trim()`, `_.toInteger()`, `_.find()`, `_.filter()`, `_.map()`, etc.

## 4. Separação de Responsabilidades (Clean Code)
- **Componentes Focados:** Componentes React devem focar estritamente na renderização da interface e delegação de eventos.
- **Isolamento de Lógica de Negócio:** Sempre que possível, extraia a lógica de negócio, transformações de dados e regras complexas para funções utilitárias isoladas no diretório `src/utils/`.
- **Exemplo:** Funções para calcular cores de tags com base na dificuldade (`obterCorDificuldade`) ou fazer o parse de retornos complexos de APIs (`extrairResultadoExecucao`) devem morar fora do componente React.

## 5. Boas Práticas e Organização
- **Reutilização:** Antes de criar um novo componente ou função, verifique se não existe um similar na pasta `core` ou `utils`.
- **Tratamento de Erros:** Sempre implemente blocos `try/catch` em operações assíncronas (como `fetch`), com tratamento adequado e feedback visual amigável para o usuário (usando o componente de `Mensagem` ou `Alerta`).
- **Clean Code:** Mantenha os arquivos pequenos e focados em uma única responsabilidade. Funções não devem ter múltiplas responsabilidades.

## 6. Estrutura de Diretórios
- `src/componentes/core/`: Componentes base reutilizáveis, agnósticos de regra de negócio, que abstraem bibliotecas externas.
- `src/componentes/`: Componentes compostos ou específicos de domínio (ex: `CodeEditor`).
- `src/paginas/`: Views principais do roteamento (ex: `Home`, `ExercisePage`).
- `src/utils/`: Funções utilitárias puras e lógica de negócio.