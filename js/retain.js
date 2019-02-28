$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            let notes = [];
            JSON.parse(localStorage.notes).forEach(note => {
                notes.push({
                    content: note.content,
                    created: new Date(note.created)
                });
            });
            return notes;
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                created: new Date()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note) {
                htmlStr += `<li class="note"> ${note.content} (${note.created.toISOString().slice(0, 10)}) </li>`;
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});