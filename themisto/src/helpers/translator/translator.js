import * as en from './languages/en.i18n.properties.json';
import * as es from './languages/es.i18n.properties.json';

class Translator {
    
    constructor(){
        this.availables = {
            es: es.default,
            en: en.default
        };
        this.enabled = en.default;
    }

    make = (locale) => { this.enabled = this.availables[locale]; }

    translate = (text, args = {}) => {
        let response = this.enabled[text] || text;
        let vars = Object.keys(args);
        vars.map((i) => response = response.replace('{' + i + '}', args[i]));
        return response;
    }
}

export default new Translator();
