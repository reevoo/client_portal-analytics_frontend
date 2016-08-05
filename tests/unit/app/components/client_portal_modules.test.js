import React from 'react'
import { shallow } from 'enzyme'
import ClientPortalModules from 'app/js/components/client_portal_modules/client_portal_modules'

describe('<ClientPortalModules />', () => {
  it('renders with an empty list of modules', () => {
    const modules = []
    const component = shallow(<ClientPortalModules modules={modules} />)
    expect(component.find('a').length).toBe(0)
  })

  it('renders with a multiple modules', () => {
    const modules = [
      {
        url: 'http://module.url',
        name: 'Module name',
        imageUrl: 'http://module.url/image.jpg',
      },
      {
        url: 'http://module2.url',
        name: 'Module 2 name',
        imageUrl: 'http://module2.url/image.jpg',
      },
    ]
    const component = shallow(<ClientPortalModules modules={modules} />)
    const moduleLinks = component.find('a')
    const firstModuleLink = moduleLinks.at(0)
    const secondModuleLink = moduleLinks.at(1)

    expect(moduleLinks.length).toBe(2)

    expect(firstModuleLink.prop('href')).toEqual('http://module.url')
    expect(firstModuleLink.text()).toEqual('Module name')
    expect(firstModuleLink.find('img').prop('src')).toEqual('http://module.url/image.jpg')

    expect(secondModuleLink.prop('href')).toEqual('http://module2.url')
    expect(secondModuleLink.text()).toEqual('Module 2 name')
    expect(secondModuleLink.find('img').prop('src')).toEqual('http://module2.url/image.jpg')
  })
})
