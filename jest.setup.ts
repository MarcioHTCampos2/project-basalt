import { DataSource } from 'typeorm';
import { TEST_DB_CONFIG } from '../config/test.config';

let testDataSource: DataSource;

beforeAll(async () => {
  testDataSource = new DataSource(TEST_DB_CONFIG);
  await testDataSource.initialize();
});

afterAll(async () => {
  await testDataSource.destroy();
});

beforeEach(async () => {
  // Limpar dados entre testes
  const entities = testDataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = testDataSource.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName}`);
  }
});