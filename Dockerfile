FROM python:3
RUN apt-get update -y && apt-get install -y build-essential
WORKDIR /main
COPY . .
ENV FLASK_APP=app.py
EXPOSE 8000


RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]

