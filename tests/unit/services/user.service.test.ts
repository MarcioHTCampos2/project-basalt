import { UserService } from '../../src/services/user.service';
import { User } from '../../src/entities/user.entity';
import { AppDataSource } from '../../src/data-source';

jest.mock('../../src/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('UserService - Unit Tests', () => {
  let userService: UserService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);
    userService = new UserService();
  });

  it('should create a user', async () => {
    const userData = { name: 'Test', email: 'test@example.com' };
    mockRepository.save.mockResolvedValue({ id: 1, ...userData });
    
    const result = await userService.createUser(userData);
    
    expect(mockRepository.save).toHaveBeenCalled();
    expect(result).toMatchObject(userData);
  });
});