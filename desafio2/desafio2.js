const fs = require('fs');

class ProductManager{

    constructor(fileName){ 
        this.path = fileName;
    };

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                let products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            }else{
                return [];
            }

        }catch(error){
            console.log(error);
        }
    };

    async addProduct(title, description, price, thumbnail, code, stock){
        try{
            
            if(title != "" && description != "" && price != null && thumbnail != "" && code != ""){
                let product = {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock, 
                }
                let products = await this.getProducts();
                let validacionCode = products.find(product => product['code'] === code);
                if(!validacionCode){
                    if (products.length === 0) {
                        product['id'] = 1;
                    }else{
                        product['id'] = products[products.length - 1]['id'] + 1;  
                    }
                    products.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                    return products;
                }else{
                    console.log('Codigo de producto ya existe');
                }
            }else{
                console.log("falta informacion para agregar el  producto");
            }
        }catch(error){
            console.log(error);
        }
    };

    async getProductById(id){
        try{
            let products = await this.getProducts();
            let producto = products.find((product) => product.id === id);
            if(producto != null){
                return producto;
            }else{
                console.log('el Producto  no existe');
            }
        }catch(error){
            console.log(error);
        }
    };

    async updateProduct(id, title, description, price, thumbnail, code, stock){
        try{
            let products = await this.getProducts();
            let producto = products.find((product) => product['id'] === id);
            if(producto!= null){
                producto.title = title;
                producto.description = description;
                producto.price = price;
                producto.thumbnail = thumbnail;
                producto.code = code;
                producto.stock = stock;
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        } catch(error){
            console.log(error);
        }
    };

    async deleteProduct(id){
        try{
            let products = await this.getProducts();
            let producto = products.find(product => product['id'] === id);
            if(producto!= null){
                products.splice(products.indexOf(producto), 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        }catch(error){
            console.log(error);
        }
    };
};






let fileName = "./Products.JSON";
let productos = new ProductManager(fileName);
productos.deleteProduct().then(()=> productos.getProducts().then((res) => console.log(res)));
