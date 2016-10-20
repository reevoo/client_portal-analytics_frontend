import tableau from 'tableau'
import { TABLEAU_HOST } from '../constants/app_constants'

const TABLEAU_SUPPORT_WORKSHEET = 'Settings'

export const TableauTypes = {
  FILTER: 'FILTER',
  PARAMETER: 'PARAMETER',
}

const WORKBOOK_MAPPING = {
  'Customer_Experience_JavaScipt': {
    [TableauTypes.PARAMETER]: {
      'Date Range': {
        displayName: 'Dates applied',
      },
    },
    [TableauTypes.FILTER]: {
      'Retailer Trkref': {
        displayName: 'Website',
      },
    },
  },
}

const getDashboardUrl = ({ userId, token, viewId }) =>
  `${TABLEAU_HOST}trusted/${token}/views/${viewId}?:embed=yes&:toolbar=no&:showShareOptions=no&:record_performance=yes&UUID=${userId}`

const getDashboardNode = () => document.getElementById('dashboard-container')

const tableauObjectProperties = {
  [TableauTypes.PARAMETER]: {
    name: (tableauParameter) => tableauParameter.getName(),
    selectedValue: (tableauParameter) => tableauParameter.getCurrentValue().formattedValue,
    allowedValues: (tableauParameter) => getParameterAllowedValues(tableauParameter.getAllowableValues()),
  },
  [TableauTypes.FILTER]: {
    name: (tableauFilter) => tableauFilter.getFieldName(),
    selectedValue: (tableauFilter) => getFilterAppliedValues(tableauFilter.getAppliedValues()),
    /**
     * NOTE: The allowed values of a filter can't be read from Tableau, so we preload the filter initially
     * with all the avaiblable values and store them in the app.
     *
     * This will be changed once the backend provides a way to load the values.
     */
    allowedValues: (tableauFilter) => getFilterAppliedValues(tableauFilter.getAppliedValues()),
  },
}

const isAllowedTableauParameterOrFilter = (workbookName, valueName, valueType) =>
  Object.keys(WORKBOOK_MAPPING[workbookName][valueType]).find((key) => key === valueName)

const isAllowedTableauParameter = (workbookName) => (param) =>
  isAllowedTableauParameterOrFilter(workbookName, param.getName(), TableauTypes.PARAMETER)

const isAllowedTableauFilter = (workbookName) => (filter) =>
  isAllowedTableauParameterOrFilter(workbookName, filter.getFieldName(), TableauTypes.FILTER)

const getParameterAllowedValues = (allowableValues) => Array.isArray(allowableValues)
  ? allowableValues.map((value) => value.formattedValue)
  : []

const filterFromTableauObject = (tableauType) => (tableauObject) => {
  const tableauProperties = tableauObjectProperties[tableauType]
  return {
    name: tableauProperties.name(tableauObject),
    selectedValue: tableauProperties.selectedValue(tableauObject),
    allowedValues: tableauProperties.allowedValues(tableauObject),
    tableauType,
  }
}

const getFilterAppliedValues = (appliedValues) => Array.isArray(appliedValues)
  ? appliedValues.map((value) => value.formattedValue)
  : []

const getWorkbookParameters = (workbook) => workbook.getParametersAsync()

const getSupportWorksheet = (workbook) => workbook.getActiveSheet().getWorksheets().get(TABLEAU_SUPPORT_WORKSHEET)

const getWorkbookFilters = (workbook) => getSupportWorksheet(workbook).getFiltersAsync()

/**
 * Returns formatted tableau parameters as application filters
 */
const getParameters = (workbook) => getWorkbookParameters(workbook).then((tableauParameters) =>
  tableauParameters
    .filter(isAllowedTableauParameter(workbook.getName()))
    .map(filterFromTableauObject(TableauTypes.PARAMETER))
)

/**
 * Returns formatted tableau filters as application filters
 */
const getFilters = (workbook) => getWorkbookFilters(workbook).then((tableauFilters) =>
  tableauFilters
    .filter(isAllowedTableauFilter(workbook.getName()))
    .map(filterFromTableauObject(TableauTypes.FILTER))
)

/**
 * Returns formatted tableau parameters and tableau filters as application filters
 */
export const getParametersAndFilters = (workbook) => {
  // TODO: This is a temporal solution until we have all the dashboards with their proper setup on Tableau
  return workbook.getName() === 'Customer_Experience_JavaScipt'
    ? Promise.all([
      getParameters(workbook),
      getFilters(workbook),
    ]).then(([parameters, filters]) => ([...parameters, ...filters]))
    : Promise.resolve([])
}

export const setFilterValue = (workbook, filter, filterValue) =>
  filter.tableauType === TableauTypes.PARAMETER
    ? workbook.changeParameterValueAsync(filter.name, filterValue)
    : getSupportWorksheet(workbook).applyFilterAsync(filter.name, filterValue, tableau.FilterUpdateType.REPLACE)

export const createTableauAPI = ({ userId, token, viewId, onLoad }) => {
  const tableauAPI = new tableau.Viz(
    getDashboardNode(),
    getDashboardUrl({ userId, token, viewId }),
    {
      height: '2500px',
      width: '1000px',
      onFirstInteractive: () => getParametersAndFilters(tableauAPI.getWorkbook()).then(onLoad),
    }
  )

  return tableauAPI
}
