import app from './app.js';
import { config } from './config/index.js';

const server = app.listen(config.port, () => {
  console.log(`গ্রামবাংলা Backend API running at: http://localhost:${config.port}`);
});

export default server;

