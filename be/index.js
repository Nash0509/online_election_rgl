require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const Nominee = require('./models/Nominee');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(async () => {
  await seedDatabase();
}).catch(err => {
  console.error(err);
});

async function seedDatabase() {
  await Nominee.deleteMany({});
  
  const defaultNominees = [
    { id: 1, name: 'Nishant Singh', votes: 0, avatar: 'https://i.pravatar.cc/150?u=nishant' },
    { id: 2, name: 'Nitin Singh', votes: 0, avatar: 'https://i.pravatar.cc/150?u=nitin' },
    { id: 3, name: 'Virat Kohli', votes: 0, avatar: 'https://i.pravatar.cc/150?u=virat' },
    { id: 4, name: 'Prashant Kishore', votes: 0, avatar: 'https://i.pravatar.cc/150?u=prashant' },
    { id: 5, name: 'Ram Navmi', votes: 0, avatar: 'https://i.pravatar.cc/150?u=ram' }
  ];
  await Nominee.insertMany(defaultNominees);
}

io.on('connection', async (socket) => {
  try {
    const nominees = await Nominee.find().sort({ id: 1 });
    socket.emit('initialState', nominees);
  } catch (err) {
    console.error(err);
  }

  socket.on('castVote', async (data) => {
    try {
      const { nomineeId } = data;
      const updatedNominee = await Nominee.findOneAndUpdate(
        { id: nomineeId },
        { $inc: { votes: 1 } },
        { new: true }
      );

      if (updatedNominee) {
        const allNominees = await Nominee.find().sort({ id: 1 });
        io.emit('voteUpdated', allNominees);
      }
    } catch (err) {
      console.error(err);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
