import Component from './component.js';

export default class Table extends Component {

	constructor({ element }) {
		super({ element });

		this._data = [];
		this._currentData = [];
		this._info = {};

		this._getInfoSorted();

		this.on('click', 'user', (elem) => {
			let userEmail = elem.dataset.userEmail;

			let user = this._data.find((item) => {
				return item['email'] == userEmail;
			})

			this.emit('showInfo', user);
		});

		this.on('click', "sort", (elem) => {
			let param = elem.dataset.userSort;

			this.emit('showSorted', param);
		})
	}

	_render() {
		this._element.innerHTML = `
			<table class="users__table">
				<tr>
					<th>
						<span class="users__table-sort" data-item="sort" data-user-sort="id">id</span>
					</th>
					<th>
						<span class="users__table-sort" data-item="sort" data-user-sort="firstName">firstName</span>
					</th>
					<th>
						<span class="users__table-sort" data-item="sort" data-user-sort="lastName">lastName</span>
					</th>
					<th>
						<span class="users__table-sort" data-item="sort" data-user-sort="email">email</span>
					</th>
					<th>
						<span class="users__table-sort" data-item="sort" data-user-sort="phone">phone</span>
					</th>
				</tr>
				${this._currentData.map((person) => `
					<tr data-item="user" data-user-email="${person.email}">
						<td>${person.id}</td>
						<td>${person.firstName}</td>
						<td>${person.lastName}</td>
						<td>${person.email}</td>
						<td>${person.phone}</td>
					</tr>`).join('')}
			</table>
		`;
	}

	_getInfoSorted() {
		this._info["id"] = false;
		this._info["firstname"] = false;
		this._info["lastName"] = false;
		this._info["email"] = false;
		this._info["phone"] = false;
	}

	addAttribute() {
		let items = document.body.querySelectorAll(`[data-user-sort]`);
		
		for (let item of items) {
			if (this._info[item.dataset.userSort] == true) {
				item.classList.add('users__table-sort--sorted');
			} else {
				item.classList.remove('users__table-sort--sorted');
			}
		}
	}

	async getData(url, params = {}) {
		let data = await this._fetchData(url, params);

		this._data = data;
		this.show(data);
	}

	show(users) {
		this._currentData = users;
		this._render();
		super.show();
	}

	_fetchData(url, params = {}) {
		return fetch(url, params)
			.then((response) => response.json())
	}


	sort(param) {
		return new Promise((resolve, reject) => {
			let result = [];

				if (!this._info[param]) {
					this._info[param] = true;
					result = this._currentData.sort((user1, user2) => {
						return (user1[param] < user2[param]) ? 1 : -1;
					})
				} else {
					this._info[param] = false;
					result = this._currentData.sort((user1, user2) => {
						return (user1[param] > user2[param]) ? 1 : -1;
					})
				}
			resolve(result);
		})
	}

	filter(query) {
		return new Promise((resolve, reject) => {
		
		let result = [];

		if (!query) {
			result = this._data;
		} else {
			for (let user of this._data) {
				for (let param in user) {
					let str = String(user[param]).toLowerCase();

					if (str.toLowerCase().includes(query)) {
						result.push(user);
					}
				}
			}
		}
		resolve(result);
		})
	}
}