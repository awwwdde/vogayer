import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createCloth = async (cloth) => {
    const {data} = await $authHost.post('api/cloth', cloth)
    return data
}

export const fetchClothes = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/cloth', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneCloth = async (id) => {
    const {data} = await $host.get('api/cloth/' + id)
    return data
}
