import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface RequestWalletInfo {
  wallet: `0x${string}`;
}

export const WalletInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const { wallet } = req;

    return {
      wallet,
    } as RequestWalletInfo;
  },
);
