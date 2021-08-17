/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import { MongoHelper } from 'src/infra/db';

const port = process.env.PORT || 80;

MongoHelper.connect(process.env.MONGODB)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(port, () => console.log(`Server running at ${port}`));
  })
  .catch(console.error);
