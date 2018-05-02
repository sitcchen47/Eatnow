# Eatnow

Xin Song, Chao Chen, Zhuang Yixin
Stevens CS546 Final Project

---
<<<<<<< HEAD
1. <string>Mon, Apr 4th 2018</strong>   

log in 和 sign up 界面上的 go to home 和 already have an account/ login 

将通过 [bootstrap modal](https://getbootstrap.com/docs/4.1/components/modal/) 实现 
=======

1. routes design

    1.1 GET  '/'        render('index')  
    1.2 POST '/login'   redirect('profile') change the sign in/sign up to 'Seller or Customer' $user logged in/log out 
    1.3 POST '/signin'  two options
    
    1.4 GET  '/profile' --> profileRouter
        this router should be blocked if the user is not logged in. And show the message.

    1.5 GET  '/restaurants/:id' --> restaurantsRouter

    1.6 POST  '/comments/:id'   --> commentsRouter 
        redirect('back')
        this router should be blocked if the user is not logged in. And show the message.
>>>>>>> 1de125f2bf030c58d9f6f00595ec6d42133a1308
