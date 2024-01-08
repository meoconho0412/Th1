window.onload = function () {
    displayNotes()
}

function addNote() {
    let noteInput = document.getElementById('noteInput')
    let noteText = noteInput.value.trim()

    if (noteText !== '') {
        let currentDate = new Date()
        let noteDate = {
            day: currentDate.getDate(),
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
        }

        let newNote = {
            text: noteText,
            date: noteDate,
        }

        let notes = getNotes()
        notes.push(newNote)
        saveNotes(notes)

        noteInput.value = ''
        displayNotes()
    }
}

function displayNotes() {
    let noteList = document.getElementById('noteList')
    noteList.innerHTML = ''

    let notes = getNotes()

    for (const [index, note] of notes.entries()) {
        let noteItemHTML = `
            <div class="note-item">
                <h4>${note.date.day}/${note.date.month}/${note.date.year}</h4>
                <pre>${note.text}<<pre>
                <button onclick="editNote(${index})">Chỉnh Sửa</button>
                <button class="delete-button" onclick="deleteNote(${index})">Xóa</button>
            </div>
        `

        noteList.innerHTML += noteItemHTML
    }
}

function editNote(index) {
    let notes = getNotes()
    let editedNote = prompt('Chỉnh sửa ghi chú:', notes[index].text)

    if (editedNote !== null) {
        notes[index].text = editedNote
        saveNotes(notes)
        displayNotes()
    }
}

function deleteNote(index) {
    let notes = getNotes()
    notes.splice(index, 1)
    saveNotes(notes)
    displayNotes()
}

function getNotes() {
    let storedNotes = localStorage.getItem('notes')
    return storedNotes ? JSON.parse(storedNotes) : []
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}
