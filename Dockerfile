FROM node:latest

ARG GITHUB_REPO_URL

# Create a directory for the app and set it as the working directory
WORKDIR .

# Install dependencies
RUN apt-get update && apt-get install -y git

# Download the start script from GitHub
echo "GITHUB_REPO_URL: $GITHUB_REPO_URL"
RUN curl -o start.sh $GITHUB_REPO_URL/main/start.sh && \
    chmod +x start.sh

# Set the start script as the default command
CMD ["./start.sh"]
