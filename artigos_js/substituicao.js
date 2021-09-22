// https://www.alura.com.br/artigos/javascript-replace-manipulando-strings-e-regex

// substitui só a primeira ocorrencia
const CPFSemFormatacao = 'cpf é 25684677037'

const CPFFormatado = CPFSemFormatacao.replace('25684677037', '256.846.770-37') 

console.log(CPFFormatado) 

//substitui todas as ocorrências
const frase = 'Frase que começa com um palavra-feia e tem outra palavra-feia no final'

const fraseAtualizada = frase.replace(/palavra-feia/, '********') 
console.log(fraseAtualizada) 


// usando expressões regulares
const cpf = '12345679810'

const cpfFormatado = cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4")

console.log(cpfFormatado)

// forma alternativa
const cpf = '12345679810'

const cpfFormatado = cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, function(matchDaRegex, grupo1, grupo2, grupo3, grupo4) {
  console.log(arguments) // é uma forma de visualizar todos os parâmetros que essa função está recebendo, o numero de grupos pode variar e assim fica fácil de debugar.
  return `${grupo1}.${grupo2}.${grupo3}-${grupo4}`;
})

console.log(cpfFormatado)