# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY restaurantproj restaurantproj
COPY warehouses warehouses
COPY requirements.txt requirements.txt
COPY manage.py manage.py
RUN pip install -r requirements.txt
CMD gunicorn --bind 0.0.0.0:8000 restaurantproj.wsgi