import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";

export class EventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
  }

  async createPost(req, res, next) {
    try {
      let formBody = req.body
      formBody.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(formBody)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
}