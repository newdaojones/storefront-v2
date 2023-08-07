import axios, { AxiosInstance } from "axios";
import { config } from "config";

export class PylonService {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.PYLON_API_URI
    })

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (err) => {
        const error = err.response;

        if (error?.data) {
          throw error.data;
        }

        throw error;
      },
    );
  }

  async createPartner(data: any) {
    const res = await this.axiosInstance.post('/', data)

    return res.data
  }

  async getTosLink(redirectUri: string) {
    const res = await this.axiosInstance.post('/tos_link', {
      redirectUri
    })

    return res.data.link
  }

  async login(email: string) {
    const res = await this.axiosInstance.post('/login', {
      email,
      password: config.PYLON_PASSWORD
    })

    return res.data.link
  }
}