import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { TowerEvent } from "../models/Event"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService{
  async getEvents(){
    let res = await api.get('api/events')
    logger.log(res.data)
    AppState.events = res.data.map(event => new TowerEvent(event))
    logger.log(AppState.events)
  }

  async getEventsByProfile() {
    logger.log(AppState.account.id)
    let res = await api.get(`/account/tickets`)
    logger.log(res.data)
    AppState.tickets = res.data.map(ticket => new Ticket(ticket))
    logger.log(AppState.events)
  }

  async setActiveEvent(eventId) {
    logger.log('setting the active event..' + eventId)
    let res = await api.get(`api/events/${eventId}`)
    logger.log(res.data)
    
    AppState.activeEvent = new TowerEvent(res.data)
  }
}

export const eventsService = new EventsService()