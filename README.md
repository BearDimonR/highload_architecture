# highload_architecture
Lab 4 for Highload Architecture course in NaUKMA

#### Task

1. Make two API endpoints: GET and POST
2. For read action you should use cache
3. For post action you should use queue
4. Result must be wrapped in `docker-compose` with instructions to deploy.


#### How to use?

1. Use `docker compose up` to create instances
2. Wait for initialization
3. After it you can call `localhost:4000`

##### API

1. `/get` - returns all books (with caching)
2. `/get/<id>` - returns book by id (with caching)
3. `/write/add` - create new instance (with queue)
4. `/write/edit/<id>` - edit instance (with queue)

##### Testing

You can use configured postman collection for test purpose.