const axios = require('axios')
const chai = require("chai");
const expect = chai.expect;
const urlBase = process.env.HOST;

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

describe("Book POST ", function (done) {
    let taskId = '';

    it("Should create Book", async function () {
        const response = await axios.post(`${urlBase}/write/add`, createData);
        expect(response?.status).to.equal(202);
        
        const obj = response.data;
        
        expect(obj).be.a('object');
        expect(obj).to.have.keys(['data', 'status']);
        expect(obj).to.have.property('status', 'success');
        expect(obj.data).to.have.property('taskId');

        taskId = obj.data.taskId;
    });

    it ("Should return Queue status", async function () {
        this.retries(3);
        const response = await axios.get(`${urlBase}/write/check_status/${taskId}`);
        expect(response?.status).to.equal(200);

        const obj = response.data;
            
        expect(obj).be.a('object');
        expect(obj).to.have.key(['job_status', 'job_id']);
        expect(obj).to.have.property('job_status', 'finished');
        expect(obj).to.have.property('job_id', taskId);
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
    });
})

describe("Book GET ", function () {
    this.retries(3);
    it("Should return all books", async function() {
        const response = await axios.get(`${urlBase}/get`);
        expect(response?.status).to.equal(200);

        const obj = response.data;
        uuid = obj[0]?.id;

        expect(obj).be.a('array');
        expect(uuid).to.not.be.undefined;
        expect(obj[0]).to.have.all.keys(['book_title', 'category_name', 'date_of_publication', 'copies', 'price', 'isbn', 'id']);
    })

    it ("Should return book by id", async function () {
        const startTime = process.hrtime();
        const response = await axios.get(`${urlBase}/get/${uuid}`);
        const timeDifference = process.hrtime(startTime);
        time = timeDifference[0] * 1e9 + timeDifference[1];
        expect(response?.status).to.equal(200);

        const obj = response.data;
        expect(obj).be.a('object');
        expect(obj).to.have.all.keys(['book_title', 'category_name', 'date_of_publication', 'copies', 'price', 'isbn', 'id']);
    });

    it ("Should cache returned value", async function () {
        this.retries(3);
        const startTime = process.hrtime();
        const response = await axios.get(`${urlBase}/get/${uuid}`);
        const timeDifference = process.hrtime(startTime);
        const diff = time - (timeDifference[0] * 1e9 + timeDifference[1]);

        expect(response?.status).to.equal(200);
        expect(diff).to.be.greaterThanOrEqual(0);

        const obj = response.data;
        expect(obj).be.a('object');
        expect(obj).to.have.all.keys(['book_title', 'category_name', 'date_of_publication', 'copies', 'price', 'isbn', 'id']);
    });
})

describe("Book  PATCH ", function () {
    let taskId = '';

    it("Should edit Book", async function () {
        const response = await axios.patch(`${urlBase}/write/edit/${uuid}`, editData);
        expect(response?.status).to.equal(202);
        
        const obj = response.data;
        
        expect(obj).be.a('object');
        expect(obj).to.have.keys(['data', 'status']);
        expect(obj).to.have.property('status', 'success');
        expect(obj.data).to.have.property('taskId');

        taskId = obj.data.taskId;
    });

    it ("Should return Queue status", async function () {
        this.retries(5);
        const response = await axios.get(`${urlBase}/write/check_status/${taskId}`);
        expect(response?.status).to.equal(200);

        const obj = response.data;
            
        expect(obj).be.a('object');
        expect(obj).to.have.key(['job_status', 'job_id']);
        expect(obj).to.have.property('job_status', 'finished');
        expect(obj).to.have.property('job_id', taskId);
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    });
})