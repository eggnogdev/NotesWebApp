import { MdcTextarea, MdcTextField } from '@angular-mdc/web';
import { Component, ViewChild } from '@angular/core';

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
  @ViewChild('noteTextInput') noteTextInput: MdcTextarea | undefined;
  @ViewChild('noteTitleInput') noteTitleInput: MdcTextField | undefined;
  
  title = 'NotesWebApp';
  public counter = 0;
  public notes = new Array<Note>();
  public selectedIndex = -1;
  public addDisabled = true;
  public deleteDisabled = true;
  public noteTitle = '';
  public noteText = '';

  onAdd() {
    let newNote = new Note(
      this.noteTitle,
      new Date(Date.now()),
      this.noteText
    );
    this.notes.unshift(newNote);
    this.noteTextInput?.writeValue(null);
    this.noteTitleInput?.writeValue(null);
    this.addDisabled = true;
  }

  // onDelete() {
  //   this.notes.splice(this.selectedIndex, 1);
  //   this.selectedIndex = -1;
  //   this.deleteDisabled = true;
  // }
  onDelete(note: Note) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }

  onSelectionChange(event: any) {
    this.selectedIndex = event.source.getSelectedIndex();
    this.deleteDisabled = false;
  }

  onTextFieldInput(event: any) {
    if (event.length === 0) {
      this.addDisabled = true;
    }
    else {
      this.addDisabled = false;
    }
  }

  onTextFieldChange(event: any) {
    this.noteTitle = event;
  }

  onTextAreaChange(event: any) {
    this.noteText = event;
  }
}
