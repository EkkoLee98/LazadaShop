import axios from 'axios';
import router from "../router";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;
axios.defaults.retry = 5;
axios.defaults.retryDelay = 1000;
axios.defaults.baseURL = '';

axios.interceptors.request.use(function (request) {
    // 在发送请求之前做些什么
    console.log('in interceptor, request config: ', request);
    return request;
}, function (error) {
    // Message.error('');
    // Message.warning('');
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log('in interceptor, response: ', response);
    if (response.data.code !== 200) {
        console.log('errCode:', response.data.code);
        if (response.data.code === 213) {
            window.alert('你已在另一台机器登录，你已被逼下线');
            //window.location.href = '/';
            localStorage.removeItem('ms_username');
            localStorage.removeItem('identity');
            localStorage.removeItem('ok');
            console.log('before to login, current route path:', router.currentRoute.fullPath);
            router.push({path: '/login', query: {redirect: router.currentRoute.fullPath}});
        }
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    console.log('in interceptor, error1: ', error);
    console.log(error.response.status);
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '请求错误(400)';
                break;
            case 401:
                error.message = 'Session过期';
                localStorage.removeItem('ms_username');
                localStorage.removeItem('identity');
                localStorage.removeItem('ok');
                console.log('before to login, current route path:', router.currentRoute.fullPath);
                router.push({path: '/login', query: {redirect: router.currentRoute.fullPath}});
                break;
            case 403:
                error.message = '拒绝访问(403)';
                break;
            case 404:
                error.message = '请求出错(404)';
                break;
            case 408:
                error.message = '请求超时(408)';
                break;
            case 500:
                error.message = '服务器错误(500)';
                break;
            case 501:
                error.message = '服务未实现(501)';
                break;
            case 502:
                error.message = '网络错误(502)';
                this.$notify.error({
                    title: '错误',
                    message: '网络错误'
                });
                break;
            case 503:
                error.message = '服务不可用(503)';
                break;
            case 504:
                error.message = '网络超时(504)';
                break;
            case 505:
                error.message = 'HTTP版本不受支持(505)';
                break;
            default:
                error.message = `连接出错(${error.response.status})!`;
        }
        console.log(error.message)
    } else {
        error.message = '连接服务器失败!'
    }
    return Promise.reject(error);
});

