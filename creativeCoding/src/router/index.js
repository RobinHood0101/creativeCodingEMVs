import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import P5Canvas1 from '../components/P5Canvas1.vue'
import P5Canvas2 from '../components/P5Canvas2.vue'
import P5Canvas3 from '../components/P5Canvas3.vue'
import P5Canvas4 from '../components/P5Canvas4.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/canvas1',
      name: 'canvas1',
      component: P5Canvas1,
    },
    {
      path: '/canvas2',
      name: 'canvas2',
      component: P5Canvas2,
    },
    {
      path: '/canvas3',
      name: 'canvas3',
      component: P5Canvas3,
    },
    {
      path: '/canvas4',
      name: 'canvas4',
      component: P5Canvas4,
    }
  ],
})

export default router
