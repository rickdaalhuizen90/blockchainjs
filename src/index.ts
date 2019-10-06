import Blockchain from './Blockchain';
import {Block} from './Block';
import express from 'express';
import bp from 'body-parser';

const app = express();
const port = 4000;
const blockchain = new Blockchain();

const getBlockByUid = (uid: number) => {
  return blockchain.chain.find(block => block.uid === uid);
}

/**
 * Start Server
 */
 app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * Index
 */
app.get('/', (req, res) => {
  res.send('My Awesome Blockchain :)')
});

/** 
 * Get Blockchain
 */
app.get('/block', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    valid: blockchain.checkValid(),
    chain: blockchain.chain,
  }));
});

/**
 * Create new Block
 */
app.put('/block', (req, res) => {
  const timestamp = new Date().getTime();
  const data = req.body;

  const block = new Block(blockchain.chain.length, timestamp, [data]);
  blockchain.addBlock(block);

  res.status(200).json({
    status: 'succes',
    data: req.body,
  })
});

/**
 * Add Data to Block
 */
app.get('/block/:uid/data', (req, res) => {
  const uid = req.params.uid
  const block = getBlockByUid(parseInt(req.params.uid));

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(block));

  res.status(200).json({
    status: 'succes',
    data: req.body,
  });
});

/**
 * Get Block Data
 */
app.put('/block/:uid/data', (req, res) => {
  const uid = req.params.uid
  const block = getBlockByUid(parseInt(uid));

  if (!block) {
    return res.status(400).json({
      status: 'error',
      error: 'req body cannot be empty',
    });
  }

  block.data.push(req.body);
  res.status(200).json({
    status: 'succes',
    data: req.body,
  });
});
