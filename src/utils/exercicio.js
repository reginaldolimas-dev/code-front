import _ from 'lodash';

export const obterCorDificuldade = (dificuldade) => {
    switch (_.toLower(dificuldade)) {
        case 'fácil':
        case 'facil':
            return 'green';
        case 'médio':
        case 'medio':
            return 'orange';
        case 'difícil':
        case 'dificil':
            return 'red';
        default:
            return 'default';
    }
};

export const filtrarExercicios = (exercicios, termoBusca) => {
    if (_.isEmpty(termoBusca)) return exercicios;

    const termo = _.toLower(termoBusca);
    return _.filter(exercicios, (ex) => 
        _.includes(_.toLower(ex.title), termo) || 
        _.some(ex.tags, (tag) => _.includes(_.toLower(tag), termo))
    );
};

export const extrairResultadoExecucao = (resultado, totalTestes) => {
    let mensagemSaida = '';
    let sucesso = true;

    if (_.has(resultado, 'run')) {
        mensagemSaida = _.get(resultado, 'run.output', '');
        if (!_.isEmpty(_.get(resultado, 'run.stderr', ''))) {
            sucesso = false;
        }
    } else if (!_.isUndefined(_.get(resultado, 'output'))) {
        mensagemSaida = _.get(resultado, 'output');
    } else if (!_.isUndefined(_.get(resultado, 'message'))) {
        mensagemSaida = _.get(resultado, 'message');
    } else {
        mensagemSaida = JSON.stringify(resultado, null, 2);
    }

    return {
        sucesso,
        mensagem: mensagemSaida,
        testesPassados: 0,
        totalTestes: totalTestes || 0
    };
};
