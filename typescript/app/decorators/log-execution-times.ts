export function logExecutionTime(emSegundos: boolean = false){
    return function(target:any, propertyKey:string, descriptor:PropertyDescriptor){
        const metodoOriginal = descriptor.value
        descriptor.value = function(...args: any[]){
            let divisor = 1
            let unidade = 'milisegundos'
            if (emSegundos){
                divisor = 1000
                unidade = 'segundos'
            }
            const t1 = performance.now()
            // usando o descritor o methodo original perde o escopo sendo necessário usar o apply para solucionar o problema
            const retorno = metodoOriginal.apply(this, args)
            const t2 = performance.now()
            console.log(`Tempo de execução ${propertyKey}, tempo de execução: ${(t2-t1)/divisor} ${unidade}`)
            return retorno
        }
        return descriptor
    }
}