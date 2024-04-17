class Modal {
	constructor() {
		this.isVisible = false;
		this.haveNotification = document.querySelector('.haveNotification');
		this.notification = [];
	}

	toggleModal() {
		this.render();
		document.querySelector('.modal').style.display = this.isVisible
			? 'none'
			: 'flex';
		this.isVisible = !this.isVisible;
	}

	addNotification(msg) {
		this.notification.push(msg);
		this.haveNotification.style.display = 'block';
	}

	clearAllMessage() {
		this.notification = [];
		this.render();
	}

	render() {
		const listDom = document.querySelector('.listOfNotification');
		listDom.innerHTML = '';

		if (this.notification.length === 0) {
			listDom.innerHTML = '<h1 class="noMessageHere">No message here!</h1>';
			this.haveNotification.style.display = 'none';
			return;
		}

		this.haveNotification.style.display = 'block';

		for (let i = 0; i < this.notification.length; i++) {
			const message = this.notification[i];

			const messageDiv = document.createElement('div');
			messageDiv.setAttribute('class', 'message');

			const messageP = document.createElement('p');
			messageP.innerHTML = message;

			const messageButton = document.createElement('button');
			messageButton.innerHTML = 'X';
			messageButton.onclick = () => {
				this.notification = this.notification.filter(
					(msg, index) => msg !== message && i !== index
				);
				this.render();
			};

			messageDiv.appendChild(messageP);
			messageDiv.appendChild(messageButton);
			listDom.appendChild(messageDiv);
		}
	}
}

//Modal notification
const modal = new Modal();
document.getElementById('bell').onclick = () => modal.toggleModal();
document.querySelector('.clearNotification').onclick = () =>
	modal.clearAllMessage();
