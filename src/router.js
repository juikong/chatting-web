import { createRouter, createWebHistory } from "vue-router";
import VueCookies from "vue-cookies";
import Users from "./pages/admin/Users.vue";
import EditUser from "./pages/admin/EditUser.vue";
import NewUser from "./pages/admin/AddUser.vue";
import Register from "./pages/settings/Register.vue";
import Signin from "./pages/signin/Signin.vue";
import Resetpassword from "./pages/signin/Resetpassword.vue";
import Resetemailpassword from "./pages/signin/Resetemailpassword.vue";
import Changepassword from "./pages/signin/Changepassword.vue";
import AccountSettings from "./pages/settings/Account.vue";
import ServerSettings from "./pages/settings/Server.vue";
import EmailSettings from "./pages/settings/Email.vue";
import ChatgptSettings from "./pages/settings/Chatgpt.vue";
import Chat from "./pages/demo/Chat.vue";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: Register,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = !!VueCookies.get("auth");
        if (isAuthenticated) {
          next("/users");
        } else {
          next();
        }
      },
    },
    {
      path: "/users",
      name: "Users",
      component: Users,
    },
    {
      path: "/add-user",
      name: "AddUser",
      component: NewUser,
    },
    {
      path: "/edit-user/:id",
      name: "EditUser",
      component: EditUser,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/signin",
      name: "SignIn",
      component: Signin,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = !!VueCookies.get("auth");
        if (isAuthenticated) {
          next("/users");
        } else {
          next();
        }
      },
    },
    {
      path: "/resetpassword",
      name: "Resetpassword",
      component: Resetpassword,
    },
    {
      path: "/resetemailpassword",
      name: "Resetemailpassword",
      component: Resetemailpassword,
    },
    {
      path: "/changepassword/:id",
      component: Changepassword,
    },
    {
      path: "/account-settings",
      component: AccountSettings,
    },
    {
      path: "/server-settings",
      component: ServerSettings,
    },
    {
      path: "/email-settings",
      component: EmailSettings,
    },
    {
      path: "/chatgpt-settings",
      component: ChatgptSettings,
    },
    {
      path: "/chat-demo",
      component: Chat,
    },
  ],
});

export default router;
