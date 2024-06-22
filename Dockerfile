FROM python:3
RUN apt-get update -y && apt-get install -y build-essential
COPY . /app
WORKDIR /app
EXPOSE 5000
ENV FLASK_APP=app.py

RUN pip install -r requirements.txt
ENTRYPOINT [ "flask"]
CMD [ "run", "--host", "0.0.0.0" ]
