const addNoteBtn = document.querySelector('.addNoteBtn');
let zIndexCounter = 1;

addNoteBtn.addEventListener('click', () => {
    const input = document.querySelector('.noteTitleInput');
    if (input.value.trim() == '') return;

    const note = document.createElement('div');
    const noteTitle = document.createElement('span');
    const closeBtn = document.createElement('span');
    const noteTextArea = document.createElement('textarea');

    note.setAttribute('class', 'note');
    noteTitle.setAttribute('class', 'noteTitle');
    closeBtn.setAttribute('class', 'closeBtn');
    noteTextArea.setAttribute('class', 'noteTextArea');
    noteTextArea.setAttribute('rows', '10');
    noteTextArea.setAttribute('placeholder', 'Write your content');

    noteTitle.innerText = input.value;
    closeBtn.innerText = 'X';
    
    document.body.append(note);
    note.append(noteTitle);
    note.append(closeBtn);
    note.append(noteTextArea);

    note.style.zIndex = zIndexCounter++;
    input.value = '';
});

document.addEventListener('click', (event) => {
    if(event.target.classList.contains('closeBtn')){
        event.target.parentNode.remove();
    }
})

let cursor= {
    x: null,
    y: null
}

let note= {
    dom: null,
    x: null,
    y: null
}

document.addEventListener('mousedown', (event) => {
    if(event.target.classList.contains('note') || event.target.classList.contains('container')){
        cursor= {
            x: event.clientX,
            y: event.clientY

        }

        note= {
            dom: event.target,
            x: event.target.getBoundingClientRect().left,
            y: event.target.getBoundingClientRect().top
        }
        event.target.style.zIndex = zIndexCounter++;
        document.body.style.cursor = 'grab';
    }

})

document.addEventListener('mousemove', (event) => {
    if(note.dom == null) return;
    let currentCursor = {
        x: event.clientX,
        y: event.clientY
    }

    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    }

    note.dom.style.left = (note.x+distance.x) + 'px';
    note.dom.style.top = (note.y+distance.y) + 'px';
    // note.dom.style.zIndexCounter= zIndexCounter++;
})

document.addEventListener('mouseup', () => {
    note.dom = null;
    document.body.style.cursor = 'default';
})