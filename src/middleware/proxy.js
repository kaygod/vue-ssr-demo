import proxy from 'koa-server-http-proxy';

export const proxyHanlder = (app)=>{
    app.use(proxy('/api', {
        target: 'https://geoapi.qweather.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
    }));
}

  