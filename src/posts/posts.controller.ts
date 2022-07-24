import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/role-guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Посты')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @ApiOperation({summary: 'Создание постов'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto,
               @UploadedFile() image) {
        return this.postService.create(dto, image)
    }

    @ApiOperation({summary: 'Получение всех постов'})
    @ApiResponse({status: 200, type: [Post]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllPosts() {
        return this.postService.getAllPosts()
    }

    @ApiOperation({summary: 'Удаление поста'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deletePost(@Param('id') id: number) {
        return this.postService.deletePost(id)
    }

}
