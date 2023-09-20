import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"

class TicketsService {
  async createTicket(ticketBody) {
    logger.log('creating the ticket...')
    const ticket = await dbContext.Tickets.create(ticketBody)
    await ticket.populate('event')
    await ticket.populate('profile', '-email')
    return ticket
  }

  async getTicketsByAccount(accountId) {
    logger.log(accountId)
    const tickets = await dbContext.Tickets.find({ accountId: accountId }).populate('event')
    return tickets
  }
}

export const ticketsService = new TicketsService()