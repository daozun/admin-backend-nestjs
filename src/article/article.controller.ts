import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetArticleListDto } from "./dto/get-article-list.dto"
import { BaseResponse } from '../common/baseReponse';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    try {
      const saveObj = await this.articleService.create(createArticleDto);

      if(saveObj) {
        return new BaseResponse(HttpStatus.CREATED, "新增成功", null)
      } else {
        return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "新增失败", null)
      }      
    } catch (error) {
      return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "新增失败", null)
    }
  }

  @Get("list")
  async findAll(@Query() getArticleListDto: GetArticleListDto) {
    try {
      const [records, total] = await this.articleService.findAll(getArticleListDto);

      return new BaseResponse(HttpStatus.OK, "获取成功", {
        records,
        total
      })      
    } catch (error) {
      return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "获取失败", null)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const obj = await this.articleService.findOne(id);

      if(!obj) {
        return new BaseResponse(HttpStatus.BAD_REQUEST, "不是一个有效id", null)
      }
  
      return new BaseResponse(HttpStatus.OK, "获取成功", obj)        
    } catch (error) {
      return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "获取失败", null)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articleService.remove(id)
  }
}
