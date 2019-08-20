import { number } from "prop-types";


export enum CPFCNPJType
{
    CPF = 1,
        CNPJ = 0
}

export class CPFCNPJValidator{
    
    _regexNondigit: RegExp = /\D/g;
    


    
    _isRepeatingChar(data:string): boolean{

        return data.split('').every((currentChar) => { currentChar === data[0]});
    }

    public RemoveNondigits(field:string):string{
        return field.replace(this._regexNondigit,'');
    }

    public validaCPF(_cpf:string):boolean{

        let cpfNumerico = _cpf.replace(this._regexNondigit,'');
        if(!this._isRepeatingChar(cpfNumerico))
        {
            const mod11 = ( num:number ) => num % 11;

            const toSumOfProducts = ( multiplier:any ) => ( result:any, num:any, i:any ) =>  result + ( num * multiplier-- );

            const getSumOfProducts = ( list:string[], multiplier:number ) => list.reduce( toSumOfProducts(multiplier),0);

            const getValidationDigit = ( multiplier:any ) => ( cpf:string[] ) => getDigit(mod11(getSumOfProducts(cpf, multiplier ) ) );

            const getDigit = ( num:any ) =>   ( num > 1 )  ? 11 - num  : 0;

            let CPF = cpfNumerico.slice(0,9).split('');
            const firstDigit = getValidationDigit(10)(CPF).toString();
            const secondDigit = getValidationDigit(11)(CPF.concat(firstDigit)).toString();

            CPF = CPF.concat(firstDigit);
            CPF = CPF.concat(secondDigit);

            return cpfNumerico === CPF.join('');
            
            console.log("validaCPF");
        }
                
        return false;
    }

    public isCPF(cpf:string):boolean{
        let cpfNumerico = cpf.replace(this._regexNondigit,'');

        if(cpfNumerico.length == 11)
            return true;

        return false;
    }

    public formataCPF(cpf:string):string{
        console.log("FormataCPF");
        let cpfNumerico = cpf.replace(this._regexNondigit,'');
        let cpfFormatado = cpfNumerico.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,'$1.$2.$3-$4');
        
        return cpfFormatado;
    }

    public validaCNPJ(cnpj:string):boolean{
        console.log("validaCNPJ");

        let cnpjNumerico = cnpj.replace(this._regexNondigit,'');
        if(!this._isRepeatingChar(cnpjNumerico))
        {
            // Cáculo de validação
	        let t = cnpjNumerico.length - 2,
                d = cnpjNumerico.substring(t),
                d1 = parseInt(d.charAt(0)),
                d2 = parseInt(d.charAt(1)),
                calc = (x:any) => {
                    let n = cnpjNumerico.substring(0, x),
                        y = x - 7,
                        s = 0,
                        r = 0

                        for (let i = x; i >= 1; i--) {
                            s += parseInt(n.charAt(x - i)) * y--;
                            if (y < 2)
                                y = 9
                        }

                        r = 11 - s % 11
                        return r > 9 ? 0 : r
                }

            let firstDigit = calc(t).toString();
            let secondDigt = calc(t+1).toString();
            let CNPJDigitos = '';
            CNPJDigitos = CNPJDigitos.concat(firstDigit);
            CNPJDigitos = CNPJDigitos.concat(secondDigt);
            
            return cnpjNumerico.substring(12) === CNPJDigitos;
            
        }
        return false;
    }

    public isCNPJ(cnpj:string):boolean{
        let cnpjNumerico = cnpj.replace(this._regexNondigit,'');

        if(cnpjNumerico.length == 14)
            return true;

        return false;
    }

    public formataCNPJ(cnpj:string):string{
        let cnpjNumerico = cnpj.replace(this._regexNondigit,'');
        //88.044.098/0001-20
        let cnpjFormatado = cnpjNumerico.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,'$1.$2.$3/$4.$5');
        
        return cnpjFormatado;
    }
}