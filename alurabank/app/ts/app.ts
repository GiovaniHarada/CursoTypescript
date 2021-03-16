import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

const form: HTMLFormElement = <HTMLFormElement>document.querySelector('.form');
const btnImportar: HTMLFormElement = <HTMLFormElement>document.querySelector('#btnImportar');
if (form) {
    form.addEventListener('submit', controller.adiciona.bind(controller));    
}
if (btnImportar) {
    btnImportar.addEventListener('click', controller.importaDados.bind(controller));
}