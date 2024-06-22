FROM python:3
RUN apt-get update -y && apt-get install -y build-essential
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 80/tcp
EXPOSE 80/udp
ENTRYPOINT ['python']
CMD ["flask", "run", "--host", "0.0.0.0"]
