const ModeloTabelaAgendamento = require('../agendamentos/modelTabelaAgendamentos')

ModeloTabelaAgendamento.sync()
.then(()=>{
    console.log("Tabela criada com sucesso")
})
.catch(()=>{
    console.log('erro, tabela não criada')
});