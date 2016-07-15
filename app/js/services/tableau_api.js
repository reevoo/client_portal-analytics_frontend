import axios from 'axios'
import { TABLEAU_HOST, TABLEAU_GATEWAY_API } from '../constants/app_constants'

const TableauAPI = {
  getWorkbook: (workbookId) => {
    return axios.get(TABLEAU_GATEWAY_API + '/workbooks/' + workbookId);
  }
}

export default TableauAPI
