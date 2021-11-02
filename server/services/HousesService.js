import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class HousesService {
  async getAll(query = {}) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }

  async create(body) {
    const house = await dbContext.Houses.create(body)
    return house
  }
}

export const housesService = new HousesService()
