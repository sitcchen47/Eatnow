# Eatnow

Xin Song, Chao Chen, Zhuang Yixin
Stevens CS546 Final Project

<<<<<<< HEAD
=======
Usage: 

```javascript
    npm install 
    npm start
```
在浏览器地址栏中输入 localhost:3000/profile        

在浏览器地址栏中输入 localhost:3000/  点击sign in/sign up

---

1. view功能查看restaurant具体信息没有实现 
2. model.js 中把restaurant的设计有了更改
3. 表单验证加在 public/JavaScript/addRestaurant.js中

* Note: jQuery用的静态服务器端文件, 考虑直接引用cdn

--- 

1. navbar实现
2. 明天做 sidebar 
3. restaurant.hbs 可以复用

>>>>>>> 4083272bf6b3987cd6c6eac34879711cf51549f0
---

1. routes design

    1.1 GET  '/'        render('index')  
    1.2 POST '/login'   redirect('profile') change the sign in/sign up to 'Seller or Customer' $user logged in/log out 
    1.3 POST '/signin'  two options
    
    1.4 GET  '/profile' --> profileRouter
        this router should be blocked if the user is not logged in. And show the message.

    1.5 GET  '/restaurants/:id' --> restaurantsRouter

    1.6 POST  '/comments/:id'   --> commentsRouter 
        redirect('back')
<<<<<<< HEAD
        this router should be blocked if the user is not logged in. And show the message.
=======
        this router should be blocked if the user is not logged in. And show the message.
>>>>>>> 4083272bf6b3987cd6c6eac34879711cf51549f0
