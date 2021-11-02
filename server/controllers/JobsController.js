import { Auth0Provider } from '@bcwdev/auth0provider'
import { jobsService } from '../services/JobsService'
import BaseController from '../utils/BaseController'

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const jobs = await jobsService.getAll(query)
      return res.send(jobs)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const job = await jobsService.getById(req.params.id)
      return res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const job = await jobsService.create(req.body)
      return res.send(job)
    } catch (error) {
      next(error)
    }
  }
}
