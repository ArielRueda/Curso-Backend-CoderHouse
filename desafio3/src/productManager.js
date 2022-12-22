

import fs from 'fs'

class ProductManager {
  constructor(path) {
    this.path = path
    fs.existsSync(this.path) ? this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.products = [];
  }

   async addProduct (title, description, price, thumbnail, code, stock) {
    let producto = {
      'title': title,
      'description': description,
      'price': price,
      'thumbnail': thumbnail,
      'code': code,
      'stock': stock,
    }

    this.products.length === 0 ? producto["id"] = 1 : producto["id"] = this.products[this.products.length - 1]["id"] + 1
    let encontrado = this.products.some(elemento => elemento.code === code)

    if (encontrado) console.warn('Advertencia agregando producto: Producto repetido! \n')
    else {
      this.products.push(producto)
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    }

  }

  getProducts = () => {
    return this.products
  }

  getElementById = (id) => {
    let producto = this.products.find(el => el.id === id)
    return producto 
  }


  async updateProduct(id, campo, valorNuevo) {

    let index = this.products.findIndex(element => element.id === id)
    let campoValido = Object.keys(this.products[index]).some(el => el === campo)
    if (campo === 'id') {
      console.error('Error actualizando producto : El id no puede ser modificado\n')
    } else if (!campoValido) {
      console.error('Error actualizando producto: Elija un campo valido\n')
    } else {
      this.products[index][campo] = valorNuevo;
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    }


  }


  async deleteProduct(id) {
    let encontrado = this.products.some(el => el.id === id)
    if (encontrado) {
      this.products = this.products.filter(el => el.id !== id)
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
      console.log('Producto eliminado exitosamente \n')
    } else {
      console.error('Producto no encontrado')
    }
  }
}




const manager = new ProductManager('./desafio.json')


export default new ProductManager('./desafio.json')