'use strict'

const Pact = require('pact-consumer-js-dsl')
const like = Pact.Match.somethingLike
const eachLike = Pact.Match.eachLike

const API_URL = require('./config').API_PREFIX

const setup = (mockService) => {
  // GET /profile
  mockService
    .given('a user logged in')
    .uponReceiving('a request to get his profile')
    .withRequest({
      method: 'get',
      path: `${API_URL}/profile`,
    })
    .willRespondWith({
      status: 200,
      body: {
        id: like('11111111-1111-1111-1111-111111111111'),
        email: like('example@reevoo.com'),
        name: like('admin'),
        surname: null,
        job_title: null,
        phone: null,
        client_id: null,
        login_state: like('enabled'),
        last_login: like('2016-09-14T14:14:30.842+01:00'),
        created_at: like('2016-08-03T14:18:32.213+01:00'),
        updated_at: null,
        registered_at: null,
        user_type_id: like('11111111-1111-1111-1111-111111111111'),
        user_type: {
          id: like('11111111-1111-1111-1111-111111111111'),
          name: like('reevoo_user'),
          display_name: like('reevoo_user'),
          hierarchy_level: null,
        },
        client_modules_override: null,
        client_dashboards_override: null,
        client: null,
        permissions: eachLike({
          id: like('11111111-1111-1111-1111-111111111111'),
          name: like('list'),
          namespace: like('clients'),
          application: like('admin'),
        }),
        trkref_names: [],
        trkref_review_tags: [],
        client_users_accessible_modules: null,
        client_users_accessible_dashboards: eachLike('11111111-1111-1111-1111-111111111111'),
        data_permissions: {
          fastResponse: {
            sku: [],
            locale: [],
            category: [],
          },
          analytics: {
            workbooks: [],
          },
        },
        user_preferences: {},
      },
    })
}

module.exports = setup
