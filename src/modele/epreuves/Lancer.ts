import {Epreuve} from './Epreuve';
import {TypeEpreuve} from './TypeEpreuve';

export class Lancer extends Epreuve {

    constructor(nom:string) {
        super(nom, "mètres", TypeEpreuve.Lancer);
    }
} 