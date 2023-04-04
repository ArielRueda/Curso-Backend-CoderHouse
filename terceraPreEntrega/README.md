# Server-with-Twilio


# Endpoints y cosas a tener en cuenta

###RUTA BASE : localhost:PORT/api

### Sessiones 

- api/sessions/login --> Para loguearte con una cuenta registrada
- api/sessions/register --> Para registrarse
- api/sessions/current --> Informacion sobre cuenta tras iniciar sesion

















### Tercera entrega de proyecto coderhouse


## TAREAS PENDIENTES 

TENEMOS QUE SEGUIR TRABAJANDO EN EL PATRON Repository, HAY QUE SACAR TODOS LOS IMPORTS DE LOS VALIDADORES Y CREAR LA INSTANCIA DEL SERVICIO. 
TENDREMOS QUE HACER COMPATIBLE LOS NOMBRRES Y COMPROBAR TODOS LOS METODOS NECESARIOS.
MODULARIZAR EL CHAT
TRABAJAR EN RUTA DE COMPRA DE CARRITO, FALTAN CONTROLADORES Y VER LA LOGICA PARA DESCONTAR DE PRODUCTOS

## Requisitos

Objetivos generales

Profesionalizar el servidor
Objetivos específicos

Aplicar una arquitectura profesional para nuestro servidor
Aplicar prácticas como patrones de diseño, mailing, variables de entorno. etc.

### Se debe entregar

Modificar nuestra capa de persistencia para aplicar los conceptos de Factory (opcional), DAO y DTO. 

### Se debe entregar

 - [X] El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con él. (Factory puede ser opcional)

- [X] Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio. 
 - [X] Modificar la ruta  /current Para evitar enviar información sensible, enviar un DTO del usuario sólo con la información necesaria.

### Se debe entregar

- [X] Realizar un middleware que pueda trabajar en conjunto con la estrategia “current” para hacer un sistema de autorización y delimitar el acceso a dichos endpoints:
- [X] Sólo el administrador puede crear, actualizar y eliminar productos.
- [X] Sólo el usuario puede enviar mensajes al chat.
- [X] Sólo el usuario puede agregar productos a su carrito.

### Se debe entregar
- [X] Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Éste contará con los campos
Id (autogenerado por mongo)
code: String debe autogenerarse y ser único
purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
amount: Number, total de la compra.
purchaser: String, contendrá el correo del usuario asociado al carrito.

### Se debe entregar

- [X]  Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de dicho carrito.
La compra debe corroborar el stock del producto al momento de finalizarse
Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar.
Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra. 

### Se debe entregar

- [X] Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra.
En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse.
Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener sólo los productos que no pudieron comprarse. Es decir, se filtran los que sí se compraron y se quedan aquellos que no tenían disponibilidad.


### Twilio y Nodemailer 

- [X] Se utilizan estos modulos en la creacion de un carrito, como en la compra de los mismos. 
