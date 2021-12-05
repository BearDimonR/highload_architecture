import os

# DATABASE
user = os.environ['MYSQL_USER']
password = os.environ['MYSQL_PASSWORD']
host = os.environ['MYSQL_HOST']
database = os.environ['MYSQL_DB']
port = os.environ['MYSQL_PORT']

DATABASE_CONNECTION_URI = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}'

# REDIS CACHE
WTF_CSRF_ENABLED = True
REDIS_URL = os.environ['REDIS_URL']
CACHE_TYPE = os.environ['CACHE_TYPE']
CACHE_DEFAULT_TIMEOUT = os.environ['CACHE_DEFAULT_TIMEOUT']

# user='librarian'
# password='pass'
# host='localhost'
# port='3306'
# database='library'
# REDIS_URL='redis://localhost:6379/0'
# QUEUES='default'
# DATABASE_CONNECTION_URI = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}'
# CACHE_TYPE = 'redis'
# CACHE_DEFAULT_TIMEOUT = 500