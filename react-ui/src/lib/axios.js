import axios from "axios";
import cookie from "react-cookies";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const instance = axios.create({baseURL: 'http://127.0.0.1:8000'});
instance.defaults.headers.common['X-CSRFTOKEN'] = cookie.load("csrftoken");


export default instance