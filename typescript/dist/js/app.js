import { NegotiationController } from "./controllers/negociationController.js";
const controller = new NegotiationController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
}
else {
    throw Error('Form not found');
}
const botaoImport = document.querySelector("#botao-importa");
if (botaoImport) {
    botaoImport.addEventListener('click', () => {
        controller.importData();
    });
}
else {
    throw Error('Button import not found');
}
