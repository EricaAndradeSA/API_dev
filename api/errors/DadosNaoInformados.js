class DadosNaoInformados extends Error {
    constructor(){
        super('Dados não informados');
        this.name = 'DadosNaoInformados';
        this.idError = 2;
    }
}

module.exports = DadosNaoInformados;