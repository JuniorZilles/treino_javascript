export class Negociation {
    constructor(_date, quantity, value) {
        this._date = _date;
        this.quantity = quantity;
        this.value = value;
    }
    get data() {
        const date = new Date(this._date.getTime());
        return date;
    }
    get volume() {
        return this.quantity * this.value;
    }
    static criaDe(dateString, quantityNumber, valueNumber) {
        const exp = /-/g;
        const date = new Date(dateString.replace(exp, ''));
        return new Negociation(date, quantityNumber, valueNumber);
    }
}
