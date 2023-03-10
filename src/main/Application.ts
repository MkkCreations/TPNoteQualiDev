import {Decathlon} from '../modele/Decathlon'
import { Heptathlon } from '../modele/Heptathlon';
import {Menu} from '../controleur/Menu';
import { FileAthleteDAO } from '../dao/FileAthleteDAO';
import { FileEpreuveDAO } from '../dao/FileEpreuveDAO';
import { FileResultatDAO } from '../dao/FileResultatDAO';
import readlineSync from 'readline-sync';

let quitter: boolean = true;
let choix: number = 0;
do {
    

    do {
        choix = Number(readlineSync.question("Quelle compétition voulez-vous gérer (1=décathlon ou 2=heptathlon ; 0 pour quitter) ?"))
    } while (choix < 0 || choix > 2);

    if (choix === 0) quitter!;

    if (quitter === true){
        let competition;
        let dossier: string;
        if (choix === 1) {
            competition = new Decathlon("Décastar Talence", new Date(2022, 8, 17), new Date(2022, 8, 18))
            FileEpreuveDAO.completeEpreuvesCompetition('decathlon', competition.getEpreuves());
            dossier="talence2022";
        } else{
            competition = new Heptathlon("Eugene 2022", new Date(2022, 7, 23), new Date(2022, 7, 24));
            FileEpreuveDAO.completeEpreuvesCompetition('heptathlon', competition.getEpreuves());
            dossier="eugene2022";
        }
        
        competition.athletes = FileAthleteDAO.chargeAthletes(dossier);
        
        competition.resultats = FileResultatDAO.chargeResultats(dossier, competition.athletes, competition.getEpreuves());
        
        Menu.gestionCompetition(competition);
        
        FileResultatDAO.sauveResultats(dossier, competition.resultats);
    }
} while (quitter!);
