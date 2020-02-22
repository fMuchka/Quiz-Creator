/**
 * This class represents teams who take the quiz
 * it tracks their names and scores
 */
class Team{
    constructor(name, index){
        this.name = name;
        this.points = 0;
        this.arrayPosition = index;

        this.themeScore = {};
    }

    /**
     * This function adds points to team
     * @param integer n 
     */
    addPoints(n){
        this.points += n;
    }

    addThemeScore(themeIndex){
        return this.themeScore[themeIndex] = this.getInputScore(themeIndex);
    }

    getInputScore(themeIndex){
        let questionSelectorCap = document.quiz.themeArray[themeIndex].question.length;
        let qSelector = 0;
        let selector = '';
        let themeScore = 0;

        while(qSelector < questionSelectorCap){
            selector = 'inp:q:' + qSelector + '; t:' + themeIndex;

            let input = document.getElementsByName(selector);
            
            for (let i = 0; i < input.length; i++) {
                if (parseInt(input[i].dataset.team, 10) === this.arrayPosition) {
                    let value = (input[i].value.indexOf('.') !== -1) ? parseFloat(input[i].value) : parseInt(input[i].value, 10);
                    if (value === undefined || isNaN(value)) {
                        value = 0;
                    }
                     this.addPoints(value);
                     themeScore += value;
                }
            }
            qSelector++;
        }
        return themeScore;
    }

}