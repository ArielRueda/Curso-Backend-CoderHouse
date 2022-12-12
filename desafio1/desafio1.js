class ProductManager {

    constructor() {
        this.products = [];
    }
    getProducts() {
        return this.products;
    };
    getProductsById(id) {
        let product = this.products.find(product => product["id"] === id);
        if (product != null) {
            return product;

        } else {
            console.log("Not found");
            return null;
        }
    };

    addProducts(title, descripcion, price, thumbnail, code, stock) {
        if (title != "" &&  descripcion != "" && price != null && thumbnail != "" && code != "") {


            let products = {
                title,
                descripcion,
                price,
                thumbnail,
                code,
                stock,


            }
            if (this.products.length === 0) {
                products["id"] = 1
                this.products.push(products);
            } else {
                let validacionCode = this.products.find(product => product["code"] === code)
                if (!validacionCode) {
                    products["id"] = this.products[this.products.length - 1]["id"] + 1
                    this.products.push(products);

                } else {
                    console.log("producto repetido");
                }


            }

        }

    }




}
const compra = new ProductManager()

compra.addProducts("arroz", "es la semila de la planta oryza sativa", 180, "sin imagen", 374346, 20)
compra.addProducts("arroz", "es la semila de la planta oryza sativa", 180, "sin imagen", 374346, 20)
compra.addProducts("spaghetti", "es un  tipo de pasta italiana", 400, "sin imagen", 346, 6)

console.log(compra.getProducts());





