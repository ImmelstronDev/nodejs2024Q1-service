# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Install [Docker](https://docs.docker.com/engine/install/)
- Run docker desktop application, if you use windows or run docker engine if you use other system

## Downloading

```
git clone {repository URL}

```
go to the copied folder, in your terminal and complete next command:

```
cd nodejs2024Q1-service
git checkout HLS-part2
```

## Installing NPM modules

```
npm install
```

## Running application

- Create .env file (based on .env.example) in copied folder: ./.env
- Run next command in your terminal, for building images and docker containers up:

```
docker-compose up -d
```

## Testing

After application running open new terminal and enter:

To run all tests with authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Migrations

Migrations execute automatically when ```docker-compose``` command complete and create database entities.

If you want to migrate manually you can execute next command in your terminal:

```
rm -rf ./prisma/migrations
npx prisma migrate dev --name my-custom-migrate
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
