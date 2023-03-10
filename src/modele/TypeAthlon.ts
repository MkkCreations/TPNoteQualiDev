import { Athlete } from "./Athlete";
import { Epreuve } from "./epreuves/Epreuve";
import { TypeEpreuve } from "./epreuves/TypeEpreuve";
import { LigneClassement } from "./resultats/LigneClassement";
import { Resultat } from "./resultats/Resultat";


export class TypeAthlon {

    protected _nom: string;
    protected _dateDebut: Date;
    protected _dateFin: Date;
    protected _epreuvesJours: Epreuve[][];
    protected _athletes: Athlete[];
    protected _resultats: Resultat[];

    public constructor(nom:string, debut:Date, fin:Date) {
        this._nom = nom;
        this._dateDebut = debut;
        this._dateFin = fin;
        this._athletes=[];
        this._resultats=[];
    }


    public set dateDebut(_dateDebut:Date) {
        
        this._dateDebut = _dateDebut;
    }

    public set dateFin(_dateFin:Date) {
        
        if (this._dateDebut===undefined) {
            throw Error("La date de fin doit être définie après la date de début !");
        }
        if (_dateFin >= this._dateDebut) {
            this._dateFin = _dateFin;
        } else {
            throw Error("La date de fin ne peut être antérieure à la date de début !");
        }
    }

    public get athletes(): Athlete[] {
        return this._athletes;
    }

    public set athletes(tab:Athlete[]) {
        this._athletes = tab;
    }

    public athletesToString() : string {
        let chaine = "";

        for (let idx=0; idx < this._athletes.length; idx++) {
            chaine += (idx+1) + " : " + this._athletes[idx].toString() + "\n" ;
        }

        return chaine;
    }

    public epreuvesToString(jour:number): string {
        let chaine = "";

        for (let idx=0; idx < this._epreuvesJours[jour-1].length; idx++) {
            chaine += (idx+1) + " : " + this._epreuvesJours[jour-1][idx].nom + " - ";
        }

        return chaine.substring(0, chaine.length-3);
    }

    public getEpreuves(): Epreuve[] {

        return [...this._epreuvesJours[0], ...this._epreuvesJours[1]];
    }

    public getEpreuve(jour:number, numero:number): Epreuve {
        return this._epreuvesJours[jour-1][numero-1];
    }

    public getNbEpreuves(jour:number): number {
        return this._epreuvesJours[jour-1].length;
    }
    
    public set resultats(tab: Resultat[]) {
        this._resultats = tab;
    }

    public get resultats(): Resultat[] {
        return this._resultats;
    } 

    public addResultat(e:Epreuve, a:Athlete, valeur:number): void {
        
        if (this._resultats.filter(res => res.athlete.equals(a) && res.epreuve.equals(e)).length!==0) {
            throw new Error("Un résultat a déjà été saisi pour cet athlète dans cette épreuve !")
        }
        this._resultats.push(new Resultat(a, e, valeur));
    }

    public getClassement(epreuve:Epreuve): Resultat[] {
        
        let resultatsEpreuve = this._resultats.filter(item => item.epreuve.equals(epreuve));

        resultatsEpreuve.sort((r1, r2) => 
                    epreuve.bareme.croissant?
                            r1.resultat - r2.resultat:
                            r2.resultat - r1.resultat);

        return resultatsEpreuve;
    }

    public getClassementGeneral(): LigneClassement[] {
    
        // Recalcul et cumul de tous les 10 classements
        let lesClassements : Resultat[][] = [];
        for (let j=0; j < this._epreuvesJours.length; j++) {
            for (const epreuve of this._epreuvesJours[j]) {
                lesClassements.push(this.getClassement(epreuve));
            }
        }

        return this.cumuleParAthlete(lesClassements);
    }

    public getMeilleurParType(type:TypeEpreuve): LigneClassement {
        
        // Recalcul des classements des sauts/courses/lancers
        let lesClassements : Resultat[][] = [];
        
        for (let j=0; j < this._epreuvesJours.length; j++) {
            const epreuves = this._epreuvesJours[j].filter(valeur=>valeur.type===type);
            for (const epreuve of epreuves) {
                lesClassements.push(this.getClassement(epreuve));
            }
        }

        return this.cumuleParAthlete(lesClassements)[0];
    }

    protected cumuleParAthlete(lesClassements:Resultat[][]): LigneClassement[] {

        let classement : LigneClassement[] = [];

        for (const unAthlete of this._athletes) {
            let nbPoints=0;
            for (const unClassement of lesClassements) {
                let resultats = unClassement.filter(valeur=>valeur.athlete.dossard===unAthlete.dossard);
                if (resultats.length!==0) {
                    nbPoints+=resultats[0].nbPoints;
                }
            }
            classement.push(new LigneClassement(unAthlete, nbPoints));
        }

        classement.sort((c1, c2) => c2.nbPoints - c1.nbPoints);

        return classement;
    }

    public getMeilleurFrancais(): LigneClassement {

        let general = this.getClassementGeneral();
        return general.filter(valeur=>valeur.athlete.nationalite==="FRA")[0];
    }

    public toString(): string {
        return "";
    }


}