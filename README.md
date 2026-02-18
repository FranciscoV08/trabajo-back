# ⚙️ Configuración de Variables de Entorno (.env)

Este proyecto usa variables de entorno para manejar configuraciones sensibles como el puerto del servidor y la conexión a la base de datos.

Por seguridad, el archivo `.env` **NO está incluido en el repositorio**.

---

## 📌 1. Crear el archivo `.env`

En la raíz del proyecto (misma carpeta que `package.json`) crear un archivo:


---

## 📌 2. Configurar las variables

Copiar el siguiente contenido dentro del archivo:

### MongoDB local
PORT=3000
MONGO_URI=mongodb://localhost:27017/tu_base_de_datos