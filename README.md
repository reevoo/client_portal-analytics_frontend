# Reevoo Analytics

This simple React app encapsulates configuring an iframe onto a Tableau application in order to show dashboards.

# Overview

This relies on a number of other applications to run correctly:

* [client_portal-admin](https://github.com/reevoo/client_portal-admin) - used for authentication into the Client Portal ecosystem
* [client_portal-analytics_backend](https://github.com/reevoo/client_portal-analytics/tree/master/backend) - This provides us with an authentication token which can be sent to Tableau Server (see below)
* [Tableau Server](http://www.tableau.com/products/server) - Using the token provided by `client_portal-analytics_backend`, we're able to connect to Tableau Server in an iframe and configure it using their javascript library. This is where the fun interactive analytics dashboards are served from.

See [the wiki](https://reevoo.atlassian.net/wiki/display/PLAT/MyReevoo+Analytics+-+Technical+Architecture+Diagram) to see how this fits into the wider client_portal-analytics ecosystem.

# Start server

```bash
make up

# open localhost:8080 in browser
```

# Running using staging tableau

To run using tableau staging ensure your local client_portal-admin is running using the staging environment variables
and change the value of CP_ANALYTICS_API and TABLEAU_GATEWAY_API from [.env.development](/.env.development) with the corresponding values from [.env.staging](.env.staging)

This will start a local server running on http://localhost:8080/.

## Development tricks

* To develop this app against production services you have to
** copy [.env.production](/.env.production) into [.env.development](/.env.development)
** login into [my.reevoo.com](https://my.reeevoo.com)
** open console, find some reguest to the backend and copy the value of Authorization request header
** paste it as a return value of `getAccessToken()` method in [auth.js](/app/js/services/auth.js)


* To allow hacky code while developing disable linter in [webpack.config.js](/webpack.config.js):
```
eslint: {
  failOnWarning: false,
  failOnError: false,
}
```


# Test

If you need to run all the tests (unit and contract) just run

```bash
yarn run test
```

## Unit

You can run the unit tests a single time with

```bash
yarn run test:unit
```

or keep them running if you are modifying them and want to check the results live (TDD FTW!):

```bash
yarn run test:unit:watch
```

## Contract

To generate the Pact contract files and upload them to you local Pact Broker, you have to run

```bash
yarn run test:contract
```

and be sure to have [Pact Broker](https://github.com/reevoo/pact_broker) running.

## Deploy

Deploy to both staging and production is done through buildkite: https://buildkite.com/reevoo/client-portal-analytics-frontend

| Env | Test page |
|-----|-----------|
| `staging` | [https://my-staging.reevoocloud.com/analytics/](https://my-staging.reevoocloud.com/analytics/) |
| `production` | [https://my.reevoo.com/analytics/](https://my.reevoo.com/analytics/) |


# License

This software is licensed under the [MIT license](https://opensource.org/licenses/MIT)
