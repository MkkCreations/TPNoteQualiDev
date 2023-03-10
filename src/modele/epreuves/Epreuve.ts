import { Bareme } from "../resultats/Bareme";
import {TypeEpreuve} from './TypeEpreuve';

export abstract class Epreuve {

    private _nom : string;
    private _unite : string;
    private _record : number;
	private _bareme : Bareme;
	private _type : TypeEpreuve;

    protected constructor(nom:string, unite:string, type:TypeEpreuve) {
        this.nom = nom;
        this.unite = unite;
		this._type = type;
    }

    public get nom(): string {
		return this._nom;
	}

	public get unite(): string {
		return this._unite;
	}

	public get record(): number {
		return this._record;
	}

	public get bareme(): Bareme {
		return this._bareme;
	}

	public get type(): TypeEpreuve {
		return this._type;
	}

	public set nom(valeur: string) {
		this._nom = valeur;
	}

	public set unite(valeur: string) {
		this._unite = valeur;
	}

	public set record(valeur: number) {
		this._record = valeur;
	}
 
	public set bareme(valeur: Bareme) {
		this._bareme = valeur;
	}
 
	public getNbPoints(resultat: number): number {

		return this._bareme.getNbPoints(resultat); 
	}

	public equals(e: Epreuve): boolean {

		return this.nom === e.nom;
	}

	public toString(): string {
		return this._nom;
	}
}