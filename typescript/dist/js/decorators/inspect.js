export function inspect() {
    return function (target, propertyKey, descriptor) {
        const methodOriginal = descriptor.value;
        descriptor.value = function (...args) {
            console.log(`--- Método ${propertyKey}`);
            console.log(`----- parâmetros ${JSON.stringify(args)}`);
            const retorno = methodOriginal.apply(this, args);
            console.log(`----- retorno ${JSON.stringify(retorno)}`);
            return retorno;
        };
        return descriptor;
    };
}
