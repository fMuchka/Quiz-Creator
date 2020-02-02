/**
 * This class represents teams who take the quiz
 * it tracks their names and scores
 */
class Team{
    constructor(information){
        this.name = information.name;
        this.points = 0;
    }

    /**
     * This function adds points to team
     * @param integer n 
     */
    addPoints(n){
        this.points += n;
    }
}