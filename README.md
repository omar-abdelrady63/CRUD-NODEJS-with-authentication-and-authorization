# Node.js REST API  

A REST API built with **Node.js**, **Express**, and **MongoDB** featuring Authentication, CRUD operations, and File Uploads.  

## 🚀 Features
- JWT Authentication & Role-based Authorization  
- User & Post CRUD Operations  
- File Uploads (Local & ImageKit CDN)  
- Input Validation (Joi)  
- Rate Limiting & Centralized Error Handling  
- Security (bcrypt, CORS) + Logging (morgan)  
- Auto-create first admin on startup  

## 🛠️ Installation
```bash
git clone <https://github.com/omar-abdelrady63/CRUD-NODEJS-with-authentication-and-authorization>
cd CRUD-NODEJS-with-authentication-and-authorization
npm install
npm run dev   # Development
npm start     # Production
```

Server runs on: `http://localhost:8000`  

## 🔑 Authentication
Use JWT token in headers:  
```
Authorization: Bearer <token>
```

Roles:  
- **user** → Basic access  
- **admin** → Full access  

## 📁 File Upload
- **Local** → stored in `/uploads`  
- **CDN** → uploaded to ImageKit  
- Max size: 5MB | Formats: JPG/JPEG/PNG  

## 📚 API Endpoints
- `POST /auth/signup` → Register  
- `POST /auth/login` → Login  
- `GET /users` (admin) → List users  
- `POST /users` → Create user  
- `PATCH /users/:id` → Update user  
- `DELETE /users/:id` → Delete user  
- `POST /posts` → Create post  
- `GET /posts` → Get posts  
- `PATCH /posts/:id` → Update post  
- `DELETE /posts/:id` → Delete post  

## 🔧 Tech Stack
- **Express** • **MongoDB (Mongoose)** • **JWT** • **bcrypt**  
- **Multer** • **ImageKit** • **Joi** • **Morgan** • **Rate-limit**  

## 📝 License
ISC License  
