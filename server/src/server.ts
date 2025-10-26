import { Server } from 'http';
import { envVars } from './app/config/env.config';
import app from './app';


let server: Server;


const startServer = async () => {
      try {
            server = app.listen(envVars.PORT, () =>
                  console.log(`Server running on port: ${envVars.PORT} in ${envVars.NODE_ENV} mode`));
      } catch (error) {
            console.log(error);
      }
};
startServer();

