import {Injectable} from '@nestjs/common';
import {UserCreateProfileDto, UserUpdateDto} from "./dto/user.dto";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class UserService {
    private users = [];

    constructor() {
    }

    async getAllUsers() {
        return this.users;
    }

    async getUserById(userId: string) {
        const user = this.users.find((item) => item.id === userId);
        return user;
    }

    async addUserPhone(userId: string, body: string) {
        const user = this.users.find((item) => item.id === userId);
        const updatedUser = {...user, phone: body};
        this.users.push(updatedUser);
        return updatedUser;
    }

    async updateUserById(id: string, body: UserUpdateDto) {
        const userId = this.users.findIndex((user) => user.id === id);

        if (userId === -1) {
            throw new Error('User not founded');
        }

        const updatedUser = {...this.users[userId], ...body};

        this.users[userId] = updatedUser;
        return updatedUser;
    }

    async deleteUserById(userId: string,) {
        const newUsers = this.users.filter((item) => item.id !== userId);
        this.users = newUsers;
        return;
    }

    async createUser(userData: UserCreateProfileDto) {
        // if(userData.age <0){
        //     throw new HttpException()
        // }
        const id = uuidv4();
        const user = {...userData, id};
        this.users.push(user);
        return user;
    }
}
