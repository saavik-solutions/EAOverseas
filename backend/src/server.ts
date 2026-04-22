import 'dotenv/config';
import { buildApp } from './app';

const start = async () => {
  try {
    const app = await buildApp();
    const port = Number(process.env.PORT) || 4000;
    
    await app.listen({ 
      port, 
      host: '0.0.0.0' 
    });
    
    console.log(`🚀 Server directly connected to frontend, listening on port ${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
