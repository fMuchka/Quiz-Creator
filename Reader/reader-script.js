function loadFile() {
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    

    function onReaderLoad(event){
        let obj = JSON.parse(event.target.result);        
        let quiz = new Quiz(obj);

        console.log(quiz)
    }
}