import { MdcList, MdcTextarea, MdcTextField } from '@angular-mdc/web';
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
  @ViewChild('noteList') noteList: MdcList | undefined;
  @ViewChild('searchFieldInput') searchFieldInput: MdcTextField | undefined;

  title = 'NotesWebApp';
  public counter = 0;
  public notes = new Array<Note>();
  public selectedIndex = -1;
  public addDisabled = true;
  public noteTitle = '';
  public noteText = '';
  public filteredNotes = this.notes;

  clearTextFields() {
    this.noteTextInput?.writeValue(null);
    this.noteTitleInput?.writeValue(null)
  }

  onAdd() {
    let newNote = new Note(
      this.noteTitle,
      new Date(Date.now()),
      this.noteText
    );
    this.notes.unshift(newNote);
    this.clearTextFields();
    this.addDisabled = true;
    this.filteredNotes = this.notes.filter(note => note.title?.includes(this.searchFieldInput?.value));
  }

  onDelete(note: Note) {
    if (this.notes.indexOf(note) === this.selectedIndex) {
      this.clearTextFields();
    }

    this.notes.splice(this.notes.indexOf(note), 1);
    this.filteredNotes.splice(this.filteredNotes.indexOf(note), 1);
  }

  onSave() {
    if (this.selectedIndex !== -1) {
      let note = this.notes[this.selectedIndex];
      note.title = this.noteTitleInput?.value;
      note.text = this.noteTextInput?.value;
      this.clearTextFields();
    }
  }

  onSelectionChange(event: any) {
    this.selectedIndex = event.source.getSelectedIndex();
    this.noteTitleInput?.writeValue(this.notes[this.selectedIndex].title);
    this.noteTextInput?.writeValue(this.notes[this.selectedIndex].text);
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

  onSearchFieldInput(event: any) {
    this.filteredNotes = this.notes.filter(note => note.title?.includes(event));
  }
}
