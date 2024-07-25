# Pull the postgresql image
FROM postgres:alpine

# Set the environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=concerts

# Expose the port
EXPOSE 5432

# Run the postgresql image
CMD ["postgres"] 

#  Step 2: Build the Docker Image 
#  docker buildx build --platform linux/arm64 -t postgresql:latest . 

#  Step 3: Run the Docker Container 
#  docker run --name postgresql -d -p 5433:5432 postgresql 

#  Step 4: Connect to the PostgreSQL Database 
#  docker exec -it <container_id>|<container_name> bash
#  psql -U postgres -d concerts 

