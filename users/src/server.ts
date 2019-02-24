// weird import because express exports commonjs and this is typescript
import express = require('express');
const app = express();

app.get('/ping', (req, res) => {
  res.end('pong');
});

app.listen(8001);