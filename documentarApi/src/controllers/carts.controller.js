import cartValidator from "../validators/cartsValidator.js";
import config from "../config/config.js";
import nodemailer from 'nodemailer'



const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 3000,
  auth: {
    user: config.mail_account,
    pass: config.mail_pass
  }
})

class cartController {


  async getCarts(req, res) {

    let limit = parseInt(req.query.limit)

    try {
      const result = await cartValidator.getCarts(limit)
      req.logger.debug(result)
      res.render('carts', { result })
    } catch (error) {
      res.json(error)
    }
  }


  async getCartById(req, res) {
    const result = await cartValidator.getCartById(req.params.cid)
    try {
      req.logger.debug(`Resultado de getCartbyId en controler ${result}`)
      res.render('cartById', { result })
    } catch (error) {
      res.json(error)
    }
  }

  async createCart(req, res) {
    try {
      await cartValidator.createCart()
      await transport.sendMail({
        from: 'Ariel <arielrueda13@gmail.com>',
        to: req.user.user,
        subject: 'Carrito nuevo creado',
        html: `
         <div>
          <h1> Hey! Has creado un carrito exitosamente! </h1>
        </div> 
`, attachments: []

      })
      req.logger.info("Mail has been sent")
      res.status(201).json({ info: 'Cart Created' })
    } catch (error) {
      req.logger.error("Something has happened", error)
      res.status(400).json({ info: `Something has happened: ${error}` })
    }


  }

  async updateCart(req, res) {
    const cid = (req.params.cid)
    const { quantity, pid } = req.body;
    const product = { product: pid, quantity: quantity }

    try {
      const user = req.user
      await cartValidator.updateCart(cid, product, user)
      req.logger.info("Product has been updated")
      res.send({ status: 200, payload: await cartValidator.getCartById(cid) })
    } catch (error) {
      console.log(error.message)
      res.status(400).json({ error: error.message })
    }
  }

  async updateQuantityFromCart(req, res) {

    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
      await cartValidator.updateQuantityToCart(cid, pid, quantity)
      req.logger.info("Quantity of product has been updated")
      res.json({ message: "Quantity Updated", payload: await cartValidator.getCartById(cid) })
    } catch (error) {
      console.log(error)
      req.logger.error("No se ha actualizado el producto en el carrito")
      res.json({ error: error })

    }

  }

  async deleteProductFromCart(req, res) {
    const { cid, pid } = req.params;
    try {
      await cartValidator.deleteProductFromCart(cid, pid)
      req.logger.info("Product has been deleted from cart")
      res.json({ message: `PID: ${pid} has been deleted from cart ${cid}`, payload: await cartValidator.getCartById(cid) })
    } catch (error) {
      res.json({ error: error.message })
    }
  }



  async emptyCart(req, res) {
    let { cid } = (req.params)
    try {
      await cartValidator.emptyCart(cid)
      req.logger.info("Cart has been emptied")
      res.json({ status: 200, message: 'Cart Eliminated' })
    } catch (error) {
      res.json({ error })
    }
  }


  async purchase(req, res) {


    let { cid } = (req.params)
    let user = req.user


    try {
      const result = await cartValidator.purchase(cid, user)
      req.logger.info("cart has been purchased")
      res.json({ message: "Se ha generado el siguiente ticket:", result })
    } catch (Error) {
      res.json({ error: Error.message })

    }

  }


}

export default new cartController()
