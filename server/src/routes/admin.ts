export default [
  {
    method: 'GET',
    path: '/',
    // name of the controller file & the method.
    handler: 'controller.index',
    config: {
      policies: [],
      middlewares: [],
    }
  },
  {
    method: 'GET',
    path: '/config',
    handler: 'configController.find',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'POST',
    path: '/config',
    handler: 'configController.create',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];
