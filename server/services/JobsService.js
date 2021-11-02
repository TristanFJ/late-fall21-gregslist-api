import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class JobsService {
  async getAll(query = {}) {
    const jobs = await dbContext.Jobs.find(query).populate('creator', 'name picture')
    return jobs
  }

  async getById(id) {
    const job = await dbContext.Jobs.findById(id).populate('creator', 'name picture')
    if (!job) {
      throw new BadRequest('Invalid Job ID')
    }
    return job
  }

  async create(body) {
    const job = await dbContext.Jobs.create(body)
    return job
  }
}

export const jobsService = new JobsService()
