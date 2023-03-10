export class Athlete {

    private _nom: string;
    private _prenom: string;
    private _nationalite: string;
    private _dossard: number;

	constructor(nom:string, prenom:string, nationalite:string, dossard:number) {
        this.nom=nom;
        this.prenom=prenom;
        this.nationalite=nationalite;
        this.dossard=dossard;
	}

    public get nationalite(): string {
        return this._nationalite;
    }
    public set nationalite(value:string) {

        if (value.trim().length!==3) {
            throw new Error("La nationalité doit comporter 3 caractères !");
        }
        this._nationalite = value.toUpperCase();
    }

    public get nom(): string {
        return this._nom;
    }
    public set nom(value:string) {

        if (value.trim().length < 2) {
            throw new Error("Le nom doit comporter au moins 2 caractères !");
        }
        this._nom = value.toUpperCase();
    }

    public get prenom(): string {
        return this._prenom;
    }
    
    public set prenom(value:string) {
        if (value.trim().length < 2) {
            throw new Error("Le prénom doit comporter au moins 2 caractères !");
        }

        this._prenom = value.charAt(0).toUpperCase()+ value.substring(1).toLowerCase();
        const tabPrenomsComposes = this._prenom.split("-");
        for (let p=0; p < tabPrenomsComposes.length; p++) {
            tabPrenomsComposes[p] = tabPrenomsComposes[p].charAt(0).toUpperCase() + tabPrenomsComposes[p].substring(1); 
        }
        this._prenom = tabPrenomsComposes.join("-");
    }

    public get dossard(): number {
        return this._dossard;
    }
 
    public set dossard(value:number) {

        if (!Number.isInteger(value) || value <= 0) {
            throw new Error("Le n° de dossard doit être entier et positif !")
        }
        this._dossard = value;
    }

    public equals(a:Athlete) : boolean {
        return this._dossard === a._dossard;
    }

    public toString() : string {

        return this._nom + " " + this._prenom + " (" + this._nationalite + ")" + ", n°" + this._dossard;
    }
}