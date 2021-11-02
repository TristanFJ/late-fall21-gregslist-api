import { Auth0Provider } from '@bcwdev/auth0provider'
import { housesService } from '../services/HousesService'
import BaseController from '../utils/BaseController'

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const houses = await housesService.getAll(query)
      return res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const house = await housesService.create(req.body)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }
}
