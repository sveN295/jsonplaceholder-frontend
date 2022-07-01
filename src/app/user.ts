export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: Adress[];
    geo?: Geo[];
    phone: string;
    website: string;
    company?: Company[]
  }

export interface Adress {
    street: string;
    suite: string;
    city: string;
    zipcode: string
}

export interface Geo {
    lat: number;
    long: number
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string
}

export interface ToDo {
    userId: number;
    id: number;
    title: string;
    completed: boolean
}