var quiz = {
    theme_ammount:  null,
    question_ammount:   null,
    
    themes: []
}

var theme_map = {};
var question_map = {};

var visible_question = null;

function ShowCreateMenu() {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            this.page_elements.menus.main.style.opacity = 0;
            this.page_elements.menus.create.style.opacity = 1;
            
        }, 150);
        resolve();
    }).then(() => {
        setTimeout(() => {
            this.page_elements.menus.main.classList.toggle('hidden');
            this.page_elements.menus.create.classList.toggle('hidden');       
        }, 200);
    }).then(() => {
        setTimeout(() => {
            this.page_elements.menus.main.classList.toggle('invisible');
        }, 250)
    });
}

function HideCreateMenu() {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            this.page_elements.menus.create.style.opacity = 0;
        }, 150);
        resolve();
    }).then(() => {
        setTimeout(() => {
            this.page_elements.menus.create.classList.toggle('hidden');
        }, 200);
    }).then(() => {
        setTimeout(() => {
            this.page_elements.menus.create.classList.toggle('invisible');
        }, 250);
    });
}

function ShowQuizMenu() {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            this.page_elements.menus.quiz.style.opacity = 1;
        }, 150);
        resolve();
    }).then(() => {
        setTimeout(() => {
            this.page_elements.menus.quiz.classList.toggle('hidden');
        }, 200);
    });
}

function HideQuizMenu() {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            this.page_elements.menus.quiz.style.opacity = 0;
        }, 150);
        resolve();
    }).then(() => {
        setTimeout(() => {
            this.page_elements.menus.quiz.classList.toggle('hidden');
        }, 200);
    });
}

function ShowThemeInfo(theme) {

    let index = theme.dataset.index;
    let theme_menu = theme_map[index].menu;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            theme_menu.classList.toggle('invisible');
        }, 150);
        resolve();
    }).then(() => {
        setTimeout(() => {
            theme_menu.style.opacity = 1;
        }, 200)
    })

    visible_question = index + ':' + 0;
}

function HideThemeInfo(button) {

    let index = button.dataset.index;
    let theme_menu = theme_map[index].menu;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            theme_menu.style.opacity = 0;
        }, 150);
        resolve();
    }).then(() => {
        setTimeout(() => {  
            theme_menu.classList.toggle('invisible');
        }, 200)
    })
}

function ShowQuestion(index) {
    let current_question_index = visible_question.split(':')[1];
    let current_theme_index = visible_question.split(':')[0];
    let theme = document.getElementsByClassName('theme-menu')[current_theme_index];
    let to_hide = theme.childNodes[parseInt(current_question_index, 10) + 2];
    let to_show = theme.childNodes[parseInt(index, 10) + 2];

    document.querySelectorAll("[data-display_index='" + index + "']")[0].classList.add('selected');
    document.querySelectorAll("[data-display_index='" + current_question_index + "']")[0].classList.remove('selected');

    if (index !== current_question_index) {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                to_hide.style.opacity = 0;
                
            }, 150);
            resolve();
        }).then(() => {
            setTimeout(() => {  
                to_hide.classList.add('invisible');
                to_show.style.opacity = 1;
                to_show.classList.remove('invisible');
            }, 400)
        })
    }

    visible_question = visible_question.replace(':' + current_question_index, ':' + index);
}

function CheckNumberInput() {
    let theme_ammount = this.page_elements.inputs.theme_ammount;
    let question_ammount = this.page_elements.inputs.question_ammount;

    if (theme_ammount.value != 0 && question_ammount.value != 0) {
        this.page_elements.buttons.create_confirm.disabled = false;
    }
    else{
        this.page_elements.buttons.create_confirm.disabled = true;
    }
}

function StartCreation() {
    let theme_ammount = this.page_elements.inputs.theme_ammount;
    let question_ammount = this.page_elements.inputs.question_ammount;

    this.quiz.theme_ammount = parseInt(theme_ammount.value, 10);
    this.quiz.question_ammount = parseInt(question_ammount.value, 10);

    HideCreateMenu();
    ShowQuizMenu();

    FillQuizMenu();
    
}


function FillQuizMenu() {
    AddThemes(this.page_elements.wrappers.themes);

    CreateThemeMenus(this.page_elements.wrappers.theme_menus);
}

function AddThemes(wrapper) {
    for (let i = 0; i < quiz.theme_ammount; i++) {
        let theme = document.createElement('button');
        theme.innerText = 'Unfinished Theme';
        theme.classList.add('theme-button');
        theme.dataset.index = i;

        theme.addEventListener('click', () => {
            HideQuizMenu();
            ShowThemeInfo(theme);
        });

        theme_map[i] = {};    
        theme_map[i]['button'] = theme;

        wrapper.appendChild(theme);
    }
}

function AddQuestions(wrapper, theme_index) {
    question_map[theme_index] = {};

    for (let i = 0; i < quiz.question_ammount; i++) {
        let question = document.createElement('div');
        question.classList.add('question-wrapper');

        if (i > 0) {
            question.classList.add('invisible');
            question.style.opacity = 0;
        }

        wrapper.appendChild(question);

        let question_text = document.createElement('textarea');
        question_text.placeholder = 'Enter Question';
        question_text.classList.add('question');
        question.appendChild(question_text);

        let question_media_path = document.createElement('input');
        question_media_path.placeholder = 'Enter Media Path';
        question_media_path.classList.add('media-path-input');
        question.appendChild(question_media_path);

        let answer_wrapper = document.createElement('div');
        answer_wrapper.classList.add('answer-wrapper');

        let points_input = document.createElement('input');
        points_input.type = "number";
        points_input.name = theme_index + '_' + i;
        points_input.placeholder = "Max Points";
        points_input.classList.add('point-input');
        answer_wrapper.appendChild(points_input);

        let step_input = document.createElement('input');
        step_input.type = "number";
        step_input.placeholder = "Steps";
        step_input.name = theme_index + '_' + i;
        step_input.classList.add('step-input');
        answer_wrapper.appendChild(step_input);

        let question_answer = document.createElement('textarea');
        question_answer.placeholder = 'Enter Answer';
        question_answer.classList.add('answer');

        answer_wrapper.appendChild(question_answer);
        question.appendChild(answer_wrapper);

        let extra_info = document.createElement('textarea');
        extra_info.placeholder = 'Interesting information';
        extra_info.classList.add('extra-info');
        question.appendChild(extra_info);

        let ready_wrapper = document.createElement('div');
        ready_wrapper.classList.add('ready-wrapper');
        let ready = document.createElement('input');
        ready.type = 'checkbox';
        ready.classList.add('ready-check');
        ready.id = "qcheck_" + theme_index + '_' + i;
        ready.value =  "qcheck_" + theme_index + '_' + i;
        ready.dataset.qKey = theme_index + ':' + i;
        ready.addEventListener('change', () => {
            ChangeQStatus(theme_index + ':' + i);
        })

        let label = document.createElement('label');
        label.htmlFor = "qcheck_" + theme_index + '_' + i;
        label.innerText =  'Ready';
        label.classList.add('ready-label');
        ready_wrapper.appendChild(ready);
        ready_wrapper.appendChild(label);

        question.appendChild(ready_wrapper);

        question_map[theme_index][i] = {};
        question_map[theme_index][i]['text'] =  question_text;
        question_map[theme_index][i]['media'] =  question_media_path;
        question_map[theme_index][i]['answer'] =  question_answer;
        question_map[theme_index][i]['points'] =  points_input;
        question_map[theme_index][i]['step'] =  step_input;
        question_map[theme_index][i]['extra_info'] =  extra_info;
    }
}

function CreateTitleField(wrapper, i) {
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Unfinished Theme';
    input.classList.add('theme-title-input', 'menu-title');
    input.addEventListener('change', () => {
        UpdateThemeTitle(i);
    });

    wrapper.appendChild(input);

    this.page_elements.inputs.theme_titles.push(input);
}

function UpdateThemeTitle(index) {
    let text = event.target.value;

    document.getElementById('themes-wrapper').childNodes[index + 1].innerText = text;

    question_map[index].title = text;
}

function CreateThemeMenus(wrapper) {
    for (let i = 0; i < quiz.theme_ammount; i++) {
        let menu = document.createElement('div');
        menu.classList.add('theme-menu', 'menu', 'invisible');
        menu.style.opacity = 0;
        wrapper.appendChild(menu);

        theme_map[i]['menu'] = menu;

        CreateTitleField(menu, i);

        let displays_wrapper = document.createElement('div');
        displays_wrapper.classList.add('displays-wrapper');

        for (let j = 0; j < quiz.question_ammount; j++) {
            let question_display = document.createElement('button');
            question_display.classList.add('display-question');
            if (j === 0) {
                question_display.classList.add('selected');
            }
            question_display.innerText = 'Q' + (j+1);
            question_display.dataset.display_index = j;

            question_display.addEventListener('click', () => {
                ShowQuestion(question_display.dataset.display_index);
            });

            displays_wrapper.appendChild(question_display);
        }

        menu.appendChild(displays_wrapper);

        AddQuestions(menu, i);

        let return_button = document.createElement('button');
        return_button.classList.add('confirm-button', 'theme-confirm');
        return_button.innerHTML = '<span>Confirm Theme</span>';
        return_button.dataset.index = i;

        return_button.addEventListener('click', () => {
            HideThemeInfo(return_button);
            ShowQuizMenu();
        });
        menu.appendChild(return_button);
    }   
}

function ChangeQStatus(qKey) {
    let question_index = qKey.split(':')[1];
    let theme_index = qKey.split(':')[0];
    let theme = document.getElementsByClassName('theme-menu')[theme_index];
    let question = theme.childNodes[1].childNodes[parseInt(question_index, 10)];
        
    if (event.target.checked) {
        question.classList.add('ready');
    }else{
        question.classList.remove('ready');
    }
}

function CreateJSON() {
    let quiz = new QuizJSON(question_map);

    quiz = JSON.stringify(quiz, null, '\t');
    
    download(quiz, "quiz", 'txt');
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

window.onload = () => {
    this.page_elements = {
        menus: {
            main:   document.getElementById('main-menu'),
            create: document.getElementById('create-menu'),
            quiz:   document.getElementById('quiz-menu')
        },
        buttons: {
            create_confirm: document.getElementById('create-confirm')
        },
        inputs: {
            theme_ammount:      document.getElementById('theme-ammount'),
            question_ammount:   document.getElementById('question-ammount'),
            theme_titles:       []
        },
        wrappers: {
            themes:         document.getElementById('themes-wrapper'),
            theme_menus:    document.getElementById('theme-menus-wrapper')
        }
    }
}