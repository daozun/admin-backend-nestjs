import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseResponse } from "../common/baseReponse";
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Brackets, Like, Repository } from 'typeorm';
import { GetArticleListDto } from "./dto/get-article-list.dto"
import { DeleteFlagEnum } from "../common/baseEntity";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    return this.articleRepository.save(createArticleDto);
  }

  async findAll(getArticleListDto: GetArticleListDto) {
    const list = await this.articleRepository.createQueryBuilder("article")
    .where('article.deleteflag = :deleteflag', { deleteflag: DeleteFlagEnum.UNDELETE })
    .andWhere(
      new Brackets((qb) => {
        if(getArticleListDto.title) {
          return qb.where('article.title LIKE :title', {
            title: `%${getArticleListDto.title}%`,
          });
        } else {
          return qb;
        }
      })
    )
    .andWhere(
      new Brackets((qb) => {
        if(getArticleListDto.author) {
          return qb.where('article.author LIKE :author', {
            author: `%${getArticleListDto.author}%`,
          });
        } else {
          return qb;
        }
      })
    )
    .andWhere(
      new Brackets((qb) => {
        if(getArticleListDto.status) {
          return qb.where('article.status = :status', {
            status: `${getArticleListDto.status}`,
          });
        } else {
          return qb;
        }
      })
    )
    .skip((getArticleListDto.pageNo - 1) * getArticleListDto.pageSize)
    .take(getArticleListDto.pageSize)
    .getManyAndCount();
    
    return list;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
