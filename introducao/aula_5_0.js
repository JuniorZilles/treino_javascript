console.log("\nTrabalhando com condicionais");

const listaDestinos = new Array("Salvador", "São Paulo", "Rio de Janeiro");

const idadeComprador = 15;
const estaAcompanhada = true;
let temPassagemComprada = false;
const destino = "Rio de Janeiro";

console.log("\nDestinos disponíveis");
console.log(listaDestinos);


if (idadeComprador >= 18 || estaAcompanhada) {
    console.log("Comprador maior de idade ou acompanhado");
    // remove um item da lista
    listaDestinos.splice(1, 1);
    temPassagemComprada = true;
} else {
    console.log("Comprador menor de idade, não acompanhado");
    temPassagemComprada = false;
}

console.log("Embarque: \n\n");
if (idadeComprador>=18 && temPassagemComprada){
    console.log("Boa Viagem");
}else{
    console.log('Não pode embarcar');
}
console.log(listaDestinos);
