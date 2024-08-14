
const db = require("../db/queries");

async function routes (fastify, options) {
  fastify.get('/dashboard/trades', async (request, reply) => {
      const strategies = await db.getAllStrategies()
      reply.status(200).send(strategies)
  })

  fastify.post('/dashboard/trades', async (request, reply) => {
      const body = request.body

      const id = await db.insertStrategy(body);
      await db.insertTrades(body, id);
  
      reply.status(201).send(body)
  })

  fastify.put('/dashboard/trades', async (request, reply) => {
    const id = request.params
    console.log(id);

})
}

module.exports = routes

// const tradesRouter = require('express').Router()
// const Trade = require('../models/trade')

// tradesRouter.get('/trades', async (request, response) => { 
//   const strategies = await db.getAllStrategies()
//   // const strategies = await db.getAllStrategies()
//   response.json(strategies)
// })

// tradesRouter.post('/trades', async (request, response) => {
//   const body = request.body

//   const strategy = await db.insertStrategy(body);
//   const trade = await db.insertTrades(body, strategy);
//   // const strategyName = Object.keys(body)[0]
//   // const trade = body[strategyName][0]
//   // const insertTrade = await db.insertTrade(trade, strategy);
  
//   // console.log(trade);
//   response.status(201).json(trade)
// })

// tradesRouter.get('/', async (request, response) => { 
//   const trades = await Trade.find({})
//   response.json(trades)
// })

// tradesRouter.post('/', async (request, response) => {
//   const body = request.body

//   const trade = new Trade({
//     content: body.content,
//     important: body.important || false,
//   })

//   const savedTrade = await trade.save()
//   response.status(201).json(savedTrade)
// })

// tradesRouter.get('/:id', async (request, response) => {
//   const trade = await Trade.findById(request.params.id)
//   if (trade) {
//     response.json(trade)
//   } else {
//     response.status(404).end()
//   }
// })

// tradesRouter.delete('/:id', async (request, response) => {
//   await Trade.findByIdAndDelete(request.params.id)
//   response.status(204).end()
// })

// tradesRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const trade = {
//     content: body.content,
//     important: body.important,
//   }

//   Trade.findByIdAndUpdate(request.params.id, trade, { new: true })
//     .then(updatedTrade => {
//       response.json(updatedTrade)
//     })
//     .catch(error => next(error))
// })

// module.exports = tradesRouter