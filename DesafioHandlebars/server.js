import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import homeRouter from './src/routes/home.routes.js'
import ProductManager from './src/helpers/ProductManager.js'
import { Server } from 'socket.io'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const httpServer = app.listen(8080, () => console.log("Listening on port 8080"))
const io = new Server(httpServer)


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/src/views/')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + './public'))
app.use('/', homeRouter)


app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts')
})


let historial = ProductManager.getProducts()

io.on('connection', (socket) => {
  console.log("Se ha conectado el socket con id : !", socket.id)
 
  socket.emit("arrayProductos", historial)

 
  socket.on("newProduct", (data) => {
    ProductManager.addProduct(data)
    io.emit("arrayProductos", historial)
    console.log("Se ha agregado un producto")
  })


  socket.on("eliminarProducto", id => {
    ProductManager.deleteProduct(id)
    io.emit("arrayProductos", historial)
    console.log("Se ha eliminado un producto")
  })

})




