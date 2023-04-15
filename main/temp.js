// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const assert = chai.assert;
// const TestServer = 'localhost:8342';

// chai.use(chaiHttp);

// describe('[PUT] /payers/:id', () => {
//     let originalPayer;
//     let id = '6434384915cce570b5db5f81';

//     before(async () => {
//         // Lưu lại dữ liệu ban đầu
//         const response = await chai.request(TestServer)
//             .get(/payers/id/${id});
            
//         delete response.body.payer._id
//         originalPayer = response.body.payer;

//         // Khẳng định lại kết quả response
//         assert.equal(response.status, 200);
//         assert.isTrue(response.body.success);
//     });

//     it('should update the payer data and restore it back', async () => {
//         // Gửi PUT request để cập nhật thông tin
//         const response = await chai.request(TestServer)
//             .put(/payers/${id})
//             .send({
//                 "Họ và tên": "Nguyễn Văn A",
//                 "Tuổi": "30",
//                 "Căn cước": "123456789",
//                 "Thông tin liên hệ": {
//                     "Điện thoại": "0987654321",
//                     "Email": "nguyenvana@gmail.com",
//                     "Địa chỉ": "123 Đường ABC, Quận XYZ, TP. HCM"
//                 },
//                 "Người phụ thuộc": [
//                     "0123456789",
//                     "0234567890"
//                 ]
//             });

//         // Khẳng định lại kết quả response
//         assert.equal(response.status, 200);
//         assert.isTrue(response.body.success);
//     });

//     after(async () => {
//         // Trả lại dữ liệu ban đầu
//         const response = await chai.request(TestServer)
//             .put(/payers/${id})
//             .send(originalPayer);

//         // Khẳng định lại kết quả response
//         assert.equal(response.status, 200);
//         assert.isTrue(response.body.success);
//     });

// });

// describe('[GET] /payers/phone/:phone', () => {
//     let phone = '098589811';

//     it('should get the payer via phone', async () => {
//         const response = await chai.request(TestServer)
//             .get(/payers/phone/${phone})

//         // Khẳng định lại kết quả response
//         assert.equal(response.status, 200);
//         assert.isTrue(response.body.success);

//     })
// })

// describe('[POST] /payers/one', () => {
//     let newPayerId;
//     const newPayer = {
//         "Mã số thuế": "000000099",
//         "Họ và tên": "Giàng Văn A",
//         "Tuổi": "25",
//         "Căn cước": "037153000257",
//         "Thông tin liên hệ": {
//             "Điện thoại": "098589811",
//             "Email": "pvt@gmail.com",
//             "Địa chỉ": "85 Hàng Bài, Hoàn Kiếm, Hà Nội"
//         },
//         "Người phụ thuộc": [
//             "023153000257",
//             "032153000257",
//             "032153000257"
//         ]
//     };

//     it('should create new payer with given body and delete it', async () => {
//         const response = await chai.request(TestServer)
//             .post('/payers/one')
//             .send(newPayer)

//         // Lưa lại id của bản ghi vừa thêm vào
//         newPayerId = response.body.result.insertedId;

//         // Khẳng định lại kết quả response
//         assert.equal(response.status, 201);
//         assert.isTrue(response.body.success);
//     })

//     after(async () => {
//         const response = await chai.request(TestServer)
//             .delete(/payers/${newPayerId})

//         // Khẳng định lại kết quả response
//         assert.equal(response.status, 200);
//         assert.isTrue(response.body.success);
//     })

// })