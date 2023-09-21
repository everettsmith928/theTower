import mongoose, { Schema } from "mongoose";

export const EventSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 5000 },
  coverImg: { type: String, required: true, maxLength: 5000 },
  location: { type: String, required: true, maxLength: 50 },
  capacity: { type: Number, required: true, max: 5000000 },
  startDate: { type: Date, required: true, },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital', 'expositions', 'exhibits'], required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'eventId',
  ref: 'Ticket',
  count: true
})
