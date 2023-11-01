import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true },
  eventId: { type: Schema.Types.ObjectId, required: true },
  body: { type: String, required: true, maxLength: 2000 },
  isAttending: { type: Boolean, required: true },
},
  { timestamps: true, toJSON: { virtuals: true } })


CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})