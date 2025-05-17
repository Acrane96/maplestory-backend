import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { User as UserInterface, UserRole } from '@app/interfaces';
import { JwtAuthGuard, RolesGuard } from '@app/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

//ToDo: Test Code 완성
describe('AuthController', () => {
  let authController: AuthController;
  const testUser: UserInterface = {
    userId: "testUser",
    username: "testUser",
    password: "password",
    role: UserRole.USER
  }
  const updatedUser: UserInterface = {
    ...testUser,
    username: "updatedUser",
    role: UserRole.ADMIN
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn().mockImplementation((query) => {
              return testUser.username === query.username || testUser.userId === query.userId ?
                Promise.resolve({
                ...testUser
                })
                : undefined;
            }),
            create: jest.fn().mockResolvedValue(testUser),
            findOneAndUpdate: jest.fn().mockImplementation((query, update, options) => {
              return Promise.resolve({
                ...updatedUser,
                ...update.$set,
              });
            }),
            findOneAndDelete: jest.fn().mockRejectedValue(updatedUser)
          },
        },
        AuthService,
        JwtService
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .overrideGuard(RolesGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    authController = app.get<AuthController>(AuthController);
  });

  // describe('register', () => {
  //   it(`should create user ${testUser.username}`, async () => {
  //     const user = await authController.register(testUser);

  //     expect(user.userId).toBe(testUser.userId);
  //     expect(user.username).toBe(testUser.username);
  //   });
  // });

  // describe('login', () => {
  //   it(`should login user ${testUser.username}`, async () => {
  //     const loginDto: LoginDto = {
  //       ...testUser,
  //     }
  //     const user = await authController.login(loginDto);

  //     expect(user).toHaveProperty('accessToken');
  //   });
  // });

  describe('get', () => {
    it(`should get user ${testUser.username}`, async () => {
      const user = await authController.getUser(testUser.userId);

      expect(user.userId).toBe(testUser.userId);
      expect(user.username).toBe(testUser.username);
    });
  });

  describe('update', () => {
    it(`should update user ${testUser.username} to updatedUser`, async () => {
      const user = await authController.updateUser(
        testUser.userId,
        { username: 'updatedUser', ...testUser }
      );

      expect(user.username).toBe('updatedUser');
    });
  });

  describe('updateRole', () => {
    it(`should update user ${testUser.username} role to ADMIN`, async () => {
      const user = await authController.updateRole(
        testUser.userId,
        { role: UserRole.ADMIN }
      );

      expect(user.role).toBe(UserRole.ADMIN);
    });
  });


  describe('delete', () => {
    it(`should delete user ${testUser.username}`, async () => {
      expect(await authController.deleteUser(testUser.userId)).toBe(1);

      // expect(await authController.getUser(testUser.userId)).toThrow(NotFoundException);
    });
  });
});
