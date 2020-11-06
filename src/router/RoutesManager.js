import routes from './';
import VueRouter from 'vue-router';

export class RoutesManager {
  constructor(baseRoutes) {
    if (RoutesManager.$instance) {
      throw new Error('Instance already created ');
    }

    this.routes = baseRoutes;
  }

  static create(baseRoutes) {
    RoutesManager.$instance = new this(baseRoutes);

    return RoutesManager.$instance;
  }

  addRoute(route) {
    const routes = Array.isArray(route) ? route : [route];

    this.routes.concat(routes); // add additional logic to override existing routes
  }

  addChildRoute(route, parentRouteName) {
    const routes = Array.isArray(route) ? route : [route];

    this.routes = this.routes.map((r) => {
      if (r.name === parentRouteName) {
        r.children = r.children
          ? r.children.concat(routes) // add additional logic to override existing routes
          : routes;
      }

      return r;
    });
  }

  getRouter() {
    return new VueRouter({
      mode: process.env.IS_ELECTRON ? 'hash' : 'history',
      base: process.env.BASE_URL,
      linkActiveClass: 'active',
      scrollBehavior(to) {
        if (to.hash) {
          return { selector: to.hash };
        }

        return {
          x: 0,
          y: 0,
        };
      },
      routes: this.routes,
    });
  }
}

export default RoutesManager.create(routes);
