# sutro-client [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

A simple and sugary client for using sutro APIs.

## Install

```
npm install sutro-client --save
```

## Example

#### `sutro` Server

```js
{
  user: {
    create: async ({ data }) => User.create(data),
    find: async ({ options }) => User.findAll(options),
    findById: async ({ userId }) => User.findById(userId),
    updateById: async ({ userId, data }) => User.updateById(userId, data),
    replaceById: async ({ userId, data }) => User.replaceById(userId, data),
    deleteById: async ({ userId }) => User.deleteById(userId),

    friend: {
      create: async ({ userId, data }) => {
        const me = await User.findById(userId)
        await me.addFriend(data)
        return me
      },
      find: async ({ userId, options }) => {
        const me = await User.findById(userId)
        return me.findFriends(options)
      },
      findById: async ({ userId, friendId }) => {
        const me = await User.findById(userId)
        return me.findFriendById(friendId)
      }
    }
  }
}
```

#### `sutro-client` Output

```js
import client from 'sutro-client'

const api = client(server.meta)

/*
All functions return promises:

api.user.create()
api.user.find()
api.user.findById()
api.user.updateById()
api.user.replaceById()
api.user.deleteById()
api.user.friend.create()
api.user.friend.find()
api.user.friend.findById()
*/
```

[downloads-image]: http://img.shields.io/npm/dm/sutro-client.svg
[npm-url]: https://npmjs.org/package/sutro-client
[npm-image]: http://img.shields.io/npm/v/sutro-client.svg

[travis-url]: https://travis-ci.org/shastajs/sutro-client
[travis-image]: https://travis-ci.org/shastajs/sutro-client.png?branch=master
