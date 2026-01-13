import { Server } from 'http';
import { envVars } from './app/config/env.config';
import { connectDatabase } from './app/config/database.config';
import { server } from "./app"

let appServer: Server;


const startServer = async () => {
      try {
            await connectDatabase();
            appServer = server.listen(envVars.PORT, () => {
                  console.log(`Server running on port: ${envVars.PORT} in ${envVars.NODE_ENV} mode`)
            });
      } catch (error) {
            console.log(error);
      }
};
startServer();

