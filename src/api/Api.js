import axios from 'axios';
import config from '@/config';

export default class Api {
  static get client() {
    return axios.create({
      baseURL: config.apiBaseUrl,
    });
  }

  static checkHealth() {
    return Api.client.get('/health');
  }
}
