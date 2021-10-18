export function escapar(target, propertyKey, descriptor) {
    const methodOriginal = descriptor.value;
    descriptor.value = function (...args) {
        let retorno = methodOriginal.apply(this, args);
        if (typeof retorno) {
            retorno = retorno.replace(/<cript>[\s\S]*?<\/cript>/, '');
        }
        return retorno;
    };
    return descriptor;
}
