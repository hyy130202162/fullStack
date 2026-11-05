# fullstack-nuxt

Nuxt3 + TypeScript 全栈练习骨架，用来练 TS 类型对齐、Vite 环境变量与代理。

## 启动

```bash
npm install
npm run dev
```

打开 http://localhost:3000 。

## 练习点

- `app/app.vue`：TS 类型练习（interface / 联合类型 / 泛型），环境变量读取，代理请求示例
- `nuxt.config.ts`：`runtimeConfig.public.apiBase` 与 `devServer.proxy`（/api → FastAPI）
- `.env.example`：复制为 `.env` 后填入 `NUXT_PUBLIC_API_BASE`
