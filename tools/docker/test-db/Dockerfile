FROM mongo:latest

# Expose the port that the test database will be running on
EXPOSE 27017

# Copy the MongoDB config and initialization script
COPY mongo-init.sh /docker-entrypoint-initdb.d/mongo-init.sh
RUN chmod +x /docker-entrypoint-initdb.d/mongo-init.sh

COPY fixtures /fixtures
