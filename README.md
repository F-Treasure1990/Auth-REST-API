# Authentication REST API with Node.js, TypeScript, Typegoose & Zod

## Features
1. Register a user
2. Verify user's email address
3. Send forgot password email
4. Reset password
5. Get current user
6. Login
7. Access token
8. Refresh tokens


## What tools were used?
- [Postman](https://www.postman.com/downloads/) - platform to design, build, test and iterate API's
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Interactive tool for MongoDB data

## What technologies were used?
- [TypeScript](https://www.typescriptlang.org/) - Static tye checking 
- [Express@5](https://expressjs.com/en/5x/api.html) - Web server
- [Typegoose](https://typegoose.github.io/typegoose/) - Mongoose wrapper for creating TypeScript interfaces and models
- [argon2](https://github.com/ranisalt/node-argon2#readme) - Password hashing
- [Zod](https://github.com/colinhacks/zod) - Validation
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Signing and verifying JSON web tokens
- [Nodemailer](https://nodemailer.com/about/) - Sending emails
- [Pino](https://github.com/pinojs/pino) - Logging
- [config](https://github.com/lorenwest/node-config) - Managing configuration

## Packages
```json
{
    "devDependencies": {
    "@types/config": "^3.3.0",
    "@types/express": "^4.17.13",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/lodash": "^4.14.182",
    "@types/nodemailer": "^6.4.4",
    "pino-pretty": "^8.1.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^4.7.4"
  },
  "dependencies": {
    "@typegoose/typegoose": "^9.11.0",
    "argon2": "^0.28.7",
    "config": "^3.3.7",
    "dayjs": "^1.11.4",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "lodash": "^4.17.21",
    "mongoose": "^6.5.0",
    "nanoid": "3.3.4",
    "nodemailer": "^6.7.7",
    "pino": "^8.3.1",
    "zod": "^3.17.10"
  }
}
```

