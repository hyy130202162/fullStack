<template>
  <div class="page">
    <h1>Nuxt3 + TypeScript 练习页</h1>
    <p>这个骨架用来练 TS 类型对齐 + Vite 代理（环境变量）。</p>

    <section>
      <h2>1. TS 类型练习（表单提交）</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="form.name" placeholder="姓名" />
        <input v-model="form.age" type="number" placeholder="年龄" />
        <button type="submit">提交</button>
      </form>
      <p v-if="lastSubmit">已提交：{{ lastSubmit.name }}（{{ lastSubmit.age }} 岁）</p>
    </section>

    <section>
      <h2>2. 环境变量读取</h2>
      <p>API 基础地址：<code>{{ apiBase }}</code></p>
    </section>

    <section>
      <h2>3. 代理后端示例</h2>
      <p>开发时通过 <code>server.proxy</code> 把 <code>/api</code> 转发到后端，例如 FastAPI 的 <code>http://localhost:8000</code>。</p>
      <button @click="callApi">请求 /api/ping</button>
      <p v-if="apiResult">{{ apiResult }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
// —— TS 类型练习 ——
// 接口 + 联合类型 + 泛型，前后端数据对齐的关键
interface UserProfile {
  name: string
  age: number
  role: 'admin' | 'user' | 'guest' // 联合类型
}

// 泛型：请求结果统一包装，模拟后端 {code, message, data}
interface ApiResult<T> {
  code: number
  message: string
  data: T
}

// 读取环境变量（对应 .env 里的 NUXT_PUBLIC_API_BASE）
const apiBase = useRuntimeConfig().public.apiBase as string

const form = reactive<{ name: string; age: number }>({ name: '', age: 0 })
const lastSubmit = ref<UserProfile | null>(null)

function handleSubmit() {
  const profile: UserProfile = {
    name: form.name,
    age: form.age,
    role: 'user'
  }
  lastSubmit.value = profile
  form.name = ''
  form.age = 0
}

// —— 代理后端示例 ——
const apiResult = ref('')
async function callApi() {
  try {
    const res = await $fetch<ApiResult<string>>('/api/ping')
    apiResult.value = res.message
  } catch (e) {
    apiResult.value = `请求失败：${e}`
  }
}
</script>

<style scoped>
.page {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  max-width: 640px;
  margin: 0 auto;
}
section {
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
input {
  margin-right: 8px;
  padding: 4px 8px;
}
button {
  padding: 4px 12px;
  cursor: pointer;
}
code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
