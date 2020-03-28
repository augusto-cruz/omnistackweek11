const request = require('supertest')
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); // Dropa o banco
        await connection.migrate.latest(); // Aplica as migrations
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //.set('Authorization', 'aca7edd9') // Para passar no header
            .send({
                name: "APAD",
                email: "contato@apad.com",
                whatsapp: "1699999999",
                city: "Rio do Sul",
                uf: "SC"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});