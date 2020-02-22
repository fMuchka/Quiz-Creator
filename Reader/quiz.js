/**
 *  Class representing the quiz
 *  it consists of themes which consist of title and questions
 */
class Quiz{
    constructor(obj){
        this.themeArray = obj.theme;
        this.team = [];
        this.current = {selector: null, t: null, q: null};    // in format t:n; q:
    }

    /**
     * This function creates teams based on given information
     * @param [] information - at the moment just names
     */
    createTeam(names){
        for (let i = 0; i < names.length; i++) {
            this.team[i] = new Team(names[i], i);
        }
    }
}