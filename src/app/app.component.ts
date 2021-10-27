import { Component } from '@angular/core';

export class Note {
  title: string | undefined;
  date: Date | undefined;
  text: string | undefined;


  constructor(title: string, date: Date, text: string) {

    this.title = title;
    this.text = text;
    this.date = date;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotesWebApp';
  public counter = 0;
  public notes = new Array<Note>();
  
  onAdd() {

    let newNote = new Note(`New Note ${++this.counter}`, new Date(Date.now()), 'text here');
    this.notes.push(newNote);
    console.log(this.notes);
  }

  onDelete() {
    if (this.notes.length == 0) {
      console.log('no notes to remove');
      return;
    }
    this.counter--;
    this.notes.pop()
    console.log(this.notes);
  }
  listItemClicked () {
    console.log('list item clicked');
  }
  onSelectionChange(event: any) {
    console.log(event);
  }
}
