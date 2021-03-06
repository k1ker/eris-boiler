import test from 'ava'
import sinon from 'sinon'

import {
  Orator,
  DataClient,
  Command,
  Permission,
  Logger
} from '..'

require('dotenv').load()

const Client = new DataClient()

const permission = new Permission({
  name: 'Guild Owner',
  level: 80,
  check: async (member) => member === null
})

Client.permissions.set(permission.name, permission)

const command = new Command(Client, {
  name: 'test',
  description: 'test description',
  run: () => console.log('hi'),
  options: {
    permission: 'Guild Owner'
  }
})

test.before((t) => {
  t.context.Orator = new Orator(Logger)
})

test.beforeEach((t) => {
  t.context.log = sinon.spy(console, 'log')
  Client.commands.set(command.name, command)
})

test.afterEach((t) => {
  t.context.log.restore()
  Client.permissions.delete(permission.name)
  Client.commands.delete(command.name)
})

test.serial('canExecute', async (t) => {
  t.is(await t.context.Orator._canExecute(Client, command, ['test'], permission, {
    member: null
  }), true)
})

test.serial('getCommand', (t) => {
  t.is(t.context.Orator._getCommand(Client, 'test'), command)
})

test.serial('Command by user', (t) => {
  const msg = {
    content: '!test',
    member: {
      id: 'testing_id'
    }
  }
  const mockClient = {
    user: {
      id: 'other_testing_id'
    }
  }
  t.is(t.context.Orator._isCommandByUser(mockClient, msg, '!'), true)
})

test.serial('Is guild', (t) => {
  const msg = {
    channel: {
      guild: true
    }
  }
  t.is(t.context.Orator._isGuild(msg), true)
})

test.serial('Parse response', (t) => {
  const resp = {
    content: null,
    embed: null,
    file: null
  }
  t.deepEqual(t.context.Orator._parseResponse(resp), {
    content: {
      content: '',
      embed: null
    },
    file: null
  })
})

test.serial('Speed logs', async (t) => {
  t.context.Orator._start = 0
  t.context.Orator._speedLog('test')
  t.true(t.context.log.calledOnce)
})

/* Process Message thingy(That stonic didn't want to do)...
 test.serial('', async t => {
     const message = {
         content: 'test',
         member: null,
         channel: {
             createMessage: (...params) => new Promise((resolve, reject) => {
                if (!params) {
                     reject(new Error('No params'))
                } else {
                  resolve(message)
                }
             })
        }
    }
})
*/
