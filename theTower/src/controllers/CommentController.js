import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.deleteComment)
  }

  async getCommentsByEvent(req, res, next) {
    try {
      let comments = await commentsService.getCommentsByEvent()
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      let commentBody = req.body
      commentBody.creatorId = req.userInfo.id
      // commentBody.eventId = req.params.eventId
      const comment = await commentsService.createComment(commentBody)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async deleteComment(req, res, next) {
    try {
      let commentId = req.params.commentId
      let userId = req.userInfo.id
      const message = await commentsService.deleteComment(commentId, userId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }

}