export interface IProduct {
    _id: string
    name: string
    price: number
    description: string
    restaurant: string
    rating: number
    count?: number
}

export interface IOrder {
    _id: string
    name: string
    email: string
    address: string
    phone: string
    orderSum: number
    order: IProduct[]
}


export interface IMenu {
    selectedShop: string
    shops: string[]
}
