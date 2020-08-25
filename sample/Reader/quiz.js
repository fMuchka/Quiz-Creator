/**
 *  Class representing the quiz
 *  it consists of themes which consist of title and questions
 */
class Quiz{
    constructor(obj){
        this.themeArray = obj.theme;
        this.team = [];
        this.current = {selector: null, t: null, q: null, answerTable: false};    // in format t:n; q:

        this.mediaRef = [];

        this.initMediaRef();
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

    /**
     * Init mediaRef array by declaring new array on n elements
     *  n = number of themes
     */
    initMediaRef() {
        for (let i = 0; i < this.themeArray.length; i++) {
            this.mediaRef[i] = [];
        }
    }

    getThemeMaxPoint(index){
        let theme = this.themeArray[index].question;
        let max = 0;

        for (let i = 0; i < theme.length; i++) {
            max += theme[i].points;    
        }
        
        return max;
    }
}