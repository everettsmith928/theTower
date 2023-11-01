export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.name = data.name
    this.description = data.description
    this.isCanceled = data.isCanceled || false
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate)
    this.type = data.type
    this.creator = data.creator
    this.ticketCount = data.ticketCount
  }
}

