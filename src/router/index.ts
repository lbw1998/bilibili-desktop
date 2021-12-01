
import { createRouter, createWebHashHistory } from "vue-router";
const modules = import.meta.glob('../views/*/*.vue')

const routes = [
  {
    path: "/",
    name: 'layout',
    redirect: '/recommend',
    // component: () => import("/src/layout/index.vue"),
    component: import("/src/layout/index.vue"),
    children: [
      // {
      //   path: "/recommend",
      //   name: 'recommend',
      //   component: import("/src/views/recommend/index.vue"),
      // },
      // {
      //   path: "/dynamic",
      //   name: 'dynamic',
      //   component: import("/src/views/dynamic/index.vue"),
      // },
      // {
      //   path: "/hot",
      //   name: 'hot',
      //   component: import("/src/views/hot/index.vue"),
      // },
      // {
      //   path: "/live",
      //   name: 'live',
      //   component: import("/src/views/live/index.vue"),
      // },
      // {
      //   path: "/partition",
      //   name: 'partition',
      //   component: import("/src/views/partition/index.vue"),
      // },
      // {
      //   path: "/ranking",
      //   name: 'ranking',
      //   component: import("/src/views/ranking/index.vue"),
      // },
      // {
      //   path: "/video",
      //   name: 'video',
      //   component: import("/src/views/video/index.vue"),
      // },
      // {
      //   path: "/search",
      //   name: 'search',
      //   component: import("/src/views/search/index.vue"),
      // },
    ]
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
  