import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

type Bindings = {
  CACHE_KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

app.post('/set/:key', async (c) => {
  const key = c.req.param('key')
  const value = await c.req.json()
  if (!key || !value) {
    throw new HTTPException(400, {message: "need both key and value for this request"})
  }
  await c.env.CACHE_KV.put(key, JSON.stringify(value))
  return c.text(`Key set succesfully!`)
})

app.get('/get/:key', async (c) => {
  const key = c.req.param('key')
  if (!key) {
    throw new HTTPException(400, {message: "need key for this request"})
  }
  const value = await c.env.CACHE_KV.get(key)
  return c.json(value ? JSON.parse(value) : null)
})

export default app
