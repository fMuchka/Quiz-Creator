/**
 *  Class representing the quiz
 *  it consists of themes which consist of title and questions
 */
class Quiz{
    constructor(obj){
        this.themeArray = obj.theme;
        this.team = [];
    }

    /**
     * This function creates teams based on given information
     * @param [] information - at the moment just names
     */
    createTeams(information){
        for (let i = 0; i < information.length; i++) {
            this.team[i] = new Team(information[i]);
        }
    }
}