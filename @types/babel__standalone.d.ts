interface TransformResponse {
  code: string;
}

declare module '@babel/standalone' {
  import { TransformOptions } from '@babel/core';
  function registerPlugin(name: string, plugin: function): void;
  function transform(
    code: string,
    options: TransformOptions
  ): TransformResponse;
}
