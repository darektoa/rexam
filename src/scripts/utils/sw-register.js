import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const swRegister = async () => {
  if (navigator.serviceWorker) {
    await runtime.register();
    return;
  }

  console.log('Service Worker Not Supported In Your Browser');
};

export default swRegister;