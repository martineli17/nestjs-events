import { Body, Res, Controller, Get, Post, HttpStatus, Put, Delete, Param, Inject } from '@nestjs/common';
import { Response } from 'express';
import { UserAddDto, UserUpdateDto } from 'src/domain/dtos/user';
import { IUserService } from 'src/domain/interfaces/service/user';
import { UserService } from 'src/domain/services/user.service';

@Controller('user')
export class UserController {
    constructor(@Inject(UserService) private readonly _userService: IUserService) {
        
    }
  @Post()
  async add(@Body() user: UserAddDto, @Res() response: Response) {
    const result = await this._userService.addAsync(user);
    if(result)
        response.status(HttpStatus.CREATED).send();
    else
        response.status(HttpStatus.BAD_REQUEST).send();
  }

  @Put()
  async update(@Body() user: UserUpdateDto, @Res() response: Response) {
    const result = await this._userService.updateAsync(user);
    if(result)
        response.status(HttpStatus.OK).send();
    else
        response.status(HttpStatus.NOT_FOUND).send();
  }

  @Delete()
  async delete(@Param() id: string, @Res() response: Response) {
    const result = await this._userService.removeAsync(id);
    if(result)
        response.status(HttpStatus.OK).send();
    else
        response.status(HttpStatus.NOT_FOUND).send();
  }

   @Get('')
  async getAll(@Res() response: Response) {
    const result = await this._userService.getAllAsync();
    if(!!result)
        response.status(HttpStatus.OK).json(result).send();
    else
        response.status(HttpStatus.NOT_FOUND).send();
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response) {
    const result = await this._userService.getByIdAsync(id);
    if(result)
        response.status(HttpStatus.OK).json(result).send();
    else
        response.status(HttpStatus.NOT_FOUND).send();
  }
}