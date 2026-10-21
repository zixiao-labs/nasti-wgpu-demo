/// <reference types="@vgpu/wgsl/wgsl-types" />
/// <reference types="@webgpu/types" />

declare module "*.svg?url" {
  const url: string;
  export default url;
}
