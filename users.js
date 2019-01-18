import Component from './component.js';
import Controls from './controls.js';
import Table from './table.js';
import Info from './info.js';

export default class Users extends Component {
	
	constructor({ element }) {
		super({ element });
		
		this._render();
		this._initControls();
		this._initTable();
		this._initInfo();
	}

	_initControls() {
		this._controls = new Controls({
			element: document.querySelector('[data-element="controls"]')
		});

		this._controls.subscribe('showSmall', (url) => {
			this._table.getData(url);
		});

		this._controls.subscribe('showBig', (url) => {
			this._table.getData(url);
		});

		this._controls.subscribe('find', (query) => {
			this._showFiltered(query);
		})
	}

	_initTable() {
		this._table = new Table({
			element: document.querySelector('[data-element="table"]')
		});

		this._table.subscribe('showInfo', (user) => {
			this._info.show(user);
		});

		this._table.subscribe('showSorted', (param) => {
			this._showSorted(param);
		})
	}

	async _showFiltered(data) {
		let result = await this._table.filter(data);
		this._table.show(result);
	}

	async _showSorted(param) {
		let result = await this._table.sort(param);
		
		this._table.show(result);
		this._table.addAttribute();
	}

	_initInfo() {
		this._info = new Info({
			element: document.querySelector('[data-element="info"]')
		});
	}

	_render() {
		this._element.innerHTML = `
			<div class="users__controls" data-element="controls"></div>
			<div class="users__table" data-element="table"></div>
			<div class="users__info" data-element="info"></div>
			<div class="users__pagination" data-element="pagination"></div>
		`;
	}
}