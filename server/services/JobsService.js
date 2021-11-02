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

  async edit(body) {
    const job = await this.getById(body.id)
    if (job.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('access denied')
    }
    const update = dbContext.Jobs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return update
  }

  async remove(carId, userId) {
    const job = await this.getById(carId)
    if (job.creatorId.toString() !== userId) {
      throw new Forbidden('access denied')
    }
    await dbContext.Jobs.findByIdAndDelete(carId)
  }
}

export const jobsService = new JobsService()
