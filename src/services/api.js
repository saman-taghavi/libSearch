import axios from "axios";

axios.defaults.baseURL =
  "https://lib1.alzahra.ac.ir/rest/search/biblio/";
axios.defaults.headers = {
  accept: "*/*"
}
export default axios;
