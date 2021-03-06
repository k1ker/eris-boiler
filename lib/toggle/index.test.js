import test from 'ava'

import {
  Toggle,
  DataClient
} from '..'

require('dotenv').load()

const client = new DataClient()

const clientTest = {
  name: 'Super-Bot',
  prettyName: 'superBot',
  _onChange: () => console.log('something changed...')
}

test.before((t) => {
  t.context.Toggle = new Toggle(clientTest)
  client.toggles.set(clientTest.name, clientTest)
})

test('enable', (t) => {
  t.is(t.context.Toggle.enable(client), `${clientTest.name} set to true!`)
})

test('disable', (t) => {
  t.is(t.context.Toggle.disable(client), `${clientTest.name} set to false!`)
})
