struct Params { logoCenter: vec2f, logoScale: vec2f, uvInset: vec2f, edge: f32, colorMode: f32 }
@group(0) @binding(0) var logoSampler: sampler;
@group(0) @binding(1) var logoTexture: texture_2d<f32>;
@group(0) @binding(2) var<uniform> params: Params;

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let local = (uv - params.logoCenter) / params.logoScale + vec2f(0.5);
  let inside = all(local >= vec2f(0.0)) && all(local <= vec2f(1.0));
  let sampleUv = mix(params.uvInset, vec2f(1.0) - params.uvInset, clamp(local, vec2f(0.0), vec2f(1.0)));
  let texel = textureSample(logoTexture, logoSampler, sampleUv);
  var mask = texel.a * select(0.0, 1.0, inside);
  mask = (mask + pow(mask, 3.0) * 0.6) * params.edge;
  let logoColor = mix(vec3f(1.0), texel.rgb, params.colorMode);
  return vec4f(logoColor * mask, 1.0);
}
