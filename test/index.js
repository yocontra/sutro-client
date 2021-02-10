/*eslint no-console: 0*/
import should from 'should'
import sutro, { rewriteLargeRequests } from 'sutro'
import express from 'express'
import bodyParser from 'body-parser'
import compress from 'compression'
import getPort from 'get-port'
import createClient from '../src/node'

const bigUrlLength = 512000

const resources = {
  user: {
    create: async ({ data }) => data,
    find: async ({ options = {} } = {}) => {
      if (options.error) throw new Error('Heh')
      return [ { id: '123' } ]
    },
    findById: async ({ userId }) => ({ id: userId }),
    updateById: async ({ userId, data }) => ({ ...data, id: userId }),
    replaceById: async ({ userId, data }) => ({ id: userId, ...data }),
    deleteById: async ({ userId }) => ({ id: userId }),

    friend: {
      create: async ({ userId, data }) => ({
        id: userId,
        friends: [ data.id ]
      }),
      find: async ({ userId }) => [
        { id: '123', friends: [ userId ] },
        { id: '456', friends: [ userId ] }
      ],
      findById: async ({ userId, friendId }) => ({
        id: friendId,
        friends: [ userId ]
      })
    }
  }
}
let port, app, server, http, client

describe('sutro-client', () => {
  before(async () => {
    port = await getPort()
    app = express()
    server = sutro({
      base: '/api',
      resources
    })
    app.use(rewriteLargeRequests)
    app.use(bodyParser.json({ limit: '1mb' }))
    app.use(compress())
    app.use('/api', server)
    http = app.listen(port)
    client = createClient(server.meta, {
      root: `http://localhost:${port}`
    })
  })
  after(() => http.close())
  it('should create from meta', async () => {
    should.exist(client)
  })
  it('should expose getOptions on functions', () => {
    const options = { data: { id: '123' } }
    const res = client.user.create.getOptions(options)
    res.should.eql({
      url: `http://localhost:${port}/api/users`,
      method: 'post',
      root: `http://localhost:${port}`,
      data: { id: '123' }
    })
  })
  it('should work on user.create', async () => {
    const options = { data: { id: '123' } }
    const { body } = await client.user.create(options)
    const expected = await resources.user.create(options)
    body.should.eql(expected)
  })
  it('should work on user.find', async () => {
    const { body } = await client.user.find()
    const expected = await resources.user.find()
    body.should.eql(expected)
  })
  it('should work on user.findById', async () => {
    const options = { userId: '123' }
    const { body } = await client.user.findById(options)
    const expected = await resources.user.findById(options)
    body.should.eql(expected)
  })
  it('should work on user.updateById', async () => {
    const options = { userId: '123', data: { name: 'bob' } }
    const { body } = await client.user.updateById(options)
    const expected = await resources.user.updateById(options)
    body.should.eql(expected)
  })
  it('should work on user.replaceById', async () => {
    const options = { userId: '123', data: { name: 'bob' } }
    const { body } = await client.user.replaceById(options)
    const expected = await resources.user.replaceById(options)
    body.should.eql(expected)
  })

  it('should work on user.friend.create', async () => {
    const options = { userId: '456', data: { id: '123' } }
    const { body } = await client.user.friend.create(options)
    const expected = await resources.user.friend.create(options)
    body.should.eql(expected)
  })
  it('should work on user.friend.find', async () => {
    const options = { userId: '123' }
    const { body } = await client.user.friend.find(options)
    const expected = await resources.user.friend.find(options)
    body.should.eql(expected)
  })
  it('should work on user.friend.findById', async () => {
    const options = { userId: '123', friendId: '456' }
    const { body } = await client.user.friend.findById(options)
    const expected = await resources.user.friend.findById(options)
    body.should.eql(expected)
  })
  it('should work on user.friend.findById and override', async () => {
    const bigString = Buffer.alloc(bigUrlLength, 'a').toString('utf8') // 512kb - well over our 4kb limit
    const options = {
      rewriteLargeRequests: true,
      userId: '123',
      friendId: '456',
      options: {
        filter: bigString
      }
    }
    const { body } = await client.user.friend.findById(options)
    const expected = await resources.user.friend.findById(options)
    body.should.eql(expected)
  })
  it('should work on user.friend.findById in simple mode', async () => {
    const options = { userId: '123', friendId: '456', simple: true }
    const body = await client.user.friend.findById(options)
    const expected = await resources.user.friend.findById(options)
    body.should.eql(expected)
  })

  it('should report errors properly', (done) => {
    client.user.find({ options: { error: true } }).catch((err) => {
      should.exist(err)
      should.exist(err.res)
      done()
      return null
    })
  })
  it('should report path errors properly', (done) => {
    const options = { data: { id: '123' } }
    client.user.friend.create(options)
      .then(() => {
        done(new Error('Did not throw!'))
      })
      .catch((err) => {
        should.exist(err)
        done()
      })
  })
})
