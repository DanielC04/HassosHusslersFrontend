# container to run the backend only
# docker build -t jafber/monoplan .
# docker run --rm -p 5000:4254 -t jafber/monoplan

FROM python:3.12-bookworm
WORKDIR /monoplan

RUN apt-get update
RUN apt-get install -y librsvg2-bin libgl1

COPY ./back/requirements.txt ./
RUN pip install -r requirements.txt

COPY ./back/* ./
EXPOSE 4254
ENTRYPOINT [ "gunicorn", "-w", "2", "-b", "0.0.0.0:4254", "server:app" ]
