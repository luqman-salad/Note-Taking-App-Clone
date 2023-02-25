const noteArea = document.querySelector(".noteArea");
const noteTitle = document.querySelector("#noteTitle");
const noteText = document.querySelector("#noteText");
const notes = document.querySelector("#notes")


//funtions

const showNoteArea = () => {
    noteText.style = "display: block";
    noteArea.classList.add("noteNow");
    noteTitle.setAttribute("placeholder","Title");
    noteTitle.style = "font-size: 20px; border: none";
    noteArea.style = "border: 1px solid #ccc";
}
const hideNoteArea = () => {
    noteText.style = "display: none";
    noteArea.classList.remove("noteNow")
    noteTitle.setAttribute("placeholder","Take a note...")
}
const addNote = (Title,note) => {
    notes.innerHTML += 
    `
        <div class="note">
            <h3>${Title}</h3>
            <p>${note}</p>
            <i class="fa fa-trash show"></i>
        </div>
    `
    noteTitle.value = "";
    noteText.value = "";
}

const addNoteToLocalStorage = (note) => {
    if(note.length < 0){
        return
    }
    console.log(note)
    
    let oldNote;

    if(localStorage.getItem("notes") === null){
        oldNote = [];
    }else{
        oldNote = JSON.parse(localStorage.getItem('notes'));
    }
    oldNote.push(note);
    localStorage.setItem('notes',JSON.stringify(oldNote));
}
const getNotesFromLocalStorage = () => {
    let oldNote;

    if(localStorage.getItem("notes") === null){
        oldNote = [];
    }else{
        oldNote = JSON.parse(localStorage.getItem('notes'));
    }

    oldNote.forEach(note => {
        notes.innerHTML += 
    `
        <div class="note">
            <h3>${note[0]}</h3>
            <p>${note[1]}</p>
            <i class="fa fa-trash show"></i>
        </div>
    `
    });
}

const deleteFromLocalStorage = (deletedNote) => {
    let oldNote;

    if(localStorage.getItem("notes") === null){
        oldNote = [];
    }else{
        oldNote = JSON.parse(localStorage.getItem('notes'));
    }
    oldNote.map((note,index) => {
        if(note[0] == deletedNote.children[0].textContent.trim() && note[1] == deletedNote.children[1].textContent.trim()){
            oldNote.splice(index,1);
            return oldNote;
        }
    })
    localStorage.setItem("notes",JSON.stringify(oldNote));
}





//Adding event listing

document.addEventListener("DOMContentLoaded",getNotesFromLocalStorage)

noteArea.addEventListener("click",showNoteArea);

document.addEventListener("click",(event) => {
    let isClicked = noteArea.contains(event.target);
    if(!isClicked){
        hideNoteArea();
        if(noteTitle.value.length === 0 && noteText.value.length === 0){
            return;
        }else{
            addNoteToLocalStorage([noteTitle.value,noteText.value])
            addNote(noteTitle.value,noteText.value);
        }
        
    }
})
// document.addEventListener("mouseover", (event) => {
//     if(event.target.classList.contains("note")){
//         event.target.querySelector("i").classList.add("show");
//     }
// })
// document.addEventListener("mouseout",(event) => {
//     if(event.target.classList.contains("note")){
//         event.target.querySelector("i").classList.remove("show");
//     }
// })
document.addEventListener("click",(event) => {
    if(event.target.classList.contains("fa-trash")){
        event.target.parentElement.remove();
        deleteFromLocalStorage(event.target.parentElement);
    }
})