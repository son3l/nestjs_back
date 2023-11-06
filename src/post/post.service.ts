import { Injectable } from '@nestjs/common';
import { CreateDto } from './dto/post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Model } from 'sequelize-typescript';
import { Post } from './post.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post) private model: typeof Post, private fileSys: FilesService ){}
    async createPost(dto: CreateDto, image: any)
    {
        const fileName = await this.fileSys.createFile(image);
const post = await this.model.create({...dto, image: fileName})
return post;
    }
}
