# Copyright © Koroutine Ltd

# //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// #

# Building the binary of the App
FROM oven/bun:alpine AS base

# Set the working directory to /app
WORKDIR /usr/src/app

# Copy all the Code and stuff to compile everything
COPY . .

# //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// #

# Moving the binary to the 'final Image' to make it smaller
FROM base as development

# Set the working directory to /app
WORKDIR /usr/src/app

# Install szh shell:
RUN apk add --no-cache zsh git wget

# Install oh-my-zsh:
# Uses "Spaceship" theme with some customization. Uses some bundled plugins and installs some more from github
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -t https://github.com/denysdovhan/spaceship-prompt \
    -a 'SPACESHIP_PROMPT_ADD_NEWLINE="false"' \
    -a 'SPACESHIP_PROMPT_SEPARATE_LINE="false"' \
    -p git \
    -p ssh-agent \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions

# Copy across all the files
COPY . /usr/src/app

# //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// #