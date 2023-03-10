import fs from 'fs';
import { Athlete } from '../modele/Athlete';

export class FileAthleteDAO {

    public static chargeAthletes(dossier:string) : Athlete[] {

        let liste : Athlete[] = [];
        const donnees = fs.readFileSync('./src/donnees/'+dossier+'/athletes.txt', 'utf8');

        const lignes = donnees.split('\n');

        for (const ligne of lignes) {
            const infoAthlete = ligne.split(';');
            let athlete = new Athlete(infoAthlete[0], infoAthlete[1], infoAthlete[2], Number.parseInt(infoAthlete[3]));
            liste.push(athlete);
        }
        return liste;
    }
}