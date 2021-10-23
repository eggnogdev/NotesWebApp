import { Component } from '@angular/core';

export class Note {
  title: string | undefined;
  dateObject: Date | undefined;
  text: string | undefined;
  date: string | undefined;


  constructor(title: string, dateObject: Date, text: string) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    this.title = title;
    this.dateObject = dateObject;
    this.text = text;

    let date = `${dateObject.getDate()} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
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

  public notes = new Array<Note>();
  
  onAdd() {
    let newNote = new Note("New Note", new Date(Date.now()), 'text here');
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
  listItemClicked () {
    console.log('list item clicked');
  }
}
