import { Axios, AxiosInstance } from 'axios';
import axios from 'axios';
import { To } from 'react-router-dom';


export class AxiosClient {
    static client: AxiosClient;

    static getInstance(): AxiosClient {
        if(AxiosClient.client === null){
            AxiosClient.client = new AxiosClient()
        }

        return AxiosClient.client;
    }

    private instance: AxiosInstance;

    private constructor(){
        this.instance = axios.create({
            baseURL: 'http://localhost:8000/',
            timeout: 5000
        });
    }

    async get(url: string): Promise<any>{
        return this.instance.get(url);
    }

    async post(url: string, data: any, onSuccess: (response: any) => (any), onError: (error: any) => any): Promise<any>{
        return 
            this.instance.post(url, data)
            .then(onSuccess)
            .catch(onError);
    }


    async put(url: string, data: any): Promise<any>{
        return this.instance.put(url, data);
    }

    async delete(url: string): Promise<any>{
        return this.instance.delete(url);
    }

}