// src/admin/admin.controller.ts
import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserStatusDto } from './dtos/update-user-status.dto';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('customers')
  getCustomers() {
    return this.adminService.getCustomers();
  }

  @Get('suppliers')
  getSuppliers() {
    return this.adminService.getSuppliers();
  }

  @Patch('users/:id/status')
  updateUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ) {
    return this.adminService.updateUserStatus(id, updateUserStatusDto.isActive);
  }
}
