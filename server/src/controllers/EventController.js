import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class EventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getTicketsByEvent)
      .get('/:eventId/comments', this.getCommentsByEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete(`/:eventId`, this.cancelEvent)
  }

  async createEvent(req, res, next) {
    try {
      let formBody = req.body
      formBody.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(formBody)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEvents(req, res, next) {
    try {
      const events = await eventsService.getEvents()
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await eventsService.getEventById(eventId)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByEvent(req, res, next) {
    try {
      let eventId = req.params.eventId
      const tickets = await ticketsService.getTicketsByEvent(eventId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      let formBody = req.body
      formBody.id = req.params.eventId
      formBody.creatorId = req.userInfo.id
      let editedEvent = await eventsService.editEvent(formBody)
      res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      let eventId = req.params.eventId
      let accountId = req.userInfo.id
      let message = await eventsService.cancelEvent(eventId, accountId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      let comments = await commentsService.getCommentsByEvent(eventId)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
}