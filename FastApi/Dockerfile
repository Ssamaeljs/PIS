FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

COPY . /app/ 

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r /app/requirements.txt

RUN pip install requests

