import mongoose from "mongoose"
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class EventsService {
  async createEvent(eventData) {
    let event = (await dbContext.Events.create(eventData)).populate('ticketCount')
    return event
  }

  async getEvents() {
    let events = await dbContext.Events.find().populate('ticketCount')
    return events
  }

  async getEventById(eventId) {
    let event = (await dbContext.Events.findById(eventId)).populate('ticketCount')
    return event
  }

  async editEvent(formBody) {
    logger.log(formBody, formBody.id)
    let event = await this.getEventById(formBody.id)
    // logger.log(event)
    if (!event) {
      throw new BadRequest('There was no event with ID:' + formBody.id)
    }
    if (event.isCanceled == true) {
      throw new BadRequest('This event is cancelled, you can no longer edit the event!')
    }
    if (event.creatorId != formBody.creatorId) {
      throw new Forbidden('You are not the creator of this event!')
    }
    event.name = formBody.name != undefined ? formBody.name : event.name
    event.description = formBody.description != undefined ? formBody.description : event.description
    event.coverImg = formBody.coverImg != undefined ? formBody.coverImg : event.coverImg
    event.location = formBody.location != undefined ? formBody.location : event.location
    event.capacity = formBody.capacity != undefined ? formBody.capacity : event.capacity
    event.startDate = formBody.startDate != undefined ? formBody.startDate : event.startDate
    // event.isCanceled = formBody.isCanceled != undefined ? formBody.isCanceled : event.isCanceled CANNOT EDIT EVENTS TO A CANCEL WITHOUT USING ROUTE
    event.type = formBody.type != undefined ? formBody.type : event.type
    //TODO need to add the Ticket count as a virtual to the object
    await event.save()
    logger.log(event)

    return event
  }

  async cancelEvent(eventId, accountId) {
    let eventCancel = await this.getEventById(eventId)
    if (!eventCancel) {
      throw new BadRequest('There was no event with the requested ID:' + eventId)
    }
    if (eventCancel.creatorId != accountId) {
      throw new Forbidden('You are not the creator of this event!')
    }
    // This breaks the postman, because the creator ID does not match the accountId passed by postman....
    eventCancel.isCanceled = !eventCancel.isCanceled
    await eventCancel.save()
    return eventCancel
  }

}

export const eventsService = new EventsService()