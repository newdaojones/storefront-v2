import { config } from "config";
import axios, { AxiosInstance } from "axios";

export class DiscordService {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.DISCORD_URI,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (err) => {
        const error = err.response;

        if (error?.data) {
          throw error.data;
        }

        throw error;
      }
    );
  }

  static getInstance() {
    return new DiscordService();
  }

  async send(content: string) {
    try {
      console.log("discord start--------------------");
      console.log(content);
      const res = await this.axiosInstance.post("", {
        content,
      });

      console.log("discord sent---------------------");
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log("discord error--------------------");
      console.log(err);
    }
  }
}
