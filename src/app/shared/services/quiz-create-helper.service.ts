import { Injectable } from '@angular/core';

export interface IQuestionKeys {
  question: string;
  answer: string;
}

@Injectable()
export class QuizCreateHelperService {

  constructor() { }

  /**
   * Based on the quiz language return the phrase property keys.
   * For example if the quiz should randomize between finnish & english it randomizes the property keys.
   * @return {IQuestionKeys}
   */
  public getQuestionKeys (finnish: string, english: string): IQuestionKeys {
    // + 0.5 is equivalent of * 2
    if (Math.floor(Math.random() + 0.5) === 0) {
      return {
        question: finnish,
        answer: english
      };
    }
    else {
      return {
        question: english,
        answer: finnish
      };
    }
  }

  /**
   * A simple shuffle array where it goes through each index and randomly changes position with any other index
   * @param {any[]} arr
   */
  public shuffleArray (arr: any[]) {
    for (let i = 0; i < arr.length; ++i) {
      // Get a random number between 0 and length
      const randomId: number = Math.floor(Math.random() * arr.length);
      const temp: any = arr[randomId];

      arr[randomId] = arr[i];
      arr[i] = temp;
    }
  }

}
