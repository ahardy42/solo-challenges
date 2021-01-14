import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidateObjectId } from './shared/pipes/validateObjectId.pipes';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('all')
    async getUsers(@Res() res) {
        const users = await this.userService.show();
        return res.status(HttpStatus.OK).json(users)
    }

    @Get('find/:userId')
    async getUser(@Res() res, @Param('userId', new ValidateObjectId()) id) {
        const user = await this.userService.find(id);
        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        return res.status(HttpStatus.OK).json(user);
    }

    @Put('edit')
    async editUser(@Res() res, @Query('userId', new ValidateObjectId()) id, @Body() update) {
        const updatedUser = await this.userService.edit(id, update);
        if (!updatedUser) {
            throw new NotFoundException('User Not Found');
        }

        return res.status(HttpStatus.OK).json(updatedUser);
    }

    @Post('new')
    async createUser(@Res() res, @Body() user) {
        const newUser = await this.userService.create(user);
        if (!newUser) {
            throw new NotFoundException('User not created')
        }

        return res.status(HttpStatus.OK).json(newUser);
    }

    @Delete('delete')
    async deleteUser(@Res() res, @Query('userId', new ValidateObjectId()) id) {
        const deletedUser = await this.userService.delete(id);
        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }

        return res.status(HttpStatus.OK).json(deletedUser);
    }

}
