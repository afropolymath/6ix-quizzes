# 6ix Quizzes (Django)

6ix Quizzes is a sample application created to leverage the main features of DRF JWT authentication highlighted in this tutorial - https://svbtle.com/authentication-using-django-rest-framework.

Let's build an open quiz platform to succeed one of my favorite, now dead, quiz platforms, **Smarterer**.

Using the platform you can do the following:
1. Perform basic CRUD operations on quizzes
2. Run a quiz
3. Mark quizzes as private/public
4. Share test links with users. Private quizzes accessible to only invited users and public quizzes available to all.

## Installation
Ensure you have Python installed on your system. This application uses Python 2.X.

Install the requirements in the requirement.txt file.

```
pip install -r requirements.txt
```

Ensure to create and run your migrations.

```
python run app/manage.py makemigrations
python run app/manage.py migrate
```

You can update other settings within `app/settings.py` to suit your environment database settings etc.

> **RECOMMENDED:** Use either Docker or a virtual environment to ensure your dependencies are local to your app.

## Usage
The application backend is written in Python/Django and is housed in the `/app` folder. Run the backend using this from the root folder:

```
python run app/manage.py runserver
```

TODO: Come up with unified controller script for running dev environment for FE and BE.

## Technologies

- Backend - Python/Django + DRF
- Frontend - Vue.js (Proposed)
- Database - PostgreSQL


## Using Docker
TODO: Docker setup