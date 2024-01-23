# Use an official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.8-slim

# Install valgrind.
RUN apt-get update && apt-get install -y valgrind

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the local source code to the container's working directory
COPY . .

# Command to run when starting the container
CMD ["bash"]
