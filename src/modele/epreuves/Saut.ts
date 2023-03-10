import {Epreuve} from './Epreuve';
import {TypeEpreuve} from './TypeEpreuve';

export class Saut extends Epreuve {

    constructor(nom:string) {
        super(nom, "mètres", TypeEpreuve.Saut);
    }
} 