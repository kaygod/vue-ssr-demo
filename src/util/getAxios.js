import axios from "axios";

/**
 *  获取客户端axios实例
 */
export const getClientAxios = ()=>{
    const instance = axios.create({
        timeout: 3000,
    });
    return instance;
}

/**
 * 虎丘服务器端axios实例
 */
export const getServerAxios = (ctx)=>{
    const instance = axios.create({
        timeout: 3000,
        headers:{
            cookie:ctx.req.headers.cookie || ""
        },
        baseURL: 'http://localhost:3000'
    });
    return instance;
}