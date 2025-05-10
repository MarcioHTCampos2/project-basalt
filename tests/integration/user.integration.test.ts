import request from 'supertest';
import app from '../../src/app';
import { DataSource } from 'typeorm';
import { User } from '../../src/entities/user.entity';
import { TEST_DB_CONFIG } from '../../config/test.config';

describe('User API - Integration Tests', () => {
  let testDataSource: DataSource;

  beforeAll(async () => {
    testDataSource = new DataSource(TEST_DB_CONFIG);
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  beforeEach(async () => {
    await testDataSource.getRepository(User).clear();
  });

  it('POST /users should create a user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Test', email: 'test@example.com' });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('GET /users/:id should return a user', async () => {
    const createResponse = await request(app)
      .post('/users')
      .send({ name: 'Test', email: 'test@example.com' });
    
    const userId = createResponse.body.id;
    const getResponse = await request(app).get(`/users/${userId}`);
    
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('Test');
  });
});