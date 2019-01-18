export default class Component {

	constructor({ element }) {
		this._element = element;
	}

	show() {
		this._element.hidden = false;
	}

	hide() {
		this._element.hidden = true;
	}

	on(eventName, elementName, callback) {
		this._element.addEventListener(eventName, function(event) {
			let delegateTarget = event.target.closest(`[data-item="${elementName}"]`);

			if (!delegateTarget) {
				return;
			}

			event.delegateTarget = delegateTarget;

			callback(event.delegateTarget);
		})
	}

	emit(eventName, data) {
		let customEvent = new CustomEvent(eventName, {
			detail: data
		});
		this._element.dispatchEvent(customEvent);
	}

	subscribe(eventName, callback) {
		this._element.addEventListener(eventName, (event) => {
			callback(event.detail);
		})
	}

}