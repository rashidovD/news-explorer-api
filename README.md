# news-explorer-api / REST API
___
##<i>`Backend`</i> часть со стеком
1. **MongoDB**
2. **Express**
3. **NodeJS**
___
#### Чтобы запустить код локально

1. Клонировать репозиторий командой:
`git clone https://github.com/rashidovD/news-explorer-api.git`
2. Установить зависимости:
`npm install`
3. Запустить проект:
`npm run start` или `npm run dev`
* Проект запускается на <b>3000</b> порту:
[http://localhost:3000/](http://localhost:3000/)
* Публичный IP-адрес:
[178.154.226.254](http://178.154.226.254/)
___
####Домен
[api.rashidov.students.nomoreparties.co](https://api.rashidov.students.nomoreparties.co/)
___
#### Запросы
 `method` `http://localhost:3000/endpoint `

* **Регистрация**
`POST` `http://localhost:3000/signup`
* **Авторизация**
`POST` `http://localhost:3000/signin`
* **Инфо о юзере**
`GET` `http://localhost:3000/users/me`
* **Добавить статью**
`POST` `http://localhost:3000/articles`
* **Удалить статью**
`DELETE` `http://localhost:3000/articles/:id`
* **Получить все статьи пользователя**
`GET` `http://localhost:3000/articles`