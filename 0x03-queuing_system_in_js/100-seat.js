import { createClient } from 'redis';
import { createQueue } from 'kue';
import express from 'express';
import { promisify } from 'util';

const redisClient = createClient();

function reserveSeat(number) {
  redisClient.set('available_seats', number, (err, msg) => {
    if (err) {
      console.log('Error');
    } else {
      console.log(`[${msg}] Seats Available seats ${number}`);
    }
  });
}

async function getCurrentAvailableSeats() {
  try {
    const nb = await promisify(redisClient.get).bind(redisClient)('available_seats');
    if (nb) {
      return parseInt(nb, 10);
    }
    return 0;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

reserveSeat(50);
let reservationAvailable = true;
const queue = createQueue();

const app = express();
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server open and listening to ${PORT}`);
});

app.get('/available_seats', async (req, res) => {
  const seats = await getCurrentAvailableSeats();
  const data = {
    numberOfAvailableSeats: seats,
  };
  res.send(data);
});

app.get('/reserve_seat', async (req, res) => {
  const data = {};
  if (reservationAvailable) {
    const job = queue.create('reserve_seat');
    job.save();
    job.on('enqueue', () => {
      data.status = 'Reservation in process';
      res.send(data);
    });
    job.on('error', () => {
      data.status = 'Reservation failed';
    });
    job.on('complete', () => {
      console.log(`Seat reservation job ${job.id} completed`);
    });
    job.on('failed', (err) => {
      console.log(`Seat reservation job ${job.id} failed: ${err}`);
    });
  } else {
    data.status = 'Reservations are blocked';
    res.send(data);
  }
});

app.get('/process', async (req, res) => {
  const data = {};
  queue.process('reserve_seat', async (job, done) => {
    let seats = await getCurrentAvailableSeats();
    reserveSeat(seats - 1);
    seats = await getCurrentAvailableSeats();
    if (seats === 0) {
      reservationAvailable = false;
    }
    if (seats > 0) {
      done();
    } else {
      done(new Error('Not enough seats available'));
    }
  });
  data.status = 'Queue processing';
  res.send(data);
});
