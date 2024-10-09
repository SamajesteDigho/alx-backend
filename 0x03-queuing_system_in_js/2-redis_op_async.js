import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('error', err => {
  console.log(`Redis client not connected to the server: ${err}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      print(err);
    } else {
      print(`Reply: ${reply}`);
    }
  });
}

async function displaySchoolValue(schoolName) {
  try {
    const res = await promisify(client.get).bind(client)(schoolName);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
