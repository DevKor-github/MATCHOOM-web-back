import { applyDecorators } from '@nestjs/common';

type EndPoints =
  | 'register'
  | 'logout'
  | 'refresh-token'
  | 'kakao/callback';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    
  }
}