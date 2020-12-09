import {Component, OnInit} from '@angular/core';
import '../../assets/smtp';
import {MatDialog} from '@angular/material/dialog';
import {AlreadyExistsDialogComponent} from '../already-exists-dialog/already-exists-dialog.component';

declare let Email: any;

@Component({
  selector: 'app-name-draw',
  templateUrl: './name-draw.component.html',
  styleUrls: ['./name-draw.component.scss']
})
export class NameDrawComponent implements OnInit {

  // Global variables
  entry: any = {};
  persons: any[] = [];
  pairs: any[] = [];
  isUneven = true;
  resultsHidden = true;
  resultButtonText = 'Show Results';
  drawnPersons: any[] = [];
  drawClicked = false;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  /**
   * Add a name
   */
  addName() {
    if (this.persons.some(p => p.name === this.entry.name)) {
      this.dialog.open(AlreadyExistsDialogComponent);
      this.entry = {};
      return;
    }
    this.persons.push(this.entry);
    this.isUneven = this.persons.length % 2 !== 0 || this.persons.length === 0;
    this.entry = {};
  }

  /**
   * Remove a name
   */
  remove(person) {
    if (this.drawClicked) {
      return;
    }
    this.persons = this.persons.filter(p => p.name !== person.name);
    this.isUneven = this.persons.length % 2 !== 0 || this.persons.length === 0;
  }

  /**
   * Reset the name drawing
   */
  reset() {
    this.drawClicked = false;
    this.isUneven = true;
    this.resultsHidden = true;
    this.resultButtonText = 'Show Results';
    this.persons = [];
    this.pairs = [];
    this.drawnPersons = [];
  }

  /**
   * Draw the names
   */
  drawNames() {
    this.drawClicked = true;
    this.drawnPersons = this.shuffle(this.persons);
    for (let i = this.drawnPersons.length - 1; i >= 0; i -= 2) {
      const pair: any = {};
      pair.p1 = this.drawnPersons[i];
      pair.p2 = this.drawnPersons[i - 1];
      this.pairs.push(pair);
    }
  }

  /**
   * Show the drawn name results
   */
  showResults() {
    if (this.resultsHidden) {
      this.resultsHidden = false;
      this.resultButtonText = 'Hide results';
    } else {
      this.resultsHidden = true;
      this.resultButtonText = 'Show Results';
    }
  }

  // Todo: [EXPERIMENTAL] use an API instead
  sendEmails() {
    this.pairs.forEach(pair => {
      this.sendMail(pair.p1.email, pair.p2.name);
      this.sendMail(pair.p2.email, pair.p1.name);
    });
  }

  /**
   * Send an email
   * @param to: the person sending email to
   * @param:  the assigned person
   */
  sendMail(to, assignment) {
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'info@lorenzanadesigns.com',
      Password: '',
      To: to,
      From: 'info@lorenzanadesigns.com',
      Subject: 'Secret Santa',
      Body: 'You were assigned: ' + assignment
    });
  }

  /**
   * Shuffle the array
   */
  shuffle<T>(array: T[]): T[] {
    if (!Array.isArray(array)) {
      throw new TypeError(`Expected an Array, got ${typeof array} instead.`);
    }

    const oldArray = [...array];
    let newArray = new Array<T>();

    while (oldArray.length) {
      const i = Math.floor(Math.random() * oldArray.length);
      newArray = newArray.concat(oldArray.splice(i, 1));
    }

    return newArray;
  }

}
