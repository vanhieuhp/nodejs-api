var chai = require('chai');
var assert = require('assert');

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = require('chai').assert
chai.use(chaiHttp);
const AppServer = 'http://localhost:3000';

it('should list users on /users/11 GET', async () => {
    let res = await chai.request(AppServer).get('/users/11')
    assert.equal(res.status, 200)
});

describe('[PUT] /users/:id', () => {
    let originalUsers;
    let user_id = '11';

    before(async () => {
        const res = await chai.request(AppServer)
            .get(`/users/${user_id}`);

        originalUsers = res.body.users;
        assert.equal(res.status, 200, `Expected status equal 200, erorr: ${res.text}`);
        assert.equal(originalUsers.user_id, user_id);
    });

    it('should update the user data and restore it back', async () => {
        const res = await chai.request(AppServer)
            .put(`/users/${user_id}`)
            .send({
                username: 'TruongGiang',
                email: 'truonggiang@example.com'
            });

        // console.log(res.text);
        assert.equal(res.status, 200, `Expected status equal 200, erorr: ${res.text}`);
    });

    after(async () => {
        const res = await chai.request(AppServer)
            .put(`/users/${user_id}`)
            .send(originalUsers);

        assert.equal(res.status, 200, `Expected status equal 200, erorr: ${res.text}`);
    });

});

describe('[GET] /users/phone/:phone', () => {
    let phone = '0969087705';

    it('should get the users via phone', async () => {
        const res = await chai.request(AppServer)
            .get(`/users/phone/${phone}`)

        assert.equal(res.status, 200, `Expected status equal 200, erorr: ${res.text}`);
    })
})