import {Epreuve} from './Epreuve';
import {TypeEpreuve} from './TypeEpreuve';

export class Course extends Epreuve {

    constructor(nom:string) {
        super(nom, "secondes", TypeEpreuve.Course);
    }
} 