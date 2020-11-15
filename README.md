# news-explorer-api / REST API
___
## <i>`Backend NewsExplorer`</i>

| Стек технологий   |
| -------------  |
|  NodeJS    |
|  MongoDB    |
|  Express |
___
### Начать
| Локально |
| :-------------  |
| **1. Клонировать репозиторий** |
| `git clone https://github.com/rashidovD/news-explorer-api.git ` |
| **2. Установить зависимости** |
| `npm install` |
| **3. Запустить проект** |
| `npm run start` или `npm run dev` |
| **4. Порт на котором запускается проект** |
| [http://localhost:3000/](http://localhost:3000/) |

|Удаленно|
|:-------------|
| **1. Публичный IP-адрес** |
| [178.154.226.254](http://178.154.226.254/) |
| **2. Домен** |
| [api.rashidov.students.nomoreparties.co](https://api.rashidov.students.nomoreparties.co/) |

___
### Запросы

| Действие  | Метод  | Эндпоинт |
|:------------- |:---------------| :-------------|
| Регистрация      | POST |     http://localhost:3000/signup |
| Авторизация      | POST        |         http://localhost:3000/signin   |
| Инфо о юзере | GET        |        http://localhost:3000/users/me |
| Добавить статью | POST        |        http://localhost:3000/articles |
| Удалить статью | DELETE        |        http://localhost:3000/articles/:id |
| Получить все статьи  | GET        |        http://localhost:3000/articles |
___
Переход на **frontend** сайта по ссылке: [github.com/rashidovD/news-explorer-frontend](https://github.com/rashidovD/news-explorer-frontend)