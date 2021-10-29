type Combine = number | string;
type Alowed = 'as-number' | 'as-text';
type Tuple = [number, string];
function add(n1: number, n2: number, testa: boolean, mostra: string, arraystr: string[], tupla: Tuple, combine: Combine, alawoed: Alowed):number {

    return n1 + n2;
}
enum Role { ADMIN, READ_ONLY, AUTHOR }
function createObject() {
    const person = {
        name: 'Junior',
        idade: 26
    };
    console.log(person.name);
}

function addHandle(n1:number, n2:number, cb:(num:number) =>void) {
    const result = n1+n2;
    cb(result);
}
console.log(typeof "data");

addHandle(10,20,(num)=>{
    console.log(num);
})