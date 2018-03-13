import { Injectable } from '@angular/core';
import { Verb } from "../shared/models/verb.model";

@Injectable()
export class VerbService {

  public verbs: Verb[];

  constructor() {
    this.verbs = [];
  }

}
