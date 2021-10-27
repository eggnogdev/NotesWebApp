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
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'NotesWebApp';
  public counter = 0;
  public notes = new Array<Note>();
  public selectedIndex = -1;

  onAdd() {
    let newNote = new Note(
      `New Note ${++this.counter}`,
      new Date(Date.now()),
      'text here'
    );
    this.notes.push(newNote);
  }

  onDelete() {
    if (this.selectedIndex === -1) {
      return;
    }
    this.notes.splice(this.selectedIndex, 1);
    this.selectedIndex = -1;
  }

  onSelectionChange(event: any) {
    this.selectedIndex = event.source.getSelectedIndex();
  }
}
