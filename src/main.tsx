import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App, type PageKey } from './App';
import './styles/index.css';

const mount = document.getElementById('root');
if (!mount) throw new Error('未找到挂载节点 #root');

const page = (mount.dataset.page ?? 'home') as PageKey;

createRoot(mount).render(
  <StrictMode>
    <App page={page} />
  </StrictMode>,
);
