import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useFirebase } from "./hooks/useFirebase";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("./layouts/main-layout/MainLayout.vue"),
    meta: { authRequired: true },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("./views/app/home/Index.vue"),
        meta: { pageTitle: "Home" },
      },
      {
        path: "/purchase",
        name: "Purchase",
        component: () => import("./views/app/purchase/Index.vue"),
        meta: { pageTitle: "Compra" },
      },
      {
        path: "/purchase/new",
        name: "NewPurchase",
        component: () => import("./views/app/purchase/New.vue"),
        meta: { pageTitle: "Nueva compra" },
      },
      {
        path: "/sale",
        name: "Sale",
        component: () => import("./views/app/sale/Index.vue"),
        meta: { pageTitle: "Venta" },
      },
      {
        path: "/sale/new",
        name: "NewSale",
        component: () => import("./views/app/sale/New.vue"),
        meta: {pageTitle: "Nueva venta"},
      },
      {
        path: "/history",
        name: "History",
        component: () => import("./views/app/history/Index.vue"),
        meta: {pageTitle: "Historial"},
      },
      {
        path: "/history/read",
        name: "Read transaction",
        component: () => import ("./views/app/history/Read.vue"),
        meta: {pageTitle: "Transaccion"}
      },
      {
        path: "/history/update/:id",
        name: "Edit transaction",
        component: () => import ("./views/app/history/Update.vue"),
        meta: {pageTitle: "Edit transaction"}
      },
    ],
  },
  {
    path: "/",
    component: () => import("./layouts/AuthLayout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("./views/auth/Login.vue"),
        meta: { pageTitle: "Ingreso" },
      },
      {
        path: "/register",
        name: "register",
        component: () => import("./views/auth/Register.vue"),
        meta: { pageTitle: "Registrarse" },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: import("./views/system/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;
  const { currentUser } = useFirebase();
  if (to.meta.authRequired && !(await currentUser())) next({ path: "/login" });
  else next();
});

export default router;
