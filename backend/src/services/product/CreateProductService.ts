import prismaClient from "../../prisma";

interface ProductRequest{
    name: String;
    price: String;
    description: String;
    banner: String;
    category_id: String;
}

class CreateProductService {
    async execute({name,price,description,banner,category_id}:ProductRequest){

        return {ok:true}
    }
}

export {CreateProductService}