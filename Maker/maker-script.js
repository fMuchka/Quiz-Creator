var quiz = {
    themes: undefined
}

var themes_html = {
    inputs:         document.getElementsByClassName('theme-inputs'),
    navigations:    undefined,
    current_theme:  undefined
}

var selected_question = null;

function SwapClasses(element, classRemove, classAdd) {
    new Promise ((resolve, reject) => {
        setTimeout( () => {
            if (classRemove) {
                if (!Array.isArray(element)) {
                    element.classList.remove(classRemove);    
                }
                else{
                    for (let i = 0; i < element.length; i++) {
                        element[i].classList.remove(classRemove);
                    }
                }   
            }
            resolve();
        }, 10);
    }).then( () =>{
        setTimeout( () =>{
            if (classAdd) {
                if (!Array.isArray(element)) {
                    element.classList.add(classAdd);    
                }
                else{
                    for (let i = 0; i < element.length; i++) {
                        element[i].classList.add(classAdd);
                    }
                }    
            }
        }, 10)
    })
}

function CreateThemes(themes){
    quiz.themes = [];

    let nav_wrapper = document.getElementById('theme-navigation-wrapper');

    for (let i = 0; i < themes.length; i++) {
        if (themes[i].value !== '') {
            quiz.themes.push(themes[i].value);

            let nav = document.createElement('button');
            nav.classList.add('theme-navigation');
            nav.onclick = ShowTheme;
            nav.setAttribute('data-theme-index', quiz.themes.length - 1);
            nav.innerText = themes[i].value;

            nav_wrapper.appendChild(nav);   
        }
    }
}

function ShowTheme() {
    let button = event.target;

    if (themes_html.current_theme !== null) {
        themes_html.current_theme.classList.remove('selected');
        themes_html.current_theme = null;
    }
    button.classList.add('selected');

    themes_html.current_theme = event.target;
}

function ConfirmThemes() {
    let themes = document.getElementsByClassName('theme-input');
    let confirm = document.getElementById('confirm-themes');
    let navigation = document.getElementById('navigation-wrapper');
    let main_area = document.getElementById('main-area');
    let buttons = {delete: document.getElementById('delete-question'),
                   add: document.getElementById('add-question')
                };

    new Promise ( (resolve, reject) => {
        CreateThemes(themes);
        resolve();
    }).then( () => {
        setTimeout( () => {
            for (let i = themes.length - 1; i != -1; i--) {
                SwapClasses(themes[i].parentNode, 'fade-in', 'fade-out');
            }   
            SwapClasses(confirm, 'fade-in', 'fade-out');
            SwapClasses([buttons.delete, buttons.add], 'invisible', false);
            main_area.classList.add('work');
        }, 50)
    }).then( () => {
        setTimeout(() => {
            for (let i = themes.length - 1; i != -1; i--) {
                themes[i].parentNode.remove();
                SwapClasses([navigation, buttons.delete, buttons.add], 'fade-out', 'fade-in');
            }
            confirm.remove();
        }, 500);
    }).then( () => {
        let first_theme = document.getElementsByClassName('theme-navigation')[0];
        first_theme.classList.add('selected');
        themes_html.current_theme = first_theme;
    });
}

function ShowNextThemeInput(index) {
    
}

function CreateThemeInput() {
    let code;

    if (event === undefined) {
         code = 13;
    }
    else{
         code = event.keyCode;
    }

    if (themes_inputs.current < themes_inputs.maximum && code === 13){
        let wrapper = document.getElementById('main-area');
        let confirm = document.getElementById('confirm-themes');

        let input = {
            wrapper: document.createElement('div'),
            field: document.createElement('input'),
            cancel: document.createElement('button')
        };

        input.wrapper.classList.add('theme-input-wrapper', 'fade-out');
        input.wrapper.appendChild(input.field);
        input.wrapper.appendChild(input.cancel);
        input.field.classList.add('theme-input');
        input.field.placeholder = "Theme #" + (themes_inputs.current + 1);
        input.field.onkeyup = CreateThemeInput;
        
        input.cancel.classList.add('input-cancel');
        input.cancel.onclick = RemoveThemeInput;

        wrapper.insertBefore(input.wrapper, confirm);

        themes_inputs.current++;

        new Promise( (resolve, reject) => {
            setTimeout( () => {

                SwapClasses(input.wrapper, 'fade-out', 'fade-in');
                resolve();
            }, 50)
        });        
    }

    if (themes_inputs.current > 0) {
        let confirm = document.getElementById('confirm-themes');

        new Promise( (resolve, reject) => {
            setTimeout( () => {
                confirm.classList.remove('invisible');
                resolve();
            }, 100)
        }).then(() => {

            SwapClasses(confirm, 'fade-out', 'fade-in');
        });
    } 
}

function RemoveThemeInput() {
    let wrapper = event.target.parentNode;

    if (themes_inputs.current > 1) {
        new Promise( (resolve, reject) => {
            setTimeout( () => {

              SwapClasses(wrapper, 'fade-in', 'fade-out');
                resolve();
            }, 50)
        }).then(() => {
            setTimeout( () => {
                wrapper.remove();        
            }, 500);
        });

        themes_inputs.current--;    
    }
}

function GetStarted(){
    let create_themes = event.target;
    let wrapper = document.getElementById('main-area');

    create_themes.classList.add('fade-out');

    new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve();
        }, 500);
    }).then(() => {

        create_themes.classList.add('invisible');
        wrapper.classList.remove('intro');

    }).then( new Promise((resolve, reject) => {   
        setTimeout( () => {
            CreateThemeInput();
            resolve();    
        }, 500);
    }));     
}

function DeleteSelectedQuestion() {
    const button = event.target;

    if (!button.classList.contains('disabled')) {
        selected_question.remove();

        console.log('delete');
        
    }
}

function CreateQuestion() {
    const button = event.target;

    if (!button.classList.contains('disabled')) {
        NewQuestion();
    }
}

function NewQuestion(){
    console.log('new');
    
}

window.onload = () => {
    
 
}
