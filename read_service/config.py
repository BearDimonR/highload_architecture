import os

# DATABASE
user = os.environ['MYSQL_USER']
password = os.environ['MYSQL_PASSWORD']
host = os.environ['MYSQL_HOST']
database = os.environ['MYSQL_DB']
port = os.environ['MYSQL_PORT']

DATABASE_CONNECTION_URI = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}'

print('------- ' + DATABASE_CONNECTION_URI + ' -----------')

# REDIS CACHE
WTF_CSRF_ENABLED = True
REDIS_URL = os.environ['REDIS_URL']
CACHE_TYPE = os.environ['CACHE_TYPE']
CACHE_DEFAULT_TIMEOUT = os.environ['CACHE_DEFAULT_TIMEOUT']