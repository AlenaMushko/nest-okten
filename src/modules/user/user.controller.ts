import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserCreateProfileDto, UserUpdateDto} from "./dto/user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get('')
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(":userId")
    async getUserById(@Param() param: { userId: string }, @Res() res: any) {
        const user = await this.userService.getUserById(param.userId);
        if (user) {
            return res.status(HttpStatus.OK).json(user);
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({message: "User not found"});
        }
    }


    @Post(":userId/phone")
    async addUserPhone(@Param() param: { userId: string }, @Body() body: { phone: string }, @Res() res: any,) {
        const updatedUser = await this.userService.addUserPhone(param.userId, body.phone)
        return res.status(HttpStatus.CREATED).json(updatedUser);
    }

    @Patch(":userId")
    async updateUserById(@Param() param:{userId:string}, @Body() body: UserUpdateDto, @Res() res: any,) {
            const updatedUser = await this.userService.updateUserById(param.userId, body);
            return res.status(HttpStatus.CREATED).json(updatedUser);
    }

    @Delete(":userId")
    async deleteUserById(@Param() param: { userId: string }) {
        const user = await this.userService.getUserById(param.userId);
        if (user) {
            await this.userService.deleteUserById(param.userId);
            return 'User deleted';
        }
        return 'User not founded';

    }

    @Post("profile")
    async createUserProfile(
        @Body() body: UserCreateProfileDto,
        @Res() res: any,
    ) {
        const newUser = await this.userService.createUser(body);
        return res.status(HttpStatus.CREATED).json(newUser);
    }
}
