import { Athlete } from "../Athlete";

/**
 * classe utilisée pour le classement général 
 * et les classements par type d'épreuve
 */
export class LigneClassement {

    private _athlete: Athlete;
	private _nbPoints: number;

	constructor(a: Athlete, valeur: number) {
        this.athlete = a;
		this._nbPoints = valeur;
	}

	public get athlete(): Athlete {
		return this._athlete;
	}

	public get nbPoints(): number {
		return this._nbPoints;
	}

	public set nbPoints(valeur: number) {
        
		if (valeur < 0) {
			throw new Error("Le nombre de points doit être positif ou nul !");
		}
		this._nbPoints = valeur;
	}

	public set athlete(valeur: Athlete) {
		this._athlete = valeur;
	}

	public toString(): string {

		return this._athlete.toString() + " : " + this._nbPoints;
	}

	// classement général et par type d'épreuve
	public static classementToString(tableau: LigneClassement[]): string {

		let chaine = "";

		let ordre = 1;
		for (const r of tableau) {
			chaine += ordre + ") " + r._athlete.toString() + " : " + r._nbPoints +"\n";
			ordre++;
		}

		return chaine;
	}
 
}