console.log("\nTrabalhando com condicionais");

const listaDestinos = new Array("Salvador", "São Paulo", "Rio de Janeiro");

const idadeComprador = 15;
const estaAcompanhada = true;
let temPassagemComprada = false;
const destino = "Rio de Janeiro";

console.log("\nDestinos disponíveis");
console.log(listaDestinos);


const podeComprar = idadeComprador >= 18 || estaAcompanhada;

let contador = 0;
let destinoExiste = false;
while(contador < 3){
    if(listaDestinos[contador] == destino){
        destinoExiste = true;
        break;
    }
    contador += 1;
}

console.log("Destino existe:", destinoExiste);

if(podeComprar && destinoExiste){
    console.log("Boa Viagem");
}

for(let i = 0; i < 3; i++){
    if(listaDestinos[i] == destino){
        destinoExiste = true;
    }
}