FROM python:3
RUN apt-get update -y && apt-get install -y build-essential
COPY . /app
WORKDIR /app
EXPOSE 8000
ENV FLASK_APP=app.py

RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]
