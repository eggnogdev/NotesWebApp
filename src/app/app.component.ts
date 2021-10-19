import { Component } from '@angular/core';

export class Note {
  date: Date | undefined;
  text: string | undefined;

  constructor(date: Date, text: string) {
    this.date = date;
    this.text = text;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotesWebApp';

  public notes = Array<Note>();
  
  onAdd() {
    let newNote = new Note(new Date(Date.now()), 'New Note');
    this.notes.push(newNote);
    console.log(this.notes);
  }

  onDelete() {
    if (this.notes.length == 0) {
      console.log('no notes to remove');
      return;
    }
    this.notes.pop()
    console.log(this.notes);
  }
  
}
