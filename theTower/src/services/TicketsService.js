import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
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
    const tickets = await dbContext.Tickets.find({ accountId: accountId }).populate('event profile')
    return tickets
  }

  async getTicketsByEvent(eventId) {
    logger.log(eventId)
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
    logger.log(tickets)
    return tickets
  }

  async deleteTicket(accountId, ticketId) {
    logger.log('Deleting ticket by ID:' + ticketId)
    const tickets = await this.getTicketsByAccount(accountId)
    const ticketToDelete = await dbContext.Tickets.findById(ticketId).populate('profile')
    // @ts-ignore
    logger.log(ticketToDelete.profile)
    if (!tickets) {
      throw new BadRequest(`You don't own any tickets for this event!`)
    }
    if (!ticketToDelete) {
      throw new BadRequest('Unable to find the ticket with this ID')
    }
    // @ts-ignore
    if (ticketToDelete.profile.id != accountId) {
      throw new Forbidden('You are not the owner of this ticket!')
    }
    await ticketToDelete.remove()
    return `You have successfully deleted your ticket`
  }
}

export const ticketsService = new TicketsService()