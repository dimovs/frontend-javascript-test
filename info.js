import Component from './component.js';

export default class Info extends Component {

	_render(user) {
		this._element.innerHTML = `
		<div>
			Выбран пользователь: <b>${user.firstName} ${user.lastName}</b>
		</div>
		<div>
			<textarea cols="100" rows="10">${user.description}</textarea>
		</div>
		<div>
			Адрес проживания: <b>${user.address.streetAddress}</b>
		</div
		<div>
			Город: <b>${user.address.city}</b>
		</div>
		<div>
			Провинция: <b>${user.address.state}</b>
		</div>
		<div>
			Индекс: <b>${user.address.zip}</b>
		</div>
		`
	}

	show(user) {
		this._render(user);
		super.show();
	}

}