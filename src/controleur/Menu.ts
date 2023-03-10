import readlineSync from 'readline-sync';
import { LigneClassement } from '../modele/resultats/LigneClassement';
import { Resultat } from '../modele/resultats/Resultat';
import { TypeEpreuve } from '../modele/epreuves/TypeEpreuve';
import { TypeAthlon } from '../modele/TypeAthlon';

export class Menu {

    public static gestionCompetition(competition: TypeAthlon): void {

        console.log(competition.toString());
        
        Menu.afficheClassements(competition);

        let quitter = false;
        do {

            let jour;
            do {
                jour = readlineSync.questionInt("Quel jour voulez-vous gérer (1 ou 2 ; 0 pour quitter) ? ");
            } while (jour < 0 || jour > 2);

            quitter = (jour === 0);
            if (!quitter) {
                console.log("Voici les épreuves de ce jour");
                console.log(competition.epreuvesToString(jour));
                const nbEpreuves = competition.getNbEpreuves(jour);
                let noEpreuve;
                do {
                    noEpreuve = readlineSync.questionInt("Quelle épreuve voulez-vous gérer ? ");
                } while (noEpreuve < 1 || noEpreuve > nbEpreuves);

                const epreuve = competition.getEpreuve(jour, noEpreuve);

                let finEpreuve;
                do {
                    console.log("Gestion du " + epreuve.toString());

                    console.log("Voici la liste des athlètes :");
                    console.log(competition.athletesToString());
                    let noAthlete;
                    do {
                        noAthlete = readlineSync.questionInt("Quel athlète voulez-vous gérer (0 pour sortir) ? ");
                    } while (noAthlete < 0 || noAthlete > competition.athletes.length);

                    finEpreuve = (noAthlete == 0);
                    if (!finEpreuve) {
                        const resultat = readlineSync.questionFloat("Veuillez saisir le résultat en " + epreuve.unite + " : ");
                        try {
                            competition.addResultat(epreuve, competition.athletes[noAthlete - 1], resultat);
                        } catch (err) {
                            if (err instanceof Error) {
                                console.log(err.message);
                            }
                        }
                    }
                } while (!finEpreuve);
                console.log("Voici le classement de cette épreuve : ");
                let resultatEpreuve = competition.getClassement(epreuve);
                console.log(Resultat.tableauToString(resultatEpreuve));

                Menu.afficheClassements(competition);

            }
        } while (!quitter)
    }

    private static afficheClassements(competition: TypeAthlon): void {
        
        console.log("Voici le classement général : ");
        let classement = competition.getClassementGeneral();
        console.log(LigneClassement.classementToString(classement));

        console.log("Les meilleurs sauteurs, lanceurs, coureurs : ");
        // ligne suivante à décommenter pour comprendre la ligne d'après
        //console.log(TypeEpreuve);
        for (const type in Object.keys(TypeEpreuve).filter((item) => Number.isInteger(Number.parseInt(item)))) {
            console.log(TypeEpreuve[type]);

            const lePremier = competition.getMeilleurParType(Number(type));
            if (lePremier.nbPoints > 0) {
                console.log(lePremier.toString());
            } else {
                console.log("Aucune épreuve de ce type n'a encore eu lieu.");
            }
        }

        console.log("Le meilleur français : ");
        console.log(competition.getMeilleurFrancais().toString());

    }
}
