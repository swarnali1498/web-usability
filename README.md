# web-usability

## Modules required:
* express
  * to create routes and APIs
* mongoose
  * to connect with mongoDB
* dotenv
  * to fetch environment variables
  
## API end-points

```
GET /participant/
response : list of all users
[{name:"sarthak", password:"1234", ... , }]
```

```
POST /participant/login
{
  name: "user name",
  password: "user password"
}
```
