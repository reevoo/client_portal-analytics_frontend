import {
  createTableauAPI,
  getParametersAndFilters,
  removeCustomView,
  saveCustomView,
  setDefaultCustomView,
  setFilterValue,
  showCustomView,
  TableauTypes,
  __RewireAPI__ as TableauRewireAPI,
} from 'app/js/services/tableau'

describe('getParametersAndFilters', () => {
  it('returns a combined array of parameters and filters', (done) => {
    const getFiltersMock = () => Promise.resolve([ { name: 'filterA' } ])
    TableauRewireAPI.__Rewire__('getFilters', getFiltersMock)

    const getParametersMock = () => Promise.resolve([ { name: 'paramA' }, { name: 'paramB' } ])
    TableauRewireAPI.__Rewire__('getParameters', getParametersMock)

    const workbookMock = { getName: () => 'Customer_Experience_JavaScipt' }

    getParametersAndFilters(workbookMock).then((filters) => {
      expect(filters).toEqual([ { name: 'paramA' }, { name: 'paramB' }, { name: 'filterA' } ])
    }).then(done)
  })
})

describe('setFilterValue', () => {
  it('on a PARAMETER type filter', () => {
    const workbook = {
      changeParameterValueAsync: jasmine.createSpy('workbook.changeParameterValueAsync'),
    }
    const filter = { name: 'filterName', tableauType: TableauTypes.PARAMETER }

    setFilterValue(workbook, filter, 'filterValue')

    expect(workbook.changeParameterValueAsync).toHaveBeenCalledWith('filterName', 'filterValue')
  })

  it('on a FILTER type filter', () => {
    const tableauMock = { FilterUpdateType: { REPLACE: 'REPLACE' } }
    TableauRewireAPI.__Rewire__('tableau', tableauMock)

    const applyFilterAsyncSpy = jasmine.createSpy('worksheet.applyFilterAsync')
    const getSupportWorksheetSpy = jasmine.createSpy('getSupportWorksheet').and.returnValue({
      applyFilterAsync: applyFilterAsyncSpy,
    })
    TableauRewireAPI.__Rewire__('getSupportWorksheet', getSupportWorksheetSpy)

    const workbook = {}
    const filter = { name: 'filterName', tableauType: TableauTypes.FILTER }

    setFilterValue(workbook, filter, 'filterValue')

    expect(getSupportWorksheetSpy).toHaveBeenCalled()
    expect(applyFilterAsyncSpy).toHaveBeenCalledWith('filterName', 'filterValue', tableauMock.FilterUpdateType.REPLACE)
  })
})

describe('createTableauAPI', () => {
  it('creates a new Tableau API object', () => {
    const htmlNodeMock = document.createElement('div')
    const tableauVizSpy = jasmine.createSpy('Viz').and.returnValue({ viz: 'test' })
    const tableauSpy = {
      Viz: tableauVizSpy,
    }
    TableauRewireAPI.__Rewire__('tableau', tableauSpy)

    TableauRewireAPI.__Rewire__('getDashboardNode', () => htmlNodeMock)

    const tableauAPI = createTableauAPI({ userId: 1, token: 'token', viewId: 'viewId', onLoad: () => {} })

    expect(tableauAPI).toEqual({ viz: 'test' })
    expect(tableauVizSpy).toHaveBeenCalledWith(
      htmlNodeMock,
      jasmine.any(String),
      jasmine.objectContaining({
        onFirstInteractive: jasmine.any(Function),
      })
    )
  })
})

describe('saveCustomView', () => {
  it('saves the current view with the given name and returns it', () => {
    const workbook = {
      rememberCustomViewAsync: jasmine.createSpy('workbook.rememberCustomViewAsync'),
    }

    saveCustomView(workbook, 'viewName')

    expect(workbook.rememberCustomViewAsync).toHaveBeenCalledWith('viewName')
  })
})

describe('setDefaultCustomView', () => {
  it('loads the specified view and sets it as the default one', (done) => {
    const workbook = {
      showCustomViewAsync: jasmine.createSpy('workbook.showCustomViewAsync')
        .and.returnValue(Promise.resolve()),
      setActiveCustomViewAsDefaultAsync: jasmine.createSpy('workbook.setActiveCustomViewAsDefaultAsync'),
    }

    setDefaultCustomView(workbook, 'viewName').then(() => {
      expect(workbook.setActiveCustomViewAsDefaultAsync).toHaveBeenCalled()
    }).then(done)

    expect(workbook.showCustomViewAsync).toHaveBeenCalledWith('viewName')
  })
})

describe('showCustomView', () => {
  it('loads the specified view', () => {
    const workbook = { showCustomViewAsync: jasmine.createSpy('workbook.showCustomViewAsync') }

    showCustomView(workbook, 'viewName')

    expect(workbook.showCustomViewAsync).toHaveBeenCalledWith('viewName')
  })
})

describe('removeCustomView', () => {
  it('removes the specified view', () => {
    const workbook = {
      removeCustomViewAsync: jasmine.createSpy('workbook.removeCustomViewAsync'),
    }

    removeCustomView(workbook, 'viewName')

    expect(workbook.removeCustomViewAsync).toHaveBeenCalledWith('viewName')
  })
})
