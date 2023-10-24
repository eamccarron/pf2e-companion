FROM mongo:latest

# Expose the port that the test database will be running on
EXPOSE 26017

# Copy the MongoDB config and initialization script
COPY mongod.conf.yaml /etc/mongo/mongod.conf
COPY mongo-init.sh /docker-entrypoint-initdb.d/mongo-init.sh

COPY fixtures /fixtures
