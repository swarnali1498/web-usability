# web-usability

## Modules required:
* express
  * to create routes and APIs
* mongoose
  * to connect with mongoDB
* dotenv
  * to fetch environment variables
* jsonwebtoken
  * to create JWT for API requests
  
## API end-points

```
GET /participant/:id
response : participant details  
```

```
POST /participant/login
{
  email: "email id",
  password: "user password"
}
```
