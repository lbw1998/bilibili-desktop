
import { createRouter, createWebHashHistory } from "vue-router";
const modules = import.meta.glob('../views/*/*.vue')

const routes = [
  {
    path: "/",
    name: 'layout',
    redirect: '/recommend',
    component: () => import("/src/layout/index.vue"),
    children: []
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

const addRoute = () => {
  for (const path in modules) {
    console.log(modules[path]);
    router.addRoute('layout', { path: `/${path.split('/')[2]}`,name: path.split('/')[2], component: modules[path] })
  }
}

addRoute()


export default router;
  