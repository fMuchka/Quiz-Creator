/**
 * This function is for json load
 */
function loadFile() {
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    

    function onReaderLoad(event){
        let obj = JSON.parse(event.target.result);        
        document.quiz = new Quiz(obj);
        
        createNavigation();
        createQuestionSlide();
    }

    let main_menu = document.getElementById('main-menu');
    let team_menu = document.getElementById('create-team');

    fadeOut(main_menu);
    fadeIn(team_menu);
}
/**
 * This function creates navigation for quiz (themes)
 */
function createNavigation() {
    let themes = document.quiz.themeArray;
    let wrapper = document.getElementById('navigation');
    
    for (let i = 0; i < themes.length; i++) {
        let new_dom = document.createElement('DIV');
        let text = themes[i].title;

        new_dom.innerHTML = "<span>" + text + '</span>';
        new_dom.classList.add('theme-button');
        new_dom.dataset.index = i;

        let question = () => {
            let new_dom = document.createElement('DIV');
            let text = 'Otázky';

            new_dom.innerHTML = "<span>" + text + '</span>';
            new_dom.classList.add('question');
            new_dom.addEventListener("click", () => {
                startTheme();
            });

            return new_dom;
        };

        let answer = () => {
            let new_dom = document.createElement('DIV');
            let text = 'Odpovědi';

            new_dom.innerHTML = "<span>" + text + '</span>';
            new_dom.classList.add('answer');
            new_dom.addEventListener("click", () => {
                startThemeAnswers();
            });
            
            return new_dom;
        };

        new_dom.appendChild(question());
        new_dom.appendChild(answer());
        wrapper.appendChild(new_dom);      
    }
}

/**
 * This function is easy way to control arrow fade
 */
function fadeArrows(type) {
    let next = document.getElementById('next');
    let previous = document.getElementById('previous');

    if (type === "in") {
        fadeIn(next);
        fadeIn(previous);
        
        setTimeout(() => {
            next.style.display = "flex";
            previous.style.display = "flex";
        }, 510);
    }
    if (type === "out") {
        fadeOut(next);
        fadeOut(previous);
    }
}

/**
 * This function is added to navigation theme questions button
 *  using it we start questions of certain theme
 */
function startTheme() {
    let theme = (event.target.nodeName === 'DIV') ? event.target.parentNode : event.target.parentNode.parentNode;
    let navigation = document.getElementById('navigation');

    let selector = "t:" + theme.dataset.index + "; q:0";
    let question = document.querySelectorAll("[data-id='" + selector + "']")[0];
    
    document.quiz.current.selector = selector;
    document.quiz.current.t = parseInt(theme.dataset.index, 10);
    document.quiz.current.q = 0;

    fadeIn(question);
    document.getElementById('quiz-wrapper').style.display = 'grid';
    fadeOut(navigation);

    fadeArrows("in");
}

function startThemeAnswers() {
    let theme = (event.target.nodeName === 'DIV') ? event.target.parentNode : event.target.parentNode.parentNode;
    let navigation = document.getElementById('navigation');

    let selector = "t:" + theme.dataset.index + "; a:0";
    let answer = document.querySelectorAll("[data-id='" + selector + "']")[0];
    
    document.quiz.current.selector = selector;
    document.quiz.current.t = parseInt(theme.dataset.index, 10);
    document.quiz.current.q = 0;

    fadeIn(answer);
    document.getElementById('quiz-wrapper').style.display = 'grid';
    fadeOut(navigation);

    fadeArrows("in");
}

/**
 * This function is added to arrows controling the flow of quiz
 * Allows users to either slide forward or backward
 * @param {int} +1/-1 
 */
function nextQuestion(direction) {
    let current = {theme: document.quiz.current.t,
                    question: document.quiz.current.q
                };

    let new_q = parseInt(current.question, 10) + direction;

    let new_selector = (document.quiz.current.selector.indexOf('a') === -1) ? ('t:' + current.theme + '; ' + 'q:' + new_q) : ('t:' + current.theme + '; ' + 'a:' + new_q);
    let to_hide = document.querySelectorAll("[data-id='" + document.quiz.current.selector + "']")[0];
    let to_show = undefined;

    switch (new_q) {
        case -1:
            // go to theme navigation
             to_show = document.getElementById('navigation');

             fadeArrows('out');
            break;
    
        case (document.quiz.themeArray[current.theme].question.length):
            
            if (new_selector.indexOf('a:'+document.quiz.themeArray[current.theme].question.length) !== -1) { 
                document.getElementsByClassName('theme-button')[current.theme].classList.add('complete');   
                if (current.theme === (document.quiz.themeArray.length - 1)) {
                    // go to quiz results
                    showFinalResults();
                    // fadeOut(to_hide);
                   // fadeArrows('out');
                    break;
                }
                else{
                    // end of answers, go back to navigation
                    to_show = document.getElementById('navigation');
                    fadeArrows('out');
                    break;
                }
            }
            // end of questions, go to answers, change selector and go to default case
            new_q = 0;
            new_selector = 't:' + current.theme + "; " + "a:" + new_q;
    
        default:
            // go forward or backwards
             to_show = document.querySelectorAll("[data-id='" + new_selector + "']")[0];

            document.quiz.current.selector = new_selector;
            document.quiz.current.q = new_q;
            break;
    }

    fadeIn(to_show);
    fadeOut(to_hide);
}

/**
 * This function creates slide for each question 
 */
function createQuestionSlide() {
    let themes = document.quiz.themeArray;
    let wrapper = document.getElementById('quiz-wrapper');

    for (let i = 0; i < themes.length; i++) {
        let questions = themes[i].question;

        for (let j = 0; j < questions.length; j++) {
            let q_slide = document.createElement('DIV');    
            q_slide.dataset.id = 't:' + i + '; q:' + j;
            q_slide.classList.add('question-slide', 'fade-able');

            /**
             * Create possible points for question
             */
            let point_display = () => {
                let new_dom = document.createElement('DIV');
                let text = document.createElement('SPAN');
                let points = document.createElement('DIV');

                new_dom.classList.add('point-display');

                text.innerText = 'otázka č. ' + (j+1);
                points.innerText = 'za ' + questions[j].points + 'b po ' + questions[j].step + 'b';

                new_dom.appendChild(text);
                new_dom.appendChild(points);

                return new_dom;
            }

            /**
             * Create theme title for slide
             */
            let theme_display = () => {
                let new_dom = document.createElement('DIV');
                new_dom.classList.add('theme-display');
                new_dom.innerText = themes[i].title;

                return new_dom;
            }

            /**
             * Create progress bar
             */
            let progress_display = () => {
               /* let new_dom = document.createElement('DIV');
                new_dom.classList.add('progress-bar');
                let progress = document.createElement('PROGRESS');
                progress.value = j+1;
                progress.max = questions.length;

                let current = document.createElement('SPAN');
                current.innerText = j+1;

                let max = document.createElement('SPAN');
                max.innerText = questions.length;

                new_dom.appendChild(current);
                new_dom.appendChild(progress);
                new_dom.appendChild(max);
                */
               let new_dom = document.createElement('UL');
                new_dom.classList.add('progress-bar');
                new_dom.style.gridTemplateColumns = 'repeat('+questions.length+", 1fr)";

                for (let k = 0; k < questions.length; k++) {
                    let li = document.createElement('LI');
                    

                    if (k < j) {
                        li.classList.add('finished');
                    }

                    if (k === j) {
                        li.classList.add('current');
                    }

                    if (k > j) {
                        li.classList.add('remaining');
                    }

                    new_dom.appendChild(li);
                }

                return new_dom;
            }

            /**
             * Create question text
             */
            let text = () => {
                let new_dom = document.createElement('DIV');
                new_dom.classList.add('question-text');
                
                text = questions[j].text;
                new_dom.innerHTML = '<span>' + text + '</span>';

                return new_dom;
            }

            /**
             * Create media (sound, video, image)
             */
            let media = () => {
                let path = questions[j].media.split('.');
                let file_format =  path[path.length-1];
                
                const format = {video: ['mp4', 'webm', 'ogg'],
                                picture: ['jpg', 'png', 'gif'],
                                audio: ['mp3', 'wav']
                            };                

                let new_dom = undefined;
            
                if (format.video.includes(file_format)) {
                    new_dom = document.createElement('VIDEO');  
                    new_dom.controls = true;
                    let source = document.createElement('SOURCE');
                    source.src = questions[j].media;
                    source.type = "video/"+file_format;
                    new_dom.appendChild(source);     
                }

                if (format.picture.includes(file_format)) {
                    new_dom = document.createElement('IMG');
                    new_dom.addEventListener('click', () => {
                        enlargeIMG();
                    })
                }

                if (format.audio.includes(file_format)) {
                    new_dom = document.createElement('AUDIO');
                    new_dom.controls = true;
                    let source = document.createElement('SOURCE');
                    source.src = questions[j].media;
                    source.type = "audio/"+file_format;
                    new_dom.appendChild(source);                  
                }
                
                if (new_dom !== undefined) {
                    new_dom.classList.add('media');
                   
                    if (format.picture.includes(file_format)) {
                        new_dom.src = questions[j].media;
                    }
                    
        
                    return new_dom;    
                }
                else{
                    return undefined;
                }
            }
            
            q_slide.appendChild(theme_display());
            q_slide.appendChild(point_display());
            q_slide.appendChild(progress_display());
            q_slide.appendChild(text());

            let media_check = media();
            if (media_check !== undefined) {
                q_slide.appendChild(media_check);    
            }
            

            wrapper.appendChild(q_slide);
        }
    }
}

/**
 * This function creates answer slides,
 * useful for showin of answers and assigning points
 */
function createAnswerSlide() {
    let themes = document.quiz.themeArray;
    let wrapper = document.getElementById('quiz-wrapper');

    for (let i = 0; i < themes.length; i++) {
        let questions = themes[i].question;

        for (let j = 0; j < questions.length; j++) {
            let q_slide = document.createElement('DIV');    
            q_slide.dataset.id = 't:' + i + '; a:' + j;
            q_slide.classList.add('question-slide', 'fade-able');

            /**
             * Create possible points for question
             */
            let point_display = () => {
                let new_dom = document.createElement('DIV');
                let text = document.createElement('SPAN');
                let points = document.createElement('DIV');

                new_dom.classList.add('point-display');

                text.innerText = 'otázka č. ' + (j+1);
                points.innerText = 'za ' + questions[j].points + 'b po ' + questions[j].step + 'b';

                new_dom.appendChild(text);
                new_dom.appendChild(points);

                return new_dom;
            }

            /**
             * Create theme title for slide
             */
            let theme_display = () => {
                let new_dom = document.createElement('DIV');
                new_dom.classList.add('theme-display');
                new_dom.innerText = themes[i].title;

                return new_dom;
            }

            /**
             * Create progress bar
             */
            let progress_display = () => {
                /* let new_dom = document.createElement('DIV');
                 new_dom.classList.add('progress-bar');
                 let progress = document.createElement('PROGRESS');
                 progress.value = j+1;
                 progress.max = questions.length;
 
                 let current = document.createElement('SPAN');
                 current.innerText = j+1;
 
                 let max = document.createElement('SPAN');
                 max.innerText = questions.length;
 
                 new_dom.appendChild(current);
                 new_dom.appendChild(progress);
                 new_dom.appendChild(max);
                 */
                let new_dom = document.createElement('UL');
                 new_dom.classList.add('progress-bar');
                 new_dom.style.gridTemplateColumns = 'repeat('+questions.length+", 1fr)";
 
                 for (let k = 0; k < questions.length; k++) {
                     let li = document.createElement('LI');
                     
 
                     if (k < j) {
                         li.classList.add('finished');
                     }
 
                     if (k === j) {
                         li.classList.add('current');
                     }
 
                     if (k > j) {
                         li.classList.add('remaining');
                     }
 
                     new_dom.appendChild(li);
                 }
 
                 return new_dom;
             }

            /**
             * Create question text
             */
            let text = () => {
                let new_dom = document.createElement('DIV');
                new_dom.classList.add('question-text');
                
                text = questions[j].text;
                new_dom.innerHTML = '<span>' + text + '</span>';

                return new_dom;
            }

            /**
             * Answer table
             */
            let answerTable = () => {
                let new_dom = document.createElement('DIV');
                new_dom.classList.add('answer-table');
                let team = document.quiz.team;
                
                let answer = document.createElement('SPAN');
                answer.classList.add('answer-text');
                
                text = questions[j].answer;
                answer.innerHTML = '<span>' + text + '</span>';

                new_dom.appendChild(answer);

                for (let k = 0; k < team.length; k++) {
                    let input = document.createElement('INPUT');
                    let label = document.createElement('LABEL');
                    let wrapper = document.createElement('DIV'); 
                    let identity = "inp:q:" + j + "; t:" + i;

                    label.for = identity;
                    label.innerHTML = "<span>" + team[k].name + "</span>";

                    input.type = "number";
                    input.name = identity;
                    input.step = questions[j].step;
                    input.max = questions[j].points;
                    input.min = 0;
                    input.dataset.team = k;
                    
                    wrapper.appendChild(label);
                    wrapper.appendChild(input);

                    new_dom.appendChild(wrapper);
                }

                return new_dom;
            }
            
            q_slide.appendChild(theme_display());
            q_slide.appendChild(point_display());
            q_slide.appendChild(progress_display());
            q_slide.appendChild(text());
            q_slide.appendChild(answerTable());
            

            wrapper.appendChild(q_slide);
        }
    }
}

function showFinalResults() {
    let team = document.quiz.team;
    let results_dom = document.getElementById('final-results');
    let context = document.getElementById('final-results-graphs').getContext('2d');
    let data = {labels: [], // teams
                datasets: [] //array of themes
                };

                /*datasets: [{
                    label: theme.title,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45]
                }]*/

    const colors = ['rgb(234, 32, 39)', 'rgb(0, 98, 102)', 'rgb(27, 20, 100)', 'rgb(6, 82, 221)',
                    'rgb(0, 148, 50)', 'rgb(238, 90, 36)', 'rgb(247, 159, 31)', 'rgb(163, 203, 56)',
                    'rgb(18, 137, 167)', 'rgb(18, 203, 196)', 'rgb(196, 229, 56)', 'rgb(255, 195, 18)',
                    'rgb(237, 76, 103)', 'rgb(253, 167, 223)', 'rgb(181, 52, 113)', 'rgb(111, 30, 81)'
                    ];

    for (let i = 0; i < document.quiz.themeArray.length; i++) {
        let themeDataset = {label: document.quiz.themeArray[i].title,
                            backgroundColor: colors[i],
                            borderColor: 'black',
                            data: []
        };

        for (let j = 0; j < team.length; j++) {    
            themeDataset.data.push(team[j].addThemeScore(i));
        }

        data.datasets.push(themeDataset);
    }

    for (let i = 0; i < team.length; i++) {
        data.labels.push(team[i].name);
    }

    let chart = new Chart(context, {
        type: 'bar',
        data: data,
        options: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontSize: 20
                }
            },

            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {fontSize: 26}
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {fontSize: 26}
                }]
            }
        }
    });

    let to_hide = document.querySelectorAll("[data-id='" + document.quiz.current.selector + "']")[0];
     fadeOut(to_hide);
     fadeArrows('out');
    fadeIn(results_dom);
}

function showNavigation(){
    let to_hide = document.querySelectorAll("[data-id='" + document.quiz.current.selector + "']")[0];
    let navigation = document.getElementById('navigation');
    
    fadeOut(to_hide);
    fadeArrows('out');
    fadeIn(navigation);
}

/**
 * Function for showing DOM elements
 * @param {DOM element} element 
 */
function fadeOut(element) {
    let time = 500; //miliseconds

    setTimeout(() => {
        element.style.opacity = 0;
    }, time/2);

    setTimeout(() => {
        element.style.display = 'none';
    }, time);
}

/**
 *  Function for hiding DOM elements
 * @param {DOM element} element 
 */
function fadeIn(element) {
    let time = 500; //miliseconds

    setTimeout(() => {
        element.style.removeProperty('display');
        element.style.removeProperty('opacity');
    }, time/2);

    setTimeout(() => {
        element.style.display = "grid";    
    }, time);
}

/**
 * Create teams and start the quiz
 */
function createTeam(){
    let menu = document.getElementById('create-team');
    let navigation = document.getElementById('navigation');
    let list = document.getElementById('team-list');
    let nameArray = [];

    for (let i = 0; i < list.childNodes.length; i++) {
        let name = list.childNodes[i].innerText;

        if (name !== undefined && name !== '') {
            nameArray.push(name);   
        }
    }
    
    document.quiz.createTeam(nameArray);
    createAnswerSlide();

    fadeOut(menu);
    fadeIn(navigation);
}

function enlargeIMG() {
    let modal = document.getElementById('enlarge-modal-background');
    modal.childNodes[1].src = event.target.src;

    fadeIn(modal);
    fadeArrows('out');
}

function minimizeIMG() {
    let modal = document.getElementById('enlarge-modal-background');

    fadeOut(modal);
    fadeArrows('in');
}

window.onload = () => {
    document.quiz = null;

    document.addEventListener('click', () => {
        let access = document.getElementById('quick-access');
        let logo = document.getElementById('logo');

        if (event.target === logo) {
            access.style.left = "40px"; 
        }
        else{
            access.style.left = "-160px"; 
        }
        
    })

}