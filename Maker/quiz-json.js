class QuizJSON{

    constructor(context){
        this.theme = [];

        this.formatQuiz(context);
    }

    formatQuiz(obj){
        /*{
            {theme:     {question: {text, media, answer, points, step, extra_info},
                        {question: {text, media, answer, points, step, extra_info},
                        {question: {text, media, answer, points, step, extra_info},
                        {question: {text, media, answer, points, step, extra_info},
                        title: ''
                    },
            {theme:     {question: {text, media, answer, points, step, extra_info},
                        {question: {text, media, answer, points, step, extra_info},
                        {question: {text, media, answer, points, step, extra_info},
                        {question: {text, media, answer, points, step, extra_info},
                        title: ''
                    }
           }
        */
       let theme_counter = 0;

        for (const theme in obj) {
            let save_theme = {};
            save_theme['question'] = [];
            
            if (obj.hasOwnProperty(theme)) {
                
                for (const element in obj[theme]) {
                    if (obj[theme].hasOwnProperty(element)) {
                        // theme title
                        if (element === 'title') {
                            save_theme['title'] = obj[theme][element];
                        }
                        // theme question
                        else{
                            let save_question = {};

                            for (const qElement in obj[theme][element]) {
                                if (obj[theme][element].hasOwnProperty(qElement)) {
                                    if (qElement === 'step' || qElement === 'points') {
                                        save_question[qElement] = parseFloat(obj[theme][element][qElement].value, 10);
                                    }else{
                                        save_question[qElement] = obj[theme][element][qElement].value;  
                                    }
                                }
                            }
                            save_theme['question'].push(save_question);
                        }
                        
                    }
                }
                
            }
            this.theme.push(save_theme);
            theme_counter++;
        }
    }
}