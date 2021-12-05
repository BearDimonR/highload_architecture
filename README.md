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
3. After it you can access API with `localhost:4000`
4. Also you can try use `--scale {service_name}={scale_number}` to increase number of containers for some services. 

Service names: `read, write, worker`

Just copy `docker compose up --scale worker=3 --scale read=2 --scale write=2`

##### API

1. `/get` - returns all books (with caching)
2. `/get/<id>` - returns book by id (with caching)
3. `/write/add` - create new instance (with queue)
4. `/write/edit/<id>` - edit instance (with queue)
5. `/write/check_status/<job_id>` - check job status
##### Testing

You can use configured postman collection for test purpose.

P.S. Postman sometimes ignore variable assigning, check it if error with request occur.