FROM python:3
RUN apt-get update -y && apt-get install -y build-essential
COPY . /app
WORKDIR /app
ENV FLASK_APP=app.py

RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]

EXPOSE 8000