/*global it: true, describe: true */
/*eslint no-console: 0*/

import should from 'should'
import sutro from 'sutro'
import express from 'express'
import createClient from '../src'

const app = express()
const server = sutro({
  base: '/api',
  resources: {
    user: {
      create: async ({ data }) => data,
      find: async () => [ { id: '123' } ],
      findById: async ({ userId }) => ({ id: userId }),
      updateById: async ({ userId, data }) => ({ ...data, id: userId }),
      replaceById: async ({ userId, data }) => ({ id: userId, ...data }),
      deleteById: async ({ userId }) => ({ id: userId }),

      friend: {
        create: async ({ userId, data }) => {
          return {
            id: userId,
            friends: [ data.id ]
          }
        },
        find: async ({ userId }) => {
          return [
            { id: '123', friends: [ userId ] },
            { id: '456', friends: [ userId ] }
          ]
        },
        findById: async ({ userId, friendId }) => {
          return { id: friendId, friends: [ userId ] }
        }
      }
    }
  }
})
app.use('/api', server)
app.listen(3030)

const client = createClient(server.meta, {
  rootUrl: 'http://localhost:3030/api'
})

describe('sutro-client', () => {
  it('should create from meta', async () => {
    should.exist(client)
    console.log(client)
  })
})
