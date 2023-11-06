import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateDto } from './dto/post.dto';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
    constructor(private service: PostService){}
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto:CreateDto, @UploadedFile() image){
 return this.service.createPost(dto, image);
    }
}
