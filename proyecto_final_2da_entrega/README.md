# SEGUNDA ENTREGA DEL PROYECTO FINAL

## Deberás entregar el avance de tu aplicación eCommerce Backend correspondiente a la segunda entrega de tu proyecto final

**Formato:** link a un repositorio en Github con el proyecto cargado.
**Sugerencia:** no incluir los node_modules

Formato: link a un repositorio en Github con el proyecto cargado.
Sugerencia: no incluir los node_modules

**Consigna:** Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollar dos contenedores más (que cumplan con la misma interfaz) que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

**Aspectos a incluir en el entregable:**

1. A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.
2. En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor (opcional: investigar el uso de imports dinámicos).
3. Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.

**Opcional:**

1. Hacer lo mismo para bases de datos relacionales: MariaDB/SQLite3.
