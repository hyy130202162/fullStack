// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 暴露给前端读取的环境变量（对应 .env 的 NUXT_PUBLIC_API_BASE）
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000'
    }
  },

  // 开发环境：把 /api 代理到后端（例如 FastAPI），替代手写全 URL
  devServer: {
    proxy: {
      '/api': {
        target: process.env.NUXT_PROXY_TARGET || 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
