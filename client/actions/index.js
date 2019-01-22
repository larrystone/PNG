import axios from 'axios';

const prettyPrint = (data) => {
  return JSON.stringify(data, null, 2)
    .replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
};

export default class Actions {
  static getAll() {
    axios.get('/api/phoneNumbers')
      .then(({ data }) => {
        this.terminal.current
          .pushToStdout(prettyPrint(data));
      });
  }

  static generate(...args) {
    axios.post(`/api/phoneNumbers?n=${args[1]}`)
      .then(({ data }) => {
        this.terminal.current
          .pushToStdout(prettyPrint(data));
      });
  }

  static get(arg) {
    axios.get(`/api/phoneNumbers/${arg}`)
      .then(({ data }) => {
        this.terminal.current
          .pushToStdout(prettyPrint(data));
      })
      .catch(error => {
        this.terminal.current
          .pushToStdout(prettyPrint(error.response.data));
      });
  }

  static delete(arg) {
    axios.delete(`/api/phoneNumbers/${arg}`)
      .then(() => {
        this.terminal.current
          .pushToStdout(`<p style='color:red'>${arg} deleted</p>`);
      })
      .catch(error => {
        this.terminal.current
          .pushToStdout(prettyPrint(error.response.data));
      });
  }
}
