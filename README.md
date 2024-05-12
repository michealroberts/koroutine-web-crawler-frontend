# koroutine-web-crawler-frontend Part II

A web application that consumes the API from the [koroutine-web-crawler](https://github.com/michealroberts/koroutine-web-crawler).

---

## Usage

Before running the application, make sure you have the API running, you can find the instructions [here](https://github.com/michealroberts/koroutine-web-crawler?tab=readme-ov-file#api).

## Example Commands

To run a development container, the user can use the following command:

```bash
make dev
```

## App

Firstly, it is advisable to install the dependencies by running the following command:

```bash
cd web && bun install
```

The user can then run the application by running the following command (from inside the `web` directory):

```bash
bun dev --port 3000 --host 0.0.0.0 --open
```

The application should be served on `http://0.0.0.0:3000` and the user can enter a domain to crawl.

## Local Development Setup

The user can setup the development environment by either using the Dockerfile provided, or by utilising the devcontainer in Visual Studio Code.

To use the Dockerfile in interactive terminal mode, the user can run the following commands:

```bash
make dev
```

Under the hood, the `make dev` command will build the Docker image and run the container in interactive mode, e.g.,

```bash
export CONTAINER_NAME="koroutine/web-crawler"

docker build --target development --tag $(CONTAINER_NAME):dev .

docker run -it --rm -v $(pwd):/app -w /app koroutine-web-crawler:latest
```

The user can then run the tests, build the project, and run the crawler, etc all from inside a development container:

## VSCode Development Container

For the latter, the user will be prompted to reload the workspace in the devcontainer. The user can then build the project or run the Nitro development server.

## Considerations & Thought Process

- Framework / Library Choices

I decided to use Nuxt 3 for this project, as it is a modern web framework for building Vue.js applications. I also decided to use Vue 3, as it is a progressive JavaScript framework. I also decided to use @vueuse/core, as it is a collection of essential Vue Composition API utils that work for Vue 2 & 3 (mainly `useEventSource()`).

- TypeScript

100%. I wrote the application in TypeScript, as it is a superset of JavaScript that adds optional types to the language. I also used a meta framework for Tailwind CSS, as it is a utility-first CSS framework that is easy to use and customise and very pragmatic for short proof-of-concepts.

- Domain User Input Validation

When asking the user to enter a domain, it is important the the user input is validated. I used a a combination of `RegExp` testing and URL parsing to validate the user input, to ensure that it is a domain and not a much looser URL.

- Tree Structure

As our crawl is effectively a Node tree, I decided to use a tree structure to represent the crawl. I used a recursive component to traverse the tree and display the results in a tree-like structure. It is not the best UI/UX and would spend much more time to craft this. However, I am not a designer.

## Testing Strategy

I did not write any tests for this project, as I was being lazy. We can maybe discuss testing strategies in our next call and how I would have tackled this had I had the time.

## Implementation

The web application is designed to have re-usable, (theoretically) testable and modular components. The application is designed to be simple and easy to use, with a focus on the user experience, utilise HeadlessUI and unocss for a Tailwind-like CSS-in-JS API.

## Dependencies

This project is designed to be dependency light, and only uses the following dependencies:

- [oven/bun](https://github.com/oven-sh/bun)

I decided to utilise the bun runtime, as I haven't yet had a chance to use it in a real PoC project. No issues reported and it is fast and efficient.

- [Vue 3](https://github.com/vuejs/core)

Vue 3 is a progressive JavaScript framework that is used to build user interfaces and single-page applications (SPAs) which is perfect for this type of PoC project.

- [Nuxt 3](https://github.com/nuxt/nuxt)

I decided to use Nuxt 3 as I have not used it in a while and wanted to see how it has evolved. Nuxt 3 is a modern web framework for building Vue.js applications.

- [VueUse](https://github.com/vueuse/vueuse)

Disclaimer: I am a core maintainer of VueUse. VueUse is a collection of essential Vue Composition API utils that work for Vue 2 & 3 (mainly `useEventSource()`).
