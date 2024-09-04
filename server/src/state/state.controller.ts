import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StateService } from './state.service';
import { State } from './state.entity';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async findAll(): Promise<State[]> {
    return this.stateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<State | null> {
    return this.stateService.findOne(id);
  }

  @Post()
  async create(@Body() state: State): Promise<State> {
    return this.stateService.create(state);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() state: Partial<State>,
  ): Promise<void> {
    return this.stateService.update(id, state);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.stateService.remove(id);
  }
}
