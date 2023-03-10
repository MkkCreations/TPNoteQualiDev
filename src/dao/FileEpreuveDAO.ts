import fs from 'fs';
import { Epreuve } from '../modele/epreuves/Epreuve';
import { Bareme } from '../modele/resultats/Bareme';

export class FileEpreuveDAO {

    public static completeEpreuvesCompetition(dossier: string, epreuves : Epreuve[]) : void {

        const donnees = fs.readFileSync('./src/donnees/'+dossier+'/epreuves.txt', 'utf8');


        const lignes = donnees.split('\n');

        for (const ligne of lignes) {
            const infoEpreuve = ligne.split(';');
            console.log(infoEpreuve, lignes);
            let recherche = epreuves.filter(e=>e.nom===infoEpreuve[0]);
            if (recherche.length===0) {
                throw new Error("l'épreuve " + infoEpreuve[0] + " est inconnue dans cette compétition !");
            }
            const epreuve = recherche[0];
            epreuve.record = Number.parseFloat(infoEpreuve[1]);
            
            const sPoints = infoEpreuve[2].split(',');
            const sScores = infoEpreuve[3].split(',');
            const points = sPoints.map((valeur)=> Number.parseInt(valeur));
            const scores = sScores.map((valeur)=> Number.parseFloat(valeur));
            
            epreuve.bareme = new Bareme(scores, points, scores[0] < scores[1]);
        }

    }
}