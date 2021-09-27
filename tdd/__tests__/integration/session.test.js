const request = require('supertest')

const app = require('../../src/app')
const factory = require('../factories')
const truncate = require('../utils/truncate')

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', { password: 'sldkfjnsdkfn' })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'sldkfjnsdkfn'
      })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', { password: 'sldkfjnsdkfn' })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(401)
  })

  it('should receive JWT token when authenticated with valid credentials', async () => {
    const user = await factory.create('User', { password: 'sldkfjnsdkfn' })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'sldkfjnsdkfn'
      })

    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', { password: 'sldkfjnsdkfn' })

    const response = await request(app).get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  })

  it('should be not able to access private routes without jwt token', async () => {

    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(401);
  })

  it('should be not able to access private routes with invalid jwt token', async () => {

    const response = await request(app).get('/dashboard').set('Authorization', `Bearer 54564564`);

    expect(response.status).toBe(401);
  })
})
