import { Course } from './epreuves/Course';
import { Saut } from './epreuves/Saut';
import { Lancer } from './epreuves/Lancer';
import { TypeAthlon } from './TypeAthlon';

export class Decathlon extends TypeAthlon {

    public constructor(nom:string, debut:Date, fin:Date) {
        super(nom, debut, fin)
        this.setEpreuves();
    }

    public set nom(nom:string) {
        
        if (nom.trim().length===0) {
            throw Error("Le nom du décathlon ne peut pas être vide !");
        }
        this._nom = nom;
    }

    protected setEpreuves() : void {

        this._epreuvesJours = [];
        this._epreuvesJours[0] = [];
        this._epreuvesJours[0][0] = new Course("100m");
        this._epreuvesJours[0][1] = new Saut("Saut en longueur");
        this._epreuvesJours[0][2] = new Lancer("Lancer du poids");
        this._epreuvesJours[0][3] = new Saut("Saut en hauteur");
        this._epreuvesJours[0][4] = new Course("400m");

        this._epreuvesJours[1] = [];
        this._epreuvesJours[1][0] = new Course("110m haies");
        this._epreuvesJours[1][1] = new Lancer("Lancer du disque");
        this._epreuvesJours[1][2] = new Saut("Saut à la perche");
        this._epreuvesJours[1][3] = new Lancer("Lancer du javelot");
        this._epreuvesJours[1][4] = new Course("1500m");
    }




    public toString(): string {
        return "Décathlon " + this._nom + ", du " + this._dateDebut.toLocaleDateString() + " au " + this._dateFin.toLocaleDateString();
    }

}