const chai = require('chai');
const chaiHttp = require('chai-http')
const categories = require('../controllers/categories');

const server = 'http://localhost:8080';

const paths = {
    auth: `/api/auth`,
    user: `/api/user`,
    categories: `/api/categories`,
    product: `/api/product`,
    search: `/api/search`,
    uploads: `/api/uploads`,
    sell: `/api/sell`,
    undefine: `/api/undefine`
}
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTk5ZDlhMTU0ZDVkZmFmMzk3NThhYmMiLCJpYXQiOjE2NDc5MDcxMjEsImV4cCI6MTY0NzkyMTUyMX0.rVFLS0oZIMmJOyhIrFxATvnT_b6xYS89ykdQGcTS8gg';



//Assertions Style
chai.should();

chai.use(chaiHttp)




describe('Categories API', () => {


    //Test the Get route
    describe('Get /api/categories/', () => {
        it('it should GET all the categories', (done) => {
            chai.request(server)
                .get(paths.categories)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object')
                    done();
                });
        });



        it('it should NOT GET all the categories', (done) => {
            chai.request(server)
                .get(`${paths.undefine}`)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

    });

    //Test the GetById route
    describe('Get /api/categories/:id', () => {
        it('it should GET a categories by ID', (done) => {
            const categorieId = '61b91473fc56de50eef30164';
            chai.request(server)
                .get(`${paths.categories}/${categorieId}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object')
                    response.body.should.have.property('categoria');
                    // response.body.should.have.property('categoria.name');
                    // response.body.should.have.property('usuario');
                    // response.body.should.have.property('_id').eq(categorieId)
                    done();
                });
        });

        it('it should NOT GET a categories by ID', (done) => {
            const categorieId = '2341';
            chai.request(server)
                .get(`${paths.categories}/${categorieId}`)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object')
                    // response.body.should.be.property('error')
                    // response.text.should.be.eq('is not ID')
                    done();
                });
        });

    });



    // Test the POST route
    // describe('post /api/categories', () => {
    //     it('it should POST a new categories', (done) => {
    //         const categorie = {
    //             name: 'celular de alta gama',
    //             usuario: '61c25d251fac23b0895c6c07'
    //         }
    //         chai.request(server)
    //             .post(`${paths.categories}`)
    //             .set('Content-Type', 'application/json')
    //             .set('x-token', token)
    //             .send(categorie)
    //             .end((err, response) => {
    //                 response.should.have.status(200);
    //                 response.body.should.be.a('object')
    //                 done();
    //             });
    //     });

    // it('it should NOT GET a categories by ID', (done) => {
    //     const categorieId = '2341';
    //     chai.request(server)
    //         .get(`/api/categories/${categorieId}`)
    //         .end((err, response) => {
    //             response.should.have.status(400);
    //             response.body.should.be.a('object')
    //             // response.body.should.be.property('error')
    //             // response.text.should.be.eq('is not ID')
    //             done();
    //         });
    // });

});


    //Test the Put route






    //Test the Delete route
