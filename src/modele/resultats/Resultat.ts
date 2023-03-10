import { Athlete } from "../Athlete";
import { Epreuve } from "../epreuves/Epreuve";

export class Resultat {

    private _athlete: Athlete;
    private _epreuve: Epreuve;
    private _resultat: number;
	private _nbPoints: number;

	constructor(a:Athlete, e:Epreuve, valeur:number) {
        this.athlete = a;
        this.epreuve = e;
        this.resultat = valeur;
		this._nbPoints = e.getNbPoints(valeur);
	}

	public get epreuve(): Epreuve {
		return this._epreuve;
	}

	public get athlete(): Athlete {
		return this._athlete;
	}

	public get resultat(): number {
		return this._resultat;
	}

	public get nbPoints(): number {
		return this._nbPoints;
	}

	public set epreuve(valeur:Epreuve) {
		this._epreuve = valeur;
	}

	public set resultat(valeur:number) {
		if (valeur <= 0) {
			throw new Error("Le résultat doit être positif !");
		}

		this._resultat = valeur;
		this._nbPoints = this._epreuve.getNbPoints(valeur);
	}

	public set athlete(valeur:Athlete) {
		this._athlete = valeur;
	}

	public toString(): string {

		return this._resultat + this._epreuve.unite.charAt(0) + " : " + this._nbPoints;
	}

	// pour les classements d'une épreuve
	public static tableauToString(tableau:Resultat[]): string {

		let chaine = "";

		let ordre = 1;
		for (const r of tableau) {
			chaine += ordre + ") " + r._athlete.toString() + " " + r.toString() +"\n";
			ordre++;
		}

		return chaine;
	}
 
}