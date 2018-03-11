import { isAuthenticatedApiMiddleware } from "../authentication/IsAuthenticated";
import { Application, Request, Response } from "express";
import { VerbHandler } from "../handlers/VerbHandler";

import { Verb } from "./../models/Verb";
import { Verb as VerbClient } from "./../../src/app/shared/models/verb.model";

export class VerbController {
  private m_verbHandler: VerbHandler;

  constructor(categoryHandler: VerbHandler) {
    this.m_verbHandler = categoryHandler;
  }

  public async getAll (req: Request, res: Response): Promise<void> {
    const verbs: Verb[] = await this.m_verbHandler.all();

    res.json({
      verbs: this.getClientVerbs(verbs)
    });
  }

  public async getOne (req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    let verb = null;

    if (Number.isInteger(id) && id > 0) {
      verb = await this.m_verbHandler.get(id);
    }

    res.json({
      verb: this.getClientVerb(verb)
    });
  }

  public async create (req: Request, res: Response): Promise<void> {
    let verb = this.createVerbFromBody(req.body);
    let error = "";

    if (this.m_verbHandler.isEntityValid(verb, false)) {
      const success = await this.m_verbHandler.add(verb);
      if (!success) {
        verb = null;
        error = "Failed to add the verb to database.";
      }
    }

    res.json({
      verb: this.getClientVerb(verb),
      error: error
    });
  }

  public async update (req: Request, res: Response): Promise<void> {
    let success = false;
    let error = "";

    let verb: Verb = this.createVerbFromBody(req.body);
    if (this.m_verbHandler.isEntityValid(verb, true)) {
      success = await this.m_verbHandler.update(verb);
      if (!success) {
        error = "Failed to update the verb in database.";
      }
    }
    else {
      error = "Invalid verb.";
    }

    res.json({
      success: success,
      error: error
    });
  }

  public async remove (req: Request, res: Response): Promise<void> {
    let success = false;
    let error = "";

    let verb: Verb = this.createVerbFromBody(req.body);
    if (Number.isInteger(verb.id) && verb.id > 0) {
      success = await this.m_verbHandler.remove(verb);
      if (!success) {
        error = "Failed to remove the verb from database.";
      }
    }
    else {
      error = "Invalid verb."
    }

    res.json({
      success: success,
      error: error
    });
  }

  private createVerbFromBody (body: any) {
    const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
    const finnish = body.finnish || "";
    const english = body.english || "";
    const note = body.note || "";
    const minä = body.minä || "";
    const sinä = body.sinä || "";
    const hän = body.hän || "";
    const me = body.me || "";
    const te = body.te || "";
    const he = body.he || "";
    const ei = body.ei || "";

    return new Verb(id, finnish, english, note, minä, sinä, hän, me, te, he, ei);
  }

  private getClientVerb (verb: Verb): VerbClient {
    if (!verb) {
      return null;
    }

    return {
      id: verb.id,
      finnish: verb.finnish,
      english: verb.english,
      note: verb.note,
      mina: verb.minä,
      sina: verb.sinä,
      han: verb.hän,
      me: verb.me,
      te: verb.te,
      he: verb.he,
      ei: verb.ei
    };
  }

  private getClientVerbs (verbs: Verb[]): VerbClient[] {
    const result = [];

    for (let i = 0; i < verbs.length; i++) {
      result.push(this.getClientVerb(verbs[i]));
    }

    return result;
  }
}

export var setupVerbRoutes = function (baseUrl: string, expressApp: Application) {
  var verbHandler: VerbHandler = new VerbHandler();

  var verbController: VerbController = new VerbController(verbHandler);

  expressApp.get(baseUrl + "verb/get", async (req, res) => {
    verbController.getAll(req, res);
  });

  expressApp.get(baseUrl + "verb/get/:id", async (req, res) => {
    verbController.getOne(req, res);
  });

  expressApp.post(baseUrl + "verb/create", isAuthenticatedApiMiddleware, async (req, res) => {
    verbController.create(req, res);
  });

  expressApp.post(baseUrl + "verb/update", isAuthenticatedApiMiddleware, async (req, res) => {
    verbController.update(req, res);
  });

  expressApp.post(baseUrl + "verb/remove", isAuthenticatedApiMiddleware, async (req, res) => {
    verbController.remove(req, res);
  });
}
