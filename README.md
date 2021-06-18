## NestJS-Mongo Authentication Starter Extended Version

A starter code for NestJS REST API authentication using Mongo(ose/DB), aiming at quick start on the project, Being the authentication is a most tedious activity for any project. 
This starter code allows you to focus on the other project aspects, while providing Auth guard and Role guard implemented.

This repository contains the following features.

- As NestJs FW project, a separation of concern is always present.
- Implements the JWT based authentication using passport middleware.
- Implements role based security on top of the authentication model.
- Implements custom guards and strategies.
- Global Validation Pipe supported with option to override the same with custom validations.
- CORS Enabled and Logged operations with Nest console logger.
- Minimal implementation, allowing you to extend the project the way you want.

### You would require to create .env file in the project root with the following entries

```
MONGO_URI=mongodb://localhost:27017/<YOUR-DB-NAME>
JWT_SECRET=<YOUR_SECRET_KEY_MAKE_SURE_THIS_IS_DIFF_ON_PRODUCTION>

```
