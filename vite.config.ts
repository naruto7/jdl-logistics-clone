import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('./', import.meta.url));

/**
 * 多页入口（MPA）：每个一级栏目一个静态 HTML 入口，产物为真实静态页面，
 * GitHub Pages 上 /services/ 等路径可直接访问，无需 SPA fallback。
 */
const PAGES = ['', 'services', 'solutions', 'support', 'esg', 'about', 'project'] as const;

export default defineConfig(({ command }) => ({
  // 生产构建部署在 GitHub Pages 子路径；开发环境用根路径，便于本地直接访问与截图
  base: command === 'build' ? '/jdl-logistics-clone/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(root, 'src'),
    },
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        PAGES.map((page) => [page === '' ? 'home' : page, resolve(root, page === '' ? 'index.html' : `${page}/index.html`)]),
      ),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    // Windows 上编辑器原子写会产生 .tmpdir 临时文件，chokidar 监听它会 EBUSY 崩溃
    watch: {
      ignored: ['**/*.tmp', '**/*.tmpdir/**', '**/.tmpdir/**', '**/.*.tmpdir/**', '**/qa/**'],
    },
  },
}));
