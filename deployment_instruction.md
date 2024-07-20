# Deployment Instruction

## Stack
This project is based on python flask package and sqlite database.

## Requirements
To delpoy the project, firstly, install dependencies from requirements.txt

## Executing file
To start the program run the app.py file

## Dockerfile
You can use dockerfile for deployment
```Dockerfile
FROM python:3
RUN apt-get update -y && apt-get install -y build-essential
WORKDIR /main
COPY . .
ENV FLASK_APP=app.py
EXPOSE 8000


RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]
```
