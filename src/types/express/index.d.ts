// src/types/express/index.d.ts
// reference : https://blog.logrocket.com/extend-express-request-object-typescript/

import IUser from '../user'

// to make the file a module and avoid the TypeScript error
export {}

declare global {
    namespace Express {
     interface Request {
        user?:IUser
     }
    }
}