import { NegotiationController } from "./controllers/negociationController.js";


const controller = new NegotiationController()
const form = document.querySelector('.form')
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault()
        controller.adiciona()
    })
}else{
    throw Error('Form not found')
}