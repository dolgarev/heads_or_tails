import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

const UNDEF = void 0

export default (superclass = Mongo.Collection) => class extends superclass {
  constructor (...args) {
    super(...args)
    this._coll = this.rawCollection()
  }

  getItem (key, defaultVal) {
    const res = this.findOne(key, { fields: { val: 1 } })
    return res === UNDEF
      ? defaultVal
      : res.val
  }

  setItem (key, val) {
    const res = Meteor.wrapAsync(callback => {
      this._coll.findOneAndUpdate({
        _id: key
      }, {
        $set: { val }
      }, {
        upsert: true
      }, callback)
    })()
    return res.value === null ? UNDEF : res.value.val
  }

  deleteItem (key) {
    const res = Meteor.wrapAsync(callback => {
      this._coll.findOneAndDelete({ _id: key }, {}, callback)
    })()
    return res.value === null ? UNDEF : res.value.val
  }

  hasItem (key) {
    return !!this.findOne(key)
  }

  incCounter (key, step = 1) {
    const res = Meteor.wrapAsync(callback => {
      this._coll.findOneAndUpdate({
        _id: key,
        val: step > 0 ? { $gte: 0 } : { $gt: 0 }
      }, {
        $inc: { val: step }
      }, {
        projection: { val: 1 },
        returnOriginal: false
      }, callback)
    })()
    return res.value === null ? UNDEF : res.value.val
  }

  incItem (key, step = 1, isUpsert = true) {
    const res = Meteor.wrapAsync(callback => {
      this._coll.findOneAndUpdate({
        _id: key
      }, {
        $inc: { val: step }
      }, {
        projection: { val: 1 },
        returnOriginal: false,
        upsert: !!isUpsert
      }, callback)
    })()
    return res.value === null ? UNDEF : res.value.val
  }

  decCounter (key, step = -1) {
    step = step <= 0 ? step : -Math.abs(step)
    return this.incCounter(key, step)
  }

  decItem (key, step = -1, isUpsert = true) {
    step = step <= 0 ? step : -Math.abs(step)
    return this.incItem(key, step, isUpsert)
  }
}
