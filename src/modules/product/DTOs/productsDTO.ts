import { Category } from "../infra/typeorm/entities/category";

interface IProducts {
    id?: string;
    name: string;
    description: string;
    valor: number;
    estoque: number;
    image?: string;
    category: Category;
    type: string;
}


export { IProducts }