
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: 'layout',
    redirect: '/recommend',
    component: () => import("@/layout/index.vue"),
    children: []
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

addRoute()

// 自动添加路由
function addRoute() {
  const modules = import.meta.glob('../views/**')
  for (const path in modules) {
    router.addRoute('layout', { path: `/${path.split('/')[2]}`, component: modules[path] })
  }
}

export default router;
