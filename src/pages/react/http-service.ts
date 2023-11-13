
import { get } from "utils/http";


export const fetchApi1 = async () => {
    const response = await get('/api1', { name: 'alice' });
    return response;
};
  