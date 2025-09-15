# API LINK NOTE

# Descripción
LinkNote es una aplicación que combina lo mejor de un bloc de notas digital y un gestor de enlaces. Está diseñada para ayudarte a capturar ideas, guardar enlaces importantes, organizar tareas y gestionar tu conocimiento personal de forma clara y estructurada.

# Instalar Dependencias

``` 
bash npm i
```

# Configurar Variables de Entorno

```
PORT=3000
URI_DB=mongodb+srv://[nombre:contrasena]@[clusterData]
```

# Estructura del Proyecto
``` 
|--models/
|--controllers/
|--routes/
|--routes/
|--index.js
|--package.json
|--.gitignore
|--.env
```

# Endpoints de la API
# Gestión de Enlaces

| Método   | Endpoint                              | Descripción                         |
| -------- | ------------------------------------- | ----------------------------------- |
| `GET`    | `/api/links`                          | Obtener todos los enlaces           |
| `GET`    | `/api/links/:id`                      | Obtener un enlace por su ID         |
| `POST`   | `/api/links`                          | Crear un nuevo enlace               |
| `PUT`    | `/api/links/:id`                      | Actualizar un enlace existente      |
| `DELETE` | `/api/links/:id`                      | Eliminar un enlace                  |
| `GET`    | `/api/links/link-filter/link?link=valor`   | Filtrar enlaces por URL (`link`)    |
| `GET`    | `/api/links/group-filter/group?group=valor` | Filtrar enlaces por grupo (`group`) |


# Gestión de Notas

| Método   | Endpoint                                    | Descripción                              |
| -------- | ------------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/notes`                                | Obtener todas las notas                  |
| `GET`    | `/api/notes/:id`                            | Obtener una nota por su ID               |
| `POST`   | `/api/notes`                                | Crear una nueva nota                     |
| `PUT`    | `/api/notes/:id`                            | Actualizar una nota existente            |
| `DELETE` | `/api/notes/:id`                            | Eliminar una nota                        |
| `GET`    | `/api/notes/filter/status?status=valor`     | Filtrar notas por estado (`status`)      |

# Datos

| Nombre y Apellido:       | Veronika Chunaeva               | 
| Nombre de la materia:    | Aplicaciones Híbridas           | 
| Nombre del docente:      | Jonathan Emanuel Cruz           | 
| `Comisión:               | DWT4AP                          | 
