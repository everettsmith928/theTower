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
    AppState.profileTickets = res.data.map(ticket => new Ticket(ticket))
    logger.log(AppState.tickets)
  }

  async setActiveEvent(eventId) {
    logger.log('setting the active event..' + eventId)
    let res = await api.get(`api/events/${eventId}`)
    logger.log(res.data)
    AppState.activeEvent = new TowerEvent(res.data)
  }

  async createEvent(formData) {
    logger.log('Creating your event..')
    let res = await api.post(`api/events`, formData)
    logger.log(res.data)
    let newEvent = new TowerEvent(res.data)
    AppState.events.unshift(newEvent)
    AppState.activeEvent = newEvent
    return newEvent
  }

  async cancelEvent() {
    logger.log('Cancelling your event..')
    let eventId = AppState.activeEvent.id
    let res = await api.delete(`api/events/${eventId}`)
    logger.log(res.data)
    AppState.activeEvent.isCanceled = true
    let canceledEventIndex = AppState.events.findIndex(event => event.id == eventId )
    AppState.events.splice(canceledEventIndex, 1, new TowerEvent(res.data))
  }

  async editEvent(eventId, eventData) {
    logger.log('Editing your event...')
    let eventIndex = AppState.events.findIndex(e => e.id == eventId)
    let res = await api.put(`api/events/${eventId}`, eventData)
    logger.log(res.data)
    AppState.events.splice(eventIndex, 1 , new TowerEvent(res.data))
    AppState.activeEvent = new TowerEvent(res.data)
  }
}

export const eventsService = new EventsService()