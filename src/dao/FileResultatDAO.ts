import fs from 'fs';
import { Athlete } from '../modele/Athlete';
import { Epreuve } from '../modele/epreuves/Epreuve';
import { Resultat } from '../modele/resultats/Resultat';

export class FileResultatDAO {

    public static chargeResultats(dossier: string, athletes: Athlete[], epreuves: Epreuve[]): Resultat[] {

        let liste: Resultat[] = [];
        const donnees = fs.readFileSync('./src/donnees/'+dossier+'/resultats.txt', 'utf8');

        const lignes = donnees.split('\n');

        for (const ligne of lignes) {
            if (ligne.trim().length !== 0) {
                const infoResultat = ligne.split(';');
                const athlete = athletes.filter(item => item.dossard === Number.parseInt(infoResultat[0]))[0];
                const epreuve = epreuves.filter(item => item.nom === infoResultat[1])[0];
                let resultat = new Resultat(athlete, epreuve, Number.parseFloat(infoResultat[2]));
                liste.push(resultat);
            }
        }
        
        return liste;
    }

    public static sauveResultats(dossier: string, resultats: Resultat[]): void {

        let fd = fs.openSync('./src/donnees/'+dossier+'/resultats.txt', 'w');

        for (const resultat of resultats) {
            const ligne = resultat.athlete.dossard + ";" + resultat.epreuve.nom + ";" + resultat.resultat + "\n";
            fs.writeSync(fd, ligne);
        }
        fs.closeSync(fd);
    }
}