//Button for choose type
const chooseCar = document.querySelector('#chooseTypeCar');
const chooseBike = document.querySelector('#chooseTypeBike');
const chooseTruck = document.querySelector('#chooseTypeTruck');

class FindPlace {
	constructor() {
		this.chooseType = 'Car';
	}

	handleChangeType(type) {
		this.chooseType = type;
		this.render();
	}

	validateSlot(car) {
		const findSlotButton = document.querySelector('#findSlotBtn');
		const payButton = document.querySelector('#goToPayButton');
		const resultSlotFind = document.querySelector('#slotFind');
		const resultCostFind = document.querySelector('#costFind');
		const localAvailableSpace = parking.findAvailableSpace(
			this.getChooseType()
		);

		if (localAvailableSpace === null) {
			payButton.style.display = 'none';
			findSlotButton.style.display = 'block';
			resultSlotFind.innerHTML = `No available parking slots!`;
			resultCostFind.innerHTML = `The price is not determined!`;
		} else {
			findSlotButton.style.display = 'none';
			payButton.style.display = 'block';
			resultSlotFind.innerHTML = `Slot - ${localAvailableSpace.name} is available for parking`;
			resultCostFind.innerHTML = `Cost - ${
				price[findPlace.getChooseType()]
			} UAH per hour`;

			payButton.onclick = () => {
				parking.registerCar(car, this.chooseType);
				parking.render();
			};
		}

		return localAvailableSpace;
	}

	createTicket(slot) {
		const cardNumber = prompt('Введіть номер карти: ');

		if (/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
			const confirmChoose = confirm(
				`Продовжити, з вашого рахунку буде знято перші ${
					price[this.chooseType]
				} UAH за годину?`
			);

			if (confirmChoose) {
				paying.addTicket(slot, price[this.chooseType]);
				modal.addNotification('Транспорт успішно припаркований!');
				alert('Транспорт успішно припаркованией!');
				return true;
			}
		} else {
			alert('Номер карти не коректний!');
		}

		return false;
	}

	getChooseType() {
		return this.chooseType;
	}

	render() {
		const wrapper = document.querySelector('#wrapper');
		wrapper.innerHTML = '';

		const findCar = document.createElement('div');
		findCar.setAttribute('class', 'findCar');
		wrapper.appendChild(findCar);

		findCar.innerHTML = `
		<div class="chooseFindCar">
			<h1>PARK YOUR CAR RIGHT NOW!</h1>

			<div class="dataCar">
				<input type="text" id="number-car" placeholder="Номер транспорта" />
				<input type="text" id="brand-car" placeholder="Марка транспорта" />
				<input type="text" id="model-car" placeholder="Модель транспорта" />
				<input type="text" id="year-car" placeholder="Рік транспорта" />
			</div>

			<div class="chooseType">
				<div class="${
					this.chooseType === 'Car' ? 'typeChoose active' : 'typeChoose'
				}" id="chooseTypeCar">
					<img src="./src/images/find/mini-car.png" alt="" />
					<h3>Car</h3>
				</div>
				<div class="${
					this.chooseType === 'Bike' ? 'typeChoose active' : 'typeChoose'
				}" id="chooseTypeBike">
					<img src="./src/images/find/mini-bike.png" alt="" />
					<h3>Bike</h3>
				</div>
				<div class="${
					this.chooseType === 'Truck' ? 'typeChoose active' : 'typeChoose'
				}" id="chooseTypeTruck">
					<img src="./src/images/find/mini-truck.png" alt="" />
					<h3>Truck</h3>
				</div>
			</div>

			<div class="resultChoose">
				<h3 id="slotFind">Slot - available or not</h3>
				<p id="costFind">Cost parking slot</p>
			</div>

			<div class="btnsFind">
			<button id="findSlotBtn" class="findSlotButton" onclick="handleRegisterCar()">
				FIND SLOT
			</button>
			<button
				class="findSlotButton"
				id="goToPayButton"
				onclick="location.href = 'pay.html'"
			>
				GO TO PAYMENT
			</button>
		</div>
		</div>

		<div class="imgCar">
			<img src="./src/images/find/${
				this.chooseType === 'Car'
					? 'car.png'
					: this.chooseType === 'Bike'
					? 'mini-bike.png'
					: 'mini-truck.png'
			} " alt="transport" />
			<div class="circleDec"></div>
		</div>`;

		document.querySelector('#chooseTypeCar').onclick = () =>
			this.handleChangeType('Car');
		document.querySelector('#chooseTypeBike').onclick = () =>
			this.handleChangeType('Bike');
		document.querySelector('#chooseTypeTruck').onclick = () =>
			this.handleChangeType('Truck');
	}
}

const findPlace = new FindPlace();
