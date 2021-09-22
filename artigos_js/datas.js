const hoje = new Date();
// data e hora
console.log( hoje );
// hora no formato UTC (Tempo Universal Coordenado)
console.log( hoje.getUTCHours() );
// hora local
console.log( horas.getHours() );
// data de milisegundos
const horas = new Date(5000000000000);
console.log( horas );
// data passando separado
const horas = new Date(2015,10,1);
console.log( horas );
//data de string
const horas = new Date("2015/10/1");
console.log( horas );