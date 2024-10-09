import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const list = [
  {
    id: 1, name: 'Suitcase 250', price: 50, stock: 4,
  },
  {
    id: 2, name: 'Suitcase 450', price: 100, stock: 10,
  },
  {
    id: 3, name: 'Suitcase 650', price: 350, stock: 2,
  },
  {
    id: 4, name: 'Suitcase 1050', price: 550, stock: 5,
  },
];

const app = express();
const PORT = 1245;
const redisClient = createClient();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

function getItemById(id) {
  for (const elt in list) {
    if (list[elt].id === id) {
      return list[elt];
    }
  }
  return null;
}

function reserveStockById(itemId, stock) {
  redisClient.set(itemId, stock, (err, res) => {
    if (err) {
      console.log('Error: Could not set in redis');
    } else {
      console.log(`[${res}] Item of id: ${itemId} set with stock ${stock}.`);
    }
  });
}

async function getCurrentReservedStockById(itemId) {
  try {
    const nb = await promisify(redisClient.get).bind(redisClient)(itemId);
    if (nb) {
      return parseInt(nb, 10);
    }
    return 0;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

app.get('/list_products', (req, res) => {
  const data = [];
  list.forEach((elt) => {
    data.push({
      itemId: elt.id,
      itemName: elt.name,
      price: elt.price,
      initialAvailableQuantity: elt.stock,
    });
  });
  res.send(data);
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);
  const data = {};
  if (item) {
    const reserveStock = await getCurrentReservedStockById(itemId);
    data.itemId = item.id;
    data.itemName = item.name;
    data.price = item.price;
    data.initialAvailableQuantity = item.stock;
    data.currentQuantity = reserveStock;
    res.send(data);
  } else {
    data.status = 'Product not found';
    res.send(data);
  }
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);
  const data = {};
  if (item) {
    const reserveStock = await getCurrentReservedStockById(itemId);
    if (reserveStock < 1) {
      data.status = 'Not enough stock available';
      data.itemId = itemId;
      res.send(data);
    } else {
      reserveStockById(item, reserveStock - 1);
      data.status = 'Reservation confirmed';
      data.itemId = item.id;
      res.send(data);
    }
  } else {
    data.status = 'Product not found';
    res.send(data);
  }
});
