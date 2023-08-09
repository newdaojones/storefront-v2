import { User } from "@prisma/client";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { config } from "config";
import { CreateOrderData } from "types/order";
import prisma from "@/lib/prisma";

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

  static getInstance() {
    return new PylonService()
  }

  async privateApi(data: AxiosRequestConfig, user: User) {
    try {
      const res = await this.axiosInstance.request({
        ...data,
        headers: {
          ...data.headers,
          'Authorization': `Bearer ${user.token}`
        }
      })

      return res.data
    } catch (err: any) {
      if (err.status === 401 && user.email) {
        const token = await this.login(user.email)

        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            token
          }
        })

        const res = await this.axiosInstance.request({
          ...data,
          headers: {
            ...data.headers,
            'Authorization': `Bearer ${token}`
          }
        })

        return res.data
      }

      throw err
    }
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

    return res.data.token
  }

  async getKYCLink(walletAddress?: string) {
    const user = await prisma.user.findUnique({
      where: {
        walletAddress
      }
    })

    if (!user) {
      throw new Error(`Not found user for ${walletAddress}`)
    }

    const res = await this.privateApi({
      method: 'GET',
      url: '/kyb_link',
    }, user)

    return res.link
  }

  async sandboxApproveAccount(user: User) {
    return this.privateApi({
      method: 'POST',
      url: '/kyb_success/sandbox'
    }, user)
  }

  async createOrder(data: CreateOrderData, user: User) {
    return this.privateApi({
      method: 'POST',
      url: '/orders',
      data
    }, user)

  }
}