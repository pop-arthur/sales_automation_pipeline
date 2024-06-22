FROM python:3
RUN apt-get update -y && apt-get install -y build-essential
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 8000
ENTRYPOINT ['python']
CMD ['app.py']