import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RoleModuleService } from 'src/role-module/role-module.service';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private RoleModuleService: RoleModuleService,
    private CacheService: CacheService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let callName = context
      .getClass()
      .name.replace('Controller', '')
      .toLowerCase();
    const requestMethod = request.method;

    switch (requestMethod) {
      case 'GET':
        if (context.getHandler().name != 'findAll') {
          return true;
        }
        callName += '-view';
        break;
      case 'POST':
      case 'PUT':
      case 'PATCH':
        callName += '-information';
        break;
      case 'DELETE':
        callName += '-delete';
        break;
      default:
        break;
    }

    let permissions: any = await this.CacheService.getCache('role-permissions');
    if (!permissions) {
      let roles: any = await this.CacheService.getCache('roles');
      if (roles) {
        roles = JSON.parse(String(roles));
        permissions =
          await this.RoleModuleService.findModulesWithRolePermissions();
        const matchingPermissions = permissions.filter((permission: any) =>
          roles.some((role: any) => role.roleId === permission.roleId),
        );
        await this.CacheService.setCache(
          'role-permissions',
          JSON.stringify(matchingPermissions),
        );
        permissions = matchingPermissions;
      } else {
        return true; // if roles are not defined, aka if user is not logged in / jwt verified
      }
    } else {
      permissions = JSON.parse(permissions);
    }
    return permissions.some(
      (permission: any) => permission.moduleKey === callName,
    );
  }
}
