
class Api {
  constructor() {
    this._base_api = 'http://localhost:3000';
    this._endpoints = {
      login: this._base_api + '/web/login',
      logout: this._base_api + '/web/logout',
      register: this._base_api + '/web/register',
      search_order: this._base_api + '/api/product/search-order',
      providers: this._base_api + '/api/providers',
      products: this._base_api + '/api/product/category/:category_id',
    };
  }

  async process(data, success, error) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.token}`,
    });
    const request = new Request(this._endpoints[data.endpoint], {
      method: data.method,
      headers: headers,
      body: data.body ? JSON.stringify(data.body) : null,
    });
    try {
      const query = await fetch(request);
      const response = await query.json();
      success(response);
    } catch (e) {
      error(e);
    }
  }

  login(body) {
    return new Promise((resolve, reject) => {
      const data = {endpoint: 'login', body, method: 'POST'};
      this.process(data, resolve, reject);
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      const data = {endpoint: 'logout', method: 'GET'};
      this.process(data, resolve, reject);
    });
  }

  register(body) {
    return new Promise((resolve, reject) => {
      const data = {endpoint: 'register', body, method: 'POST'};
      this.process(data, resolve, reject);
    });
  }

  create(endpoint, body, token) {
    return new Promise((resolve, reject) => {
      const data = {endpoint, body, token, method: 'POST'};
      this.process(data, resolve, reject);
    });
  }

  all(endpoint, token) {
    return new Promise((resolve, reject) => {
      const data = {endpoint, token, method: 'GET'};
      this.process(data, resolve, reject);
    });
  }

  find(endpoint, id, token) {
    return new Promise((resolve, reject) => {
      const data = {endpoint, id, token, method: 'GET'};
      this.process(data, resolve, reject);
    });
  }

  update(endpoint, id, body, token) {
    return new Promise((resolve, reject) => {
      const data = {endpoint, id, token, body, method: 'PUT'};
      this.process(data, resolve, reject);
    });
  }

  remove(endpoint, id, token) {
    return new Promise((resolve, reject) => {
      const data = {endpoint, id, token, method: 'DELETE'};
      this.process(data, resolve, reject);
    });
  }
}

export default new Api();
