import { AppState } from "../AppState"
import { TowerEvent } from "../models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService{
  async getEvents(){
    let res = await api.get('api/events')
    logger.log(res.data)
    AppState.events = res.data.map(event => new TowerEvent(event))
    logger.log(AppState.events)
  }
}

export const eventsService = new EventsService()