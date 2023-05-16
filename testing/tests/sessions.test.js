
import request from 'supertest'
import jwt from 'jsonwebtoken'
import chai from "chai";


const expect = chai.expect;


// Supongamos que este es el usuario que desea iniciar sesión
const user = {
  email: 'admin@gmail.com',
  password: '1234'
};

describe('POST /login', () => {
  it('should log in a user and set a JWT cookie', async () => {
    // Generar un token JWT válido
    const token = jwt.sign({ user: user.email }, 'mysecretkey', { expiresIn: '1h' });

    // Hacer una solicitud POST a la ruta de inicio de sesión
    const response = await request('http://localhost:3000')
      .post('/api/session/login')
      .send({ email: user.email, password: user.password })
      .set('Cookie', `jwt=${token}`);
    //
    //
    // Verificar la respuesta
    // expect(response.status).to.equal(200);
    // expect(response.body).to.deep.equal({ message: 'Inicio de sesión exitoso' });
    // expect(response.header['set-cookie']).to.be.an('array').that.includes(`jwt=${token}`);
  });
});
