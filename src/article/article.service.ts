import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseResponse } from "../common/baseReponse";
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { GetArticleListDto } from "./dto/get-article-list.dto"

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    return this.articleRepository.save(createArticleDto);
  }

  findAll(getArticleListDto: GetArticleListDto) {
    return `This action returns all article`;
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
