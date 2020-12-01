import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-name-draw',
  templateUrl: './name-draw.component.html',
  styleUrls: ['./name-draw.component.scss']
})
export class NameDrawComponent implements OnInit {

  entry: any = {};
  persons: any[] = [];
  pairs: any[] = [];
  isUneven = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Add a name
   */
  addName() {
    this.persons.push(this.entry);
    this.isUneven = this.persons.length % 2 !== 0 || this.persons.length === 0;
    this.entry = {};
  }

  /**
   * Draw the names
   */
  drawNames() {
    this.persons = this.shuffle(this.persons);
    for (let i = this.persons.length - 1; i >= 0; i -= 2) {
      const pair: any = {};
      pair.p1 = this.persons[i];
      pair.p2 = this.persons[i - 1];
      this.pairs.push(pair);
    }
    console.log(this.pairs);
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
