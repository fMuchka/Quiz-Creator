
var quiz = {
    theme_ammount:  null,
    question_ammount:   null,
    
    themes: []
}

var theme_map = {};
var question_map = {};

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
    }).then(() => {
        setTimeout(() => {
            this.page_elements.menus.quiz.classList.toggle('invisible');
        }, 250);
    });
}

function ShowThemeInfo(theme) {
    //  TO-DO:  SHOW THE THEME MENU FROM THEME-MENUS-WRAPPER
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

    // TO-DO:   ADD 'CREATE JSON' BUTTON
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

        let question_answer = document.createElement('textarea');
        question_answer.placeholder = 'Enter Answer';
        question_answer.classList.add('answer');
        question.appendChild(question_answer);

        let ready = document.createElement('button');
        ready.innerText = 'Ready';
        ready.classList.add('ready-button');
        question.appendChild(ready);

        question_map[theme_index][i] = {};
        question_map[theme_index][i]['text'] =  question_text;
        question_map[theme_index][i]['media'] =  question_media_path;
        question_map[theme_index][i]['answer'] =  question_answer;
    }
}

function CreateTitleField(wrapper) {
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Unfinished Theme';
    input.classList.add('theme-title-input');

    wrapper.appendChild(input);

    this.page_elements.inputs.theme_titles.push(input);
}

function CreateThemeMenus(wrapper) {
    for (let i = 0; i < quiz.theme_ammount; i++) {
        let menu = document.createElement('div');
        menu.classList.add('theme-menu', 'menu', 'invisible');
        menu.style.opacity = 0;
        wrapper.appendChild(menu);

        theme_map[i]['menu'] = menu;

        CreateTitleField(menu);

        AddQuestions(menu, i);
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