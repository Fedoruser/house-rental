import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HousesService, LandingDataResponse } from './houses.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Get('landing')
  async getLandingData(): Promise<LandingDataResponse> {
    return this.housesService.getLandingData();
  }
  @Post('leads')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() createLeadDto: CreateLeadDto) {
    return this.housesService.createLead(createLeadDto);
  }
}
