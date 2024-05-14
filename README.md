# Baeuda Server

## Development

### Clone the github repository

```bash
git clone git@github.com:BAEUDA-DEV/baeuda-server.git
```

### Install package dependencies

```bash
# install pnpm (package manager)
npm i -g pnpm

# install package dependency
pnpm install
```

### Setting environment variables

```bash
# copy .env.template
cp .env.template .env
```

### Setting up docker

```bash
# create docker container
docker compose up -d

# prisma setup
pnpm prisma:push
pnpm prisma:generate
```

### Run project in develpment mode

```bash
pnpm start:dev
```
