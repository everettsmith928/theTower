import { Auth0Provider } from "@bcwdev/auth0provider"
import { ticketsService } from "../services/TicketsService.js"
import BaseController from "../utils/BaseController.js"
import { logger } from "../utils/Logger.js"

export class TicketController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicket)

  }

  async createTicket(req, res, next) {
    try {
      logger.log(req)
      let ticketBody = req.body
      ticketBody.accountId = req.userInfo.id
      let ticket = await ticketsService.createTicket(ticketBody)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const accountId = req.userInfo.id
      let ticketId = req.params.ticketId
      let message = await ticketsService.deleteTicket(accountId, ticketId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
}