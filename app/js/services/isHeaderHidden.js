import getLocationQueryParams from '../helpers/getLocationQueryParams'

export default () => {
  const { hideHeader } = getLocationQueryParams()
  return !!hideHeader
}
