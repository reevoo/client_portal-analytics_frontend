# Reevoo Analytics

This simple React app encapsulates configuring an iframe onto a Tableau application in order to show dashboards.

# Overview

This relies on a number of other applications to run correctly:

* [client_portal-admin](https://github.com/reevoo/client_portal-admin) - used for authentication into the Client Portal ecosystem
* [client_portal-analytics_backend](https://github.com/reevoo/client_portal-analytics/tree/master/backend) - This provides us with an authentication token which can be sent to Tableau Server (see below)
* [Tableau Server](http://www.tableau.com/products/server) - Using the token provided by `client_portal-analytics_backend`, we're able to connect to Tableau Server in an iframe and configure it using their javascript library. This is where the fun interactive analytics dashboards are served from.

# Requirements

This relies on having node and npm installed, whose version is managed in `.node-version` as we generally manage node versions with [nodenv](https://github.com/nodenv/nodenv)

If you're going to deploy (to staging or production) you will need to have installed the AWS CLI tools. In Mac you can just run `brew install awscli`. For other systems, check [the official docs](https://aws.amazon.com/cli/).

# Set up

All managed through `npm` and `webpack`, so simply:

```bash
# Pre-requisite to run the contract tests with Pact
bundle install

# Pre-requisite on installing node
nodenv install

# For installing and running the application
npm install
npm start
```

This will start a local server running on http://localhost:8080/.

# Test

If you need to run all the tests (unit and contract) just run

```bash
npm test
```

## Unit

You can run the unit tests a single time with

```bash
npm run test:unit
```

or keep them running if you are modifying them and want to check the results live (TDD FTW!):

```bash
npm run test:unit:watch
```

## Contract

To generate the Pact contract files and upload them to you local Pact Broker, you have to run

```bash
npm run test:contract
```

and be sure to have [Pact Broker](https://github.com/reevoo/pact_broker) running.

# License

This software is licensed under the [MIT license](https://opensource.org/licenses/MIT)
