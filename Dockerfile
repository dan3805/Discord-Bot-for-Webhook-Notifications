FROM node:latest

ARG GITHUB_REPO_URL

# Create a directory for the app and set it as the working 
RUN mkdir /start-script
WORKDIR /start-script

# Install dependencies
RUN apt-get update && apt-get install -y git

# Download the start script from GitHub
RUN echo "GITHUB_REPO_URL: $GITHUB_REPO_URL"
RUN curl -o start.sh $GITHUB_REPO_URL/main/start.sh && \
    chmod +x start.sh

# Set the start script as the default command
CMD ["./start.sh"]
