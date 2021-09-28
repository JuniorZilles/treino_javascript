class ModuloDeImpressao {
    constructor() {
        this._codigo = 10;
    }

    imprime_0(nomes) {
        console.log(this._codigo);
        // this._codigo não é acessado dentro do foreach
        // pois não participa do mesmo contexto
        nomes.forEach(function(nome){
            console.log(`${this._codigo}: ${nome}`);
        });
   }
    imprime_1(nomes) {
        // this._codigo é acessado dentro do foreach
        nomes.forEach((nome) => {
            console.log(`${this._codigo}: ${nome}`);
        });
   }

   imprime_2(nomes) {
       // solução alternativa onde o bind passa o contexto para dentro do foreach
        nomes.forEach(function(nome){
            console.log(`${this._codigo}: ${nome}`);
        }.bind(this));
    };
}

const professores = ['Elias', 'Yuri', 'Gabriel', 'Guilherme', 'Yan'];
const impressao = new ModuloDeImpressao();
impressao.imprime(professores);

// não é necessário declarar o retorno, pois é automático
const soma = (numero1, numero2) => numero1 + numero2; 
soma(3,7) // 10

module.exports = ModuloDeImpressao;