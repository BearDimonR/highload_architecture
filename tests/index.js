const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = process.env.HOST;


const parseBody = (body) => {
    try {
        return JSON.parse(body);
    } catch (e) {
        return {};
    }
}

const createData = {
    isbn: "exampleISBN",
    book_title: "Book in the bookland",
    category_name: "Criminal",
    date_of_publication: "2000-10-08",
    price: 200,
    copies: 3
}

const editData = {
    ...createData,
    book_title: 'edited',
    price: 50
};

let uuid = '';
let time = 0;

describe("Book POST ", function () {
    let taskId = '';

    it("Should create Book", function () {
        request.post({
            url: `${urlBase}/write/add`,
            formData: createData,
    }, (error, response, body) => {
            expect(error).to.equal(null);
            expect(response.statusCode).to.equal(200);

            const obj = parseBody(body);
            
            expect(obj).be.a('object');
            expect(obj).to.have.property('status', 'success');
            expect(obj).to.have.key('data');
            expect(obj.data).to.have.property('taskId');

            taskId = obj.data.taskId;

            done();
        });
    });

    it ("Should return Queue status", function () {
        request.get(`${urlBase}/write/check_status/${taskId}`, (error, response, body) => {
            expect(error).to.equal(null);
            expect(response.statusCode).to.equal(200);

            const obj = parseBody(body);
            
            expect(obj).be.a('object');
            expect(obj).to.have.property('job_status', 'finished');
            expect(obj).to.have.property('job_id', taskId);

            done();
        });
    });
})

describe("Book GET ", function () {
    it ("Should return all Books", function () {
        request.get(`${urlBase}/get`, (error, response, body) => {
            expect(error).to.equal(null);
            expect(response.statusCode).to.equal(200);

            const obj = parseBody(body);

            expect(obj).be.a('array');
            expect(obj).to.have.length(1);
            expect(obj[0]).to.have.all.keys(['book_title', 'category_name', 'date_of_publication', 'copies', 'price', 'isbn', 'id']);

            uuid = ojb[0].id;

            done();
        });
    });

    it ("Should return book by id", function () {
        const startTime = process.hrtime();
        request.get(`${urlBase}/get/${uuid}`, (error, response, body) => {
            expect(error).to.equal(null);
            const timeDifference = process.hrtime(startTime);
            time = timeDifference[0] * 1e9 + timeDifference[1];
            expect(response.statusCode).to.equal(200);

            const obj = parseBody(body);

            expect(obj).be.a('object');
            expect(obj[0]).to.have.all.keys(['book_title', 'category_name', 'date_of_publication', 'copies', 'price', 'isbn', 'id']);

            done();
        });
    });

    it ("Should cache returned value", function () {
        const startTime = process.hrtime();
        request.get(`${urlBase}/get/${uuid}`, (error, response, body) => {
            const timeDifference = process.hrtime(startTime);
            const diff = time - (timeDifference[0] * 1e9 + timeDifference[1]);

            expect(error).to.equal(null);
            expect(response.statusCode).to.equal(200);
            expect(diff).to.be.greaterThanOrEqual(0);

            const obj = parseBody(body);

            expect(obj).be.a('object');
            expect(obj[0]).to.have.all.keys(['book_title', 'category_name', 'date_of_publication', 'copies', 'price', 'isbn', 'id']);

            done();
        });
    });
})

describe("Book  PATCH ", function () {
    let taskId = '';

    it ("Should edit Book", function () {
        request.post({
            url: `${urlBase}/write/edit`,
            formData: editData,
        }, (error, response, body) => {
            expect(error).to.equal(null);
            expect(response.statusCode).to.equal(200);

            const obj = parseBody(body);
            
            expect(obj).to.have.property('status', 'success');
            expect(obj).to.have.property('data');
            expect(obj.data).to.have.property('taskId');

            taskId = obj.data.taskId;

            done();
        });
    });

    it ("Should return Queue status", function () {
        request.get(`${urlBase}/write/check_status/${taskId}`, (error, response, body) => {
            expect(error).to.equal(null);
            expect(response.statusCode).to.equal(200);

            const obj = parseBody(body);
            
            expect(obj).be.a('object');
            expect(obj).to.have.property('job_status', 'finished');
            expect(obj).to.have.property('job_id', taskId);

            done();
        });
    });
})