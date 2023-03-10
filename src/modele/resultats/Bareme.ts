export class Bareme {

    private _resultats: number[];
    private _nbPoints: number[];
    private _croissant: boolean;

    public constructor(resultats:number[], nbPoints:number[], croissant:boolean) {
        this._resultats = resultats;
        this._nbPoints = nbPoints;
        this._croissant = croissant;
    }

	public set resultats(valeur: number[]) {
		this._resultats = valeur;
	}

	public set nbPoints(valeur: number[]) {
		this._nbPoints = valeur;
	}

    public set croissant(croissant: boolean) {
		this._croissant = croissant;
	}

    public get croissant()  : boolean {
        return this._croissant;
    }

    public getNbPoints(resultat: number): number {

        let score = 0;

        let i;
        let horsTable;
        if (this._croissant) {
            i = 0;
            while (i < this._resultats.length && resultat > this._resultats[i]) {
                i++;
            }
            horsTable=(i===this._resultats.length);
            if (!horsTable) {
                score = this._nbPoints[i];
            }    
        } else {
            i = this._resultats.length - 1;
            while (i >= 0 && resultat > this._resultats[i]) {
                i--;
            }
            horsTable=(i===this._resultats.length - 1);
            if (!horsTable) {
                score = this._nbPoints[i+1];
            }    
        }

        return score;
    }

}