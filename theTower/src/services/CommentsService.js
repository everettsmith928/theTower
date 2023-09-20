import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { ticketsService } from "./TicketsService.js"

class CommentsService {
  async createComment(commentBody) {
    logger.log('Writing comment..')
    const isAttending = await ticketsService.getTicketsByAccount(commentBody.creatorId)
    // We need to check if the user is attending the event through our ticket Service
    if (!isAttending) {
      throw new Forbidden('You are not able to comment on an event that you are not attending!')
    }
    commentBody.isAttending = true
    const comment = await dbContext.Comments.create(commentBody)
    await comment.populate('creator')
    logger.log(comment)
    return comment
  }

  async getCommentsByEvent(eventId) {
    logger.log('Getting all comments for event with ID:' + eventId)
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return comments
  }

  async deleteComment(commentId, userId) {
    logger.log('Deleting your comment ' + commentId)
    const deletedComment = await dbContext.Comments.findById({ _id: commentId }).populate('creator')
    logger.log(deletedComment)
    if (deletedComment.creatorId != userId) {
      throw new Forbidden('This is not your comment to delete..')
    }
    if (!deletedComment) {
      throw new BadRequest('This comment no longer exists!')
    }
    await deletedComment.remove()
    return `You successfully deleted the comment..`
  }
}

export const commentsService = new CommentsService()