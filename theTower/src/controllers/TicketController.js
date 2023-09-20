import { Auth0Provider } from "@bcwdev/auth0provider"
import { ticketsService } from "../services/TicketsService.js"
import BaseController from "../utils/BaseController.js"

export class TicketController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)

  }

  async createTicket(req, res, next) {
    try {
      let ticketBody = req.body
      ticketBody.accountId = req.userInfo.id
      let ticket = await ticketsService.createTicket(ticketBody)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}