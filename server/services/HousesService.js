import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class HousesService {
  async getAll(query = {}) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }

  // REVIEW not totally confident on how to use populate on houses. Will try to use later
  async create(body) {
    const house = await dbContext.Houses.create(body)
    return house
  }

  async getById(id) {
    const house = await dbContext.Houses.findById(id)
    if (!house) {
      throw new BadRequest('invalid house id')
    }
    return house
  }
}

export const housesService = new HousesService()
