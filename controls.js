import Component from './component.js';

export default class Controls extends Component {

	constructor({ element }) {
		super({ element });
		this._render();

		this.on('click', 'show-small', (event) => {
			this.emit('showSmall', 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
		});

		this.on('click', 'show-big', (event) => {
			this.emit('showBig', 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
		});

		this.on('click', 'show-find', (event) => {
			let query = document.body.querySelector('[data-item="query"]').value;
			let queryNormalized = query.toLowerCase().trim();

			this.emit('find', queryNormalized);
		});
	}

	_render() {
		this._element.innerHTML = `
			<button class="up" type="button" data-item="show-small">SMALL</button>
			<button type="button" data-item="show-big">BIG</button>
			<input type="search" data-item="query" required>
			<button type="button" data-item="show-find">FIND</button>
		`
	}
}