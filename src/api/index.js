import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'http://localhost:8081/table.json',
        method: 'get',
        params: query
    });
};
