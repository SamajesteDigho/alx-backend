import { createClient, print } from 'redis';

const client = createClient();
client.on('error', err => {
  console.log(`Redis client not connected to the server: ${err}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

function hsetAValue(key, field, value) {
  client.hset(key, field, value, (err, reply) => {
    if (err) {
      console.log(err);
    } else {
      print(reply);
    }
  });
}

function get_all(key) {
  client.hgetall(key, (err, reply) => {
    if (err) {
      console.log(err);
    } else {
      console.log(reply);
    }
  });
}

hsetAValue('HolbertonSchool', 'Portland', 50);
hsetAValue('HolbertonSchool', 'Seattle', 50);
hsetAValue('HolbertonSchool', 'New York', 20);
hsetAValue('HolbertonSchool', 'Bogota', 20);
hsetAValue('HolbertonSchool', 'Cali', 40);
hsetAValue('HolbertonSchool', 'Paris', 20);

get_all('HolbertonSchool');
