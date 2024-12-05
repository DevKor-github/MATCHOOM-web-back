import { Injectable } from '@nestjs/common';
import { ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SocialLoginGuard implements CanActivate {
  constructor( ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const provider = req.body.provider;
    const guard = this.getGuardbyProvider(provider);

    console.log(provider);
    return guard.canActivate(context) as Promise<boolean>;
  }

  private getGuardbyProvider(provider: string) {
    switch (provider) {
      case 'kakao':
        return new (AuthGuard('kakao'))();
      default:
        return null;
    }
  }
}
