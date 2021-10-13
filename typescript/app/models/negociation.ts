export class Negociation {
    // #var bloqueia as alterações externas das variaveis

    // constructor(
    //     private _date: Date, 
    //     private _quantity: number, 
    //     private _value: number) {
    // }
    // usando o construtor dessa forma permite usar o getter sem se preocupar com modificações nas variáveis
    constructor(
        private _date: Date,  
        public readonly quantity: number, 
        public readonly value: number) {
    }

    get data(): Date {
        const date = new Date(this._date.getTime())
        return date
    }

    // get quantity(): number {
    //     return this._quantity
    // }

    // get value(): number {
    //     return this._value
    // }

    get volume(): number {
        return this.quantity * this.value
    }
    // o static diz que a função é função da classe diferente de sem que dai é uma função da instancia
    public static criaDe(dateString:string, quantityNumber:number, valueNumber:number):Negociation{
        const exp = /-/g
        const date = new Date(dateString.replace(exp, ''))
        return new Negociation(
            date,
            quantityNumber,
            valueNumber
        )
    }
}