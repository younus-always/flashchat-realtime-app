import { Server } from 'http';
import { envVars } from './app/config/env';
import app from './app';


let server: Server;


const startServer = async () => {
      try {
            server = app.listen(envVars.PORT, () =>
                  console.log(`Server running on port: ${envVars.PORT}`));
      } catch (error) {
            console.log(error);
      }
};
startServer();

