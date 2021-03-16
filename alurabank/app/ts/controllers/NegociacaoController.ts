import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { ClassInstanceNotifier, domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/NegociacaoService';


@ClassInstanceNotifier()
export class NegociacaoController {
    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _negociacaoService = new NegociacaoService()

    constructor() {
        // this._inputData = <HTMLInputElement>document.querySelector('#data');
        // this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade');
        // this._inputValor = <HTMLInputElement>document.querySelector('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona() {

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo) {
            this._mensagemView.update("Somente negociações em dia util");
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');

    }

    @throttle()
    async importaDados() {

        function isOk(res: Response) {
            if (res.ok)
                return res;
            else
                throw new Error(res.statusText);
        }

        const negociacoes = await this._negociacaoService.obterNegociacoes(isOk);

        negociacoes.forEach(element => {
            this._negociacoes.adiciona(element);
        })
        this._negociacoesView.update(this._negociacoes);

    }
}
enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}
