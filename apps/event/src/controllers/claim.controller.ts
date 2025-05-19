import { Controller, Post, Get, Body, Query, Param } from '@nestjs/common';
import { ClaimService } from '../services/claim.service';
import { CreateClaimDto } from '../dto/eventdto.dto';
import { Roles } from '@app/common';
import { UserRoleEnum } from '@app/interfaces';

@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Post()
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.USER, UserRoleEnum.OPERATOR)
  createClaim(@Body() dto: CreateClaimDto) {
    return this.claimService.createClaim(dto);
  }

  @Get()
  getClaims(@Query('userId') userId: string) {
    return this.claimService.getClaims(userId);
  }
}
