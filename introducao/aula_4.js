console.log("Trabalhando com condicionais");

const listaDestinos = new Array("Salvador", "São Paulo", "Rio de Janeiro");

const idadeComprador = 15;
const estaAcompanhada = true;
const temPassagemComprada = true;
console.log("Destinos disponíveis");
console.log(listaDestinos);


if (idadeComprador >= 18 || estaAcompanhada) {
    console.log("Comprador maior de idade ou acompanhado");
    // remove um item da lista
    listaDestinos.splice(1, 1);
} else {
    console.log("Comprador menor de idade, não acompanhado");
}

console.log("Embarque: \n\n");
if (idadeComprador>=18 && temPassagemComprada){
    console.log("Boa Viagem");
}else{
    console.log('Não pode embarcar');
}
console.log(listaDestinos);
