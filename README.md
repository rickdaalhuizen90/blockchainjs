# Blockchain JS

## Get started
```
docker-compose up --build
```

## Api

Get blockchain
```bash
curl --location --request GET 'http://localhost:4000/block/'
```

Add block to blockchain
```bash
curl --location --request PUT 'http://localhost:4000/block/' \
--header 'Content-Type: text/plain' \
--data-raw '{
    message: '\''Foo bar'\''
}'
```

Get data from existing block
```bash
curl --location --request GET 'http://localhost:4000/block/0/data'
```

Add data to existing block
```bash
curl --location --request PUT 'http://localhost:4000/block/0/data' \
--header 'Content-Type: text/plain' \
--data-raw '{
    message: '\''Whatsuppp'\''
}'
```

### Resources
- https://github.com/nambrot/blockchain-in-js
- https://github.com/codingtmd/mini-blockchain
- https://github.com/PacktPublishing/Learn-Blockchain-Programming-with-JavaScript