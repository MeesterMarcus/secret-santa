import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-name-draw',
  templateUrl: './name-draw.component.html',
  styleUrls: ['./name-draw.component.scss']
})
export class NameDrawComponent implements OnInit {

  entry: string;
  names: string[] = [];
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
    this.names.push(this.entry);
    console.log(this.names);
    this.isUneven = this.names.length % 2 !== 0 || this.names.length === 0;
  }

  /**
   * Draw the names
   */
  drawNames() {
    this.names = this.shuffle(this.names);
    for (let i = this.names.length - 1; i >= 0; i -= 2) {
      const pair: any = {};
      pair.p1 = this.names[i];
      pair.p2 = this.names[i - 1];
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
