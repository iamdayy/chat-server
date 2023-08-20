import { Config } from "./src/types";
import { userschema } from "./src/types/Schemas";
// import { Request } from "express"

// export namespace Express {
//     interface Request {
//         user: userschema;
//     }
// }
// export namespace NodeJS {
//       interface ProcessEnv {
//     }
// }


declare global {
  namespace Express {
      interface User extends userschema {}
  }
    namespace NodeJS {
        interface ProcessEnv extends Config {
    }
  }
}

declare module 'socket.io' {
  interface Socket {
      username: string | string[];
  }
}
  export {};