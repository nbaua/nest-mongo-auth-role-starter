import { SetMetadata } from '@nestjs/common';

export const hasRoles = (...hasRoles: string[]) => {
  return SetMetadata('roles', hasRoles);
};
