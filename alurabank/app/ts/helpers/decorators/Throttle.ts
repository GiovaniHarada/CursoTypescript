export function throttle(milisegundos: number = 500){

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){

        const meotodoOriginal = descriptor.value;
        let timer = 0;
        descriptor.value = function(...args: any[]) {
            if (event) event.preventDefault();

            clearInterval(timer);
            timer = setTimeout(() => {
                meotodoOriginal.apply(this, args);
            }, milisegundos);

            


        }
        return descriptor;
    }
}