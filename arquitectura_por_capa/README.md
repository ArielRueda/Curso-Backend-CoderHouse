# Arquitectura-por-capas-Backend

##  Capas 

Volcaremos nuestro proyecto anterior a uno con arquitectura por capas. 
La cadena de responsabilidades va de esta manera: 

RUTA >> CONTROLLER >> VALIDATOR >> SERVICES


Hasta ahora hemos trabajado en el ruteo de los productos.
## La informacion de la base de datos se encuentra en un archivo .env
## Notas sobre el manejo de la ruta get de products 
La ruta GET nos mostrar no solo informacion sobre la lista de productos que tenemos, sino que informacion sobre la cantidad de documentos y paginas.
Para dar mas informacion sobre los req querys y params, somos capaces de añadir un limite, una query, un sort y una pagina deseada. 
El sort es a base de precio. 
El query debe estar escrito como si fuese un objeto, con {}, un ejemplo seria query = {"code":"A330"}


## Con respecto  POST 

Tenemos pendiente revisar la respuesta de la base de datos ante duplicados, fuera de eso, la creacion de productos funciona. 


## Problema con PUT 

No funciona el metodo PUT, si bien el controlador toma bien el objecto, al pasarse por el validador y el servicio pasa a ser un objeto inleible. 



-SOLUCIONADO- Se analizo el codigo, se manejò con try catch el proceso de DAO. Se estaba haciendo el metodo PUT con el campo CODE, este campo no se debe modificar
ya que esta por schema como unico. Se agrega en validaciones para evitar problemas.
