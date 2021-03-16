import { Imprimivel } from "./Imprimivel";

export class Negociacao implements Imprimivel {

    readonly data: Date;
    readonly quantidade: number;
    readonly valor: number;

    constructor(data: Date, quantidade: number, valor: number) {

        this.data = data;
        this.quantidade = quantidade;
        this.valor = valor;
    }


    get volume(){
        return this.quantidade * this.valor;
    }

    paraTexto() {
        console.log(`Negociação print: ${JSON.stringify(this)}`)
    }
}