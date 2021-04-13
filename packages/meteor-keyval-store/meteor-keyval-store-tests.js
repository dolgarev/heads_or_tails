import { Tinytest } from 'meteor/tinytest'
import KeyValStore from 'meteor/liberation:keyval-store'

const store = new (KeyValStore())('__dummy_kv_store__')

Tinytest.add('keyval-store - setSet', function (test) {
  test.isUndefined(store.setItem('test1', 123))
})

Tinytest.add('keyval-store - getItem', function (test) {
  test.equal(store.getItem('test1'), 123)
})

Tinytest.add('keyval-store - incItem', function (test) {
  test.equal(store.incItem('test1'), 124)
  test.equal(store.incItem('test1', 6), 130)
})

Tinytest.add('keyval-store - decItem', function (test) {
  test.equal(store.decItem('test1'), 129)
  test.equal(store.decItem('test1', 6), 123)
})

Tinytest.add('keyval-store - deleteItem', function (test) {
  test.equal(store.deleteItem('test1'), 123)
  test.isUndefined(store.getItem('test1'))
})

Tinytest.add('keyval-store - getItem with default value', function (test) {
  test.isNull(store.getItem('test1', null))
  test.equal(store.getItem('test1', 0), 0)
  test.equal(store.getItem('test1', false), false)
  test.equal(store.getItem('test1', ''), '')
})

Tinytest.add('keyval-store - incCounter', function (test) {
  test.isUndefined(store.setItem('test2', -1))
  test.isUndefined(store.incCounter('test2'))
  test.equal(store.setItem('test2', 0), -1)
  test.equal(store.incCounter('test2'), 1)
})

Tinytest.add('keyval-store - decCounter', function (test) {
  test.isUndefined(store.setItem('test3', -1))
  test.isUndefined(store.decCounter('test3'))
  test.equal(store.setItem('test3', 1), -1)
  test.equal(store.decCounter('test3'), 0)
  test.isUndefined(store.decCounter('test3'))
})

Tinytest.add('keyval-store - incItem with upsert', function (test) {
  test.equal(store.incItem('test_x1'), 1)
})

Tinytest.add('keyval-store - decItem with upsert', function (test) {
  test.equal(store.decItem('test_x2'), -1)
})
