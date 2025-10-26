import { Server } from 'http';
import { envVars } from './app/config/env.config';
import app from './app';
import { connectDatabase } from './app/config/database.config';


let server: Server;


const startServer = async () => {
      try {
            await connectDatabase();
            server = app.listen(envVars.PORT, () => {
                  console.log(`Server running on port: ${envVars.PORT} in ${envVars.NODE_ENV} mode`)
            });
      } catch (error) {
            console.log(error);
      }
};
startServer();

