require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const Nominee = require('./models/Nominee')

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*' }
})

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await seed()
}).catch(e => console.log(e))

async function seed() {
  await Nominee.deleteMany({})
  
  let docs = [
    { id: 1, name: 'Nishant Singh', votes: 0, avatar: 'https://identicons.github.com/nishant.png' },
    { id: 2, name: 'Nitin Singh', votes: 0, avatar: 'https://identicons.github.com/nitin.png' },
    { id: 3, name: 'Virat Kohli', votes: 0, avatar: 'https://identicons.github.com/virat.png' },
    { id: 4, name: 'Prashant Kishore', votes: 0, avatar: 'https://identicons.github.com/prashant.png' },
    { id: 5, name: 'Ram Navmi', votes: 0, avatar: 'https://identicons.github.com/ram.png' }
  ]
  await Nominee.insertMany(docs)
}

io.on('connection', async (socket) => {
  let noms = await Nominee.find().sort({ id: 1 })
  socket.emit('initialState', noms)

  socket.on('castVote', async (payload) => {
    let res = await Nominee.findOneAndUpdate(
      { id: payload.nomineeId },
      { $inc: { votes: 1 } },
      { new: true }
    )

    if (res) {
      let all = await Nominee.find().sort({ id: 1 })
      io.emit('voteUpdated', all)
    }
  })
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log("server on", port))
