<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Arquitectura de la API REST para Ferretería

La API REST para la Ferretería Esmil está diseñada para gestionar productos, clientes y pedidos. A continuación se presenta una descripción de las entidades principales y sus propiedades, así como las relaciones entre ellas.

## Entidades Principales

### Producto

- **id**: Identificador único del producto (string).

- **name**: Nombre del producto (cadena de texto).

- **description**: Descripción del producto (cadena de texto).

- **price**: Precio del producto (numérico).

- **stock**: Cantidad disponible en stock del producto (numérico).

- **category**: Categoría a la que pertenece el producto (cadena de texto).

### Categoria

- **name**: Nombre de la Categoria (cadena de texto).

- **description**: Descripción de la categoria (cadena de texto).

- **description**: Descripción de la categoria (cadena de texto).

- **available**: Verificar si la categoria esta disponible (boolean).

### Cliente

- **id**: Identificador único del cliente (numérico).

- **name**: Nombre del cliente (cadena de texto).

- **address**: Dirección del cliente (cadena de texto).

- **contact**: Información de contacto del cliente (cadena de texto).

### Pedido

- **id**: Identificador único del pedido (numérico).

- **customer**: Cliente que realizó el pedido (referencia al ID del cliente).

- **products**: Lista de productos pedidos junto con sus cantidades.

- **state**: Estado actual del pedido (cadena de texto).

## Relaciones

- Un cliente puede realizar varios pedidos, estableciendo una relación uno a muchos entre `Cliente` y `Pedido`.

- Un Producto puede tener una categoria, estableciendo una relacion entre uno a Muchos entre `Producto` y `Categoria`.

- Un pedido puede contener varios productos, estableciendo una relación uno a muchos entre `Pedido` y `Producto`.

## Endpoints de la API REST

- `/n/products`: Gestiona operaciones relacionadas con los productos (GET, POST, PUT, DELETE).

- `/n/category`: Gestiona operaciones relacionadas con los clientes (GET, POST, PUT, DELETE).

- `/n/orders`: Gestiona operaciones relacionadas con los pedidos (GET, POST, PUT, DELETE).

- `/n/customer/{id}/orders`: Obtiene los pedidos de un cliente específico (GET).

- `/orders/{id}/products`: Obtiene los productos de un pedido específico (GET).

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo ```.env.template``` y renombar la copia a ```
.env```

6. Llenar las variables de entorno definidas en el ```.env```

7. Ejecutar la aplicación en dev:
```
yarn start:dev
```

8. Reconstruir la base de datos con la semilla
```
http://localhost:4040/api/n/seed/?limit=25
```

## Stack usado
* MongoDB
* Nest


# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```



# Notas