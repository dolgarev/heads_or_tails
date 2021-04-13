import { Meteor } from 'meteor/meteor'
import { MongoInternals } from 'meteor/mongo'
import { CustomCollectionMixin } from './mixins'

const hasOwnProperty = Object.prototype.hasOwnProperty

export default class CustomCollection extends CustomCollectionMixin() {
  static injectCustomMethods (collection) {
    const _ = new (CustomCollectionMixin())(null)
    const props = new Set(
      Object.getOwnPropertyNames(Object.getPrototypeOf(_))
    )
    props.delete('constructor')

    props.forEach(prop => {
      if (hasOwnProperty.call(collection, prop) === false) {
        collection[prop] = _[prop]
      }
    })
  }

  static injectExtraMethods (collection) {
    const rawCollection = collection.rawCollection()

    const findOneAndUpdate = Meteor.wrapAsync(
      rawCollection.findOneAndUpdate,
      rawCollection
    )

    collection._findOneAndUpdate = function _findOneAndUpdate (...args) {
      const {
        lastErrorObject,
        value
      } = findOneAndUpdate(...args)

      return [
        lastErrorObject.n,
        value,
        lastErrorObject
      ]
    }

    const findOneAndDelete = Meteor.wrapAsync(
      rawCollection.findOneAndDelete,
      rawCollection
    )

    collection._findOneAndDelete = function _findOneAndDelete (...args) {
      const {
        lastErrorObject,
        value
      } = findOneAndDelete(...args)

      return [
        lastErrorObject.n,
        value,
        lastErrorObject
      ]
    }

    const insertMany = Meteor.wrapAsync(
      rawCollection.insertMany,
      rawCollection
    )
    collection.__insertMany = function __insertMany (...args) {
      return insertMany(...args)
    }

    const distinct = Meteor.wrapAsync(
      rawCollection.distinct,
      rawCollection
    )
    collection.__distinct = function __distinct (...args) {
      return distinct(...args)
    }

    const bulkWrite = Meteor.wrapAsync(
      rawCollection.bulkWrite,
      rawCollection
    )
    collection.__bulkWrite = function __bulkWrite (...args) {
      return bulkWrite(...args)
    }

    const count = Meteor.wrapAsync(
      rawCollection.count,
      rawCollection
    )
    collection.__count = function __count (...args) {
      return count(...args)
    }
  }

  static getCollectionByName (name) {
    return MongoInternals.defaultRemoteCollectionDriver().open(name)
  }

  static getDedicatedConnectionOptions () {
    const {
      MONGO_URL,
      MONGO_OPLOG_URL
    } = process.env

    const driver = new MongoInternals.RemoteCollectionDriver(MONGO_URL, {
      oplogUrl: MONGO_OPLOG_URL
    })

    return {
      _driver: driver,
      _suppressSameNameError: true
    }
  }
}
