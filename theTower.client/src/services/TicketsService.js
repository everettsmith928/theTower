import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TicketsService {
  async deleteTicket(ticketId){
    let res = await api.delete(`api/tickets/${ticketId}`)
    logger.log('You deleted your ticket!'+ res.data)
    let foundTicket = AppState.tickets.findIndex(ticket => ticketId == ticket.id)
    // let indexOfTicket = foundTicket.indexOf()
    AppState.tickets.splice(foundTicket, 1)
  }

  async createTicket(eventId) {
    let res = await api.post(`api/tickets`, {eventId: eventId})
    logger.log(res.data)
    Pop.success('You bought a ticket!')
  }

  async getTicketsByEvent(eventId) {
    logger.log(eventId)
    let res = await api.get(`api/events/${eventId}/tickets`)
    logger.log(res.data)
    AppState.tickets = res.data.map(ticket => new Ticket(ticket))
  }
}

export const ticketsService = new TicketsService()