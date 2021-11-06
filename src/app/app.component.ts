import { MdcList, MdcTextarea, MdcTextField } from '@angular-mdc/web';
import { Component, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';

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
  public addDisabled = true;
  public noteTitle = '';
  public noteText = '';
  public filteredNotes = this.notes;

  clearTextFields() {
    this.noteTextInput?.writeValue(null);
    this.noteTitleInput?.writeValue(null);
  }

  onAdd() {
    let newNote = new Note(
      "New Note",
      new Date(Date.now()),
      ""
    );
    this.notes.unshift(newNote);
    this.filteredNotes = this.notes.filter(note => {
      if (!this.searchFieldInput?.value) {
        return this.notes;
      }
      return note?.title?.includes(this.searchFieldInput?.value);
    });
    // this.noteList?.setSelectedIndex(0);
    setTimeout(() => {
      this.noteList?.setSelectedIndex(0);
      // this.onSelectionChange(null);
      this.clearTextFields();
      this.noteTitleInput?.focus();
    }, 1);
  }

  onDelete(note: Note) {
    if (this.notes.indexOf(note) === this.noteList?.getSelectedIndex()) {
      this.clearTextFields();
    }

    this.notes.splice(this.notes.indexOf(note), 1);
    this.filteredNotes.splice(this.filteredNotes.indexOf(note), 1);
  }

  onSave() {
    if (this.noteList?.getSelectedIndex() !== -1) {
      let note = this.notes[this.noteList!.getSelectedIndex()];
      note.title = this.noteTitleInput?.value;
      note.text = this.noteTextInput?.value;
      this.noteList?.reset();
      this.clearTextFields();
    }
  }

  onSelectionChange(_: any) {
    this.noteTitleInput?.writeValue(this.notes[this.noteList!.getSelectedIndex()].title);
    this.noteTextInput?.writeValue(this.notes[this.noteList!.getSelectedIndex()].text);
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
