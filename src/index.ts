import Express, { Request, Response } from "express";
import createError from "http-errors";
import { createServer } from "http";
import Socket from "./plugins/socket";
import connect from "./plugins/databases";
import router from "./routes";
import initPassport from "./plugins/passport";
import configuration from "./services/config";
import { sendEmail } from "./services/mailer";
import HTML_TEMPLATE from "./assets/html-template";



const app = Express();
const server = createServer(app);



app.use(Express.json());
// Set up Passport
initPassport(app);

// TODO: Routing aplikasi akan kita tulis di sini
app.use("/api" ,router);


// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

server.listen(configuration.PORT, async () => {
  Socket(server);
  await connect
  console.log(`⚡️[server]: Server is running at http://localhost:${configuration.PORT}`)
})