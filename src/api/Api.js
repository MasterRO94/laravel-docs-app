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

  static async loadSections(version) {
    const response = await this.client.get(`/docs/${version}/sections`);

    return response.data.data;
  }

  static async loadPages(version) {
    const response = await this.client.get(`/docs/${version}/pages`);

    return response.data.data;
  }
}
