import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3020', // 设置基础 URL
  timeout: 400, // 请求超时时间
});

// 封装 GET 请求
// throw error; 不要抛出错误， redux-saga会停止监听

axiosInstance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 修改请求或响应数据格式以适应前端或后端的需求
    config.headers['Token'] = 'mytokenstring'; // 添加token
    config.headers['X-Custom-Header'] = 'foobar';
    return config;
  }, 
  error => {
    // 对请求错误做些什么
    console.log('对请求错误做些什么')
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    const responseError = error.response;
    if (responseError) {
      if (responseError.status === 401) {
        // 处理未授权的情况
      }
      if (responseError.status === 403) {
        console.log('403 被禁止访问')
      }
    }
    return Promise.reject(error);
  }
);


export const get = async (url, params, config = { retryCount: 3  }) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      if (config.retryCount > 0) {
        config.retryCount--;
        return get(url, params, config);
      } else {
        config.retryCount = 3;
      }
    } 
  }
};

// 封装 POST 请求
export const post = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 其他 HTTP 方法（PUT, DELETE等）也可以以类似的方式封装
