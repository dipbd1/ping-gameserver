import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const networkService = {
  init() {
    Vue.use(VueAxios, axios);
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = true;
  },

  get(resource) {
    return Vue.axios.get(`${resource}`); // .catch(error => {
    //   throw new Error(`[RWV] ApiService ${error}`);
    // });
  },
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },
  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  patch(resource, params) {
    return Vue.axios.patch(`${resource}`, params);
  },

  delete(resource, data) {
    return Vue.axios.delete(resource, { data }).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
};

export default networkService;
