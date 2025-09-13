require('dotenv').config();
const http = require('http');
const connectDB = require('./src/config/db');
const app = require('./src/app');
const { PORT = 5000 } = require('./src/config/env');

(async () => {
  await connectDB();
  const server = http.createServer(app);
  server.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
})();