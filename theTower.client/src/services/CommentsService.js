import { AppState } from "../AppState"
import { userComment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{
  async getComments(eventId) {
    logger.log('getting comments...', AppState.userComments)
    let res = await api.get(`api/events/${eventId}/comments`)
    logger.log(res.data)
    AppState.userComments = res.data.map(c => new userComment(c))
  }

  async createComment(commentData) {
    let res = await api.post(`api/comments`, commentData)
    logger.log(res.data)
    AppState.userComments.unshift(new userComment(res.data))
  }

  async deleteComment(commentId) {
    logger.log(commentId)
    let commentIndex = AppState.userComments.findIndex(comment => comment.id == commentId)
    let res = await api.delete(`api/comments/${commentId}`)
    logger.log(res.data)
    AppState.userComments.splice(commentIndex, 1)
  }
}

export const commentsService = new CommentsService()