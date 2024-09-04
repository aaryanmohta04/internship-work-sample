import { Controller, Get } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Channel } from './channel.entity';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async findAll(): Promise<Channel[]> {
    return this.channelService.findAll();
  }
}
