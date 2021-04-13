import { Meteor } from 'meteor/meteor'

Meteor.invoke = (methodName, ...params) => new Promise((resolve, reject) => {
  Meteor.call(methodName, ...params, (err, res) => {
    if (err) {
      err.__methodName = methodName
      err.__params = [...params]
      reject(err)
    } else {
      resolve(res)
    }
  })
})
