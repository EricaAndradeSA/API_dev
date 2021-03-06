const router = require('express').Router()
const TabelaAgendamento = require('../../agendamentos/TabelaAgendamento');
const Agendamento = require('../../agendamentos/agendamento');
const SerializarAgendamento = require ('../../Serializar').SerializarAgendamento;

router.get('/agendamentos', async (req, resp) => {
    const results = await TabelaAgendamento.listar();
    const serializador = new SerializarAgendamento(
        resp.getHeader('Content-Type'), 
        ['nome_servico', 'status']
    );
    teste = serializador.transformar(results)
    resp.status(200).send(teste);
});

router.post('/agendamentos', async (req, resp, next) => {
    try {
        const reqAgendamento = req.body;
        const agendamento = new Agendamento(reqAgendamento);
        await agendamento.criar()
        const serializador = new SerializarAgendamento(
            resp.getHeader('Content-Type')
        );
        resp.status(201).send(serializador.transformar(agendamento));
    } catch (error) {
        next(error)
    };
});

router.get('/agendamentos/:idAgendamento', async (req, resp, next) => {
    try {
        const id = req.params.idAgendamento;
        const agendamento = new Agendamento({id: id});
        await agendamento.buscar();
        const serializador = new SerializarAgendamento(
            resp.getHeader('Content-Type', 
                ['nome_servico', 'status'])
        );
        resp.status(200).send(serializador.transformar(agendamento));
    } catch (error) {
        next(error)
    };
});

router.delete('/agendamentos/:idAgendamento', async (req, resp, next) => {
    try {
        const id = req.params.idAgendamento;
        const agendamento = new Agendamento({id: id});
        await agendamento.remover();
        resp.status(204).send();
    } catch (error) {
        next(error)
    };
});

router.put('/agendamentos/:idAgendamento', async (req, resp, next) => {
    try {
        const id = req.params.idAgendamento;
        const dadosBody = req.body;
        const dados = Object.assign({}, dadosBody, {id: id})
        const agendamento = new Agendamento(dados);
        await agendamento.atualizar();
        resp.status(204).send();
    } catch (error) {
        next(error);
    };
});

module.exports = router