export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.isCanceled = data.isCanceled || false
    this.type = data.type
    this.name = data.name
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.type = data.type
    this.creator = data.creator
    this.ticketCount = data.ticketCount
  }
}

