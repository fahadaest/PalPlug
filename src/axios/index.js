import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});
const calendlyInstance = axios.create({
    baseURL: 'https://api.calendly.com',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
    },
  });

const failedResponse = (error) => {
    if (
        error.response &&
        error.response.status &&
        error.response.status === 401
    ) {
        window.location.replace(AppRoutes.LOGOUT.path);
    }
    return Promise.reject(error);
};
export const getRequest = (route, data) => {
    return axiosInstance
        .get(route, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};
export const postRequest = (route, data, requireAccessToken) => {
    const accessToken = window.sessionStorage.getItem('accessToken');
    let authenticatedHeaders;
    if (requireAccessToken && accessToken) {
        authenticatedHeaders = {
            Authorization: `Bearer ${accessToken}`,
        };
        // Don't set Content-Type for FormData, let the browser set it with the boundary
        if (!(data instanceof FormData)) {
            authenticatedHeaders['Content-Type'] = 'application/json';
        }
    }
    return axiosInstance
        .post(route, data, {
            headers: requireAccessToken ? authenticatedHeaders : undefined,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};

export const deleteRequest = (route, data) => {
    return axiosInstance
        .delete(route, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};

export const putRequest = (route, data) => {
    return axiosInstance
        .put(route, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};
export { calendlyInstance };