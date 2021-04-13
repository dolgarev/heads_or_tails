import { Mongo } from 'meteor/mongo'

export const CustomCollectionMixin = (superclass = Mongo.Collection) => class extends superclass {
  aggregateData (...args) {
    const hrStart = process.hrtime()
    const res = this.aggregate(...args)
    const hrEnd = process.hrtime(hrStart)

    return [
      res,
      hrEnd[0], // in secs
      hrEnd[1] / 1e6 // in ms
    ]
  }
}
