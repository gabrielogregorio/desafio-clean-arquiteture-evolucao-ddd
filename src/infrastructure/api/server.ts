import { app } from '@/infrastructure/api/express';
import dotenv from 'dotenv';

dotenv.config();

// @ts-ignore
const port = Number(process.env.port) || '3333';

app.listen(port, () => {
  console.log(`server running in http://127.0.0.0:${port}`);
});
