const request = require('supertest');
const app = require('../../server');

describe('Criação de usuário.', () => {
  it('Status 400 deve ser retornado', async () => {
     await request(app).post('/users').expect(400);
  });

  it("A mensagem de erro deve ser um objeto com um campo nomeado como 'message'", async () => {
    const res = await request(app).post('/users');
    expect(res.body).toHaveProperty("message");
  });

  it("A requisição precisa conter os campos 'user_name', 'user_email' e 'user_password'", async () => {
    const body = {
        // user_name: "",
        // user_email: "",
        // user_password: "",
    } 
    await request(app).post('/users').send(body);
    
    expect(body).toHaveProperty("user_name", "user_email", "user_password")
  });
});
