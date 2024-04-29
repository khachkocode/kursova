class Parking {
	constructor(capacity, parkingList) {
		this.capacity = capacity;
		this.availableSpaces = capacity;
		this.parkingList = parkingList;
		this.sortedList = [];
	}

	getParking() {
		return this.parkingList;
	}

	validateRegister(number, brand, model, year) {
		if (!number.trim() || !brand.trim() || !model.trim() || !year.trim()) {
			alert('Введіть дані в поля!');
			return;
		}

		if (!/\d/.test(year) || year > new Date().getFullYear()) {
			alert('Введіть коректний тип даних в полі з роком випуску!');
			return;
		}

		if (
			number.length < 3 ||
			brand.length < 3 ||
			model.length < 3 ||
			year.length < 4
		) {
			alert('Введіть коректну довжину в полях, а саме більше 3!');
			return;
		}

		return true;
	}

	registerCar(car, spaceType) {
		if (this.availableSpaces > 0) {
			const entryTime = new Date(new Date().getTime() - 60 * 60 * 1000);
			const availableSpace = this.findAvailableSpace(spaceType);

			if (availableSpace) {
				const localTicket = findPlace.createTicket(availableSpace);

				if (!localTicket) return;
				availableSpace.car = car;
				availableSpace.entryTime = entryTime;
				this.availableSpaces--;

				console.log(
					`Car ${car.number} registered successfully at space ${availableSpace.name}.`
				);

				this.sortedList = []
					.concat(...this.parkingList)
					.filter(el => el.car !== null);
				return true;
			} else {
				console.log(
					`No available space for car ${car.number} of space type ${spaceType}.`
				);
			}
		} else {
			console.log('Parking is full.');
		}
		return false;
	}

	findAvailableSpace(spaceType) {
		for (const row of this.parkingList) {
			for (const space of row) {
				if (space.car === null && space.type === spaceType) {
					return space;
				}
			}
		}
		return null;
	}

	calculateParkingFee(entryTime, exitTime, spaceType) {
		let hourlyRate = price[spaceType];
		const durationHours = Math.ceil((exitTime - entryTime) / (1000 * 60 * 60));
		const totalFee = durationHours * hourlyRate;
		return totalFee;
	}

	endParking(carNumber, exitTime) {
		for (const row of this.parkingList) {
			for (const space of row) {
				if (space.car && space.car.number === carNumber) {
					const entryTime = space.entryTime;
					const fee = this.calculateParkingFee(entryTime, exitTime, space.type);

					alert(
						`Парковка автомобіля ${carNumber} успішно закінчена за ${fee} UAH.`
					);

					space.car = null;
					space.entryTime = null;

					this.availableSpaces++;

					this.sortedList = this.sortedList.filter(
						slot => slot.type !== space.type
					);

					modal.addNotification(
						`Парковка автомобіля ${carNumber} успішно закінчена за ${fee} UAH.`
					);
					paying.render();

					return true;
				}
			}
		}
		alert(`Машину ${carNumber} не знайдено в парковці.`);
		return false;
	}

	getSortedParking(typeSort) {
		if (typeSort === 'year') {
			this.sortedList = this.sortedList.sort((a, b) => a.car.year - b.car.year);
		}

		if (typeSort === 'type') {
			this.sortedList = this.sortedList.sort((a, b) =>
				a.type.localeCompare(b.type)
			);
		}

		if (typeSort === 'abc') {
			this.sortedList = this.sortedList.sort((a, b) =>
				a.car.brand.localeCompare(b.car.brand)
			);
		}

		parking.render();
	}

	render() {
		const wrapper = document.querySelector('#wrapper');
		wrapper.innerHTML = '';

		const divParking = document.createElement('div');
		divParking.setAttribute('class', 'parking');
		wrapper.appendChild(divParking);

		for (let i = 0; i < this.parkingList.length; i++) {
			const column = this.parkingList[i];

			const rowDiv = document.createElement('div');
			rowDiv.setAttribute('class', 'row');

			divParking.appendChild(rowDiv);

			const firstColumn = document.createElement('div');
			firstColumn.setAttribute('class', 'column');

			const secondColumn = document.createElement('div');
			secondColumn.setAttribute('class', 'column');

			rowDiv.appendChild(firstColumn);
			rowDiv.appendChild(secondColumn);

			for (let i = 0; i < column.length; i++) {
				const place = column[i];

				const imgSrc =
					place.type === 'Car'
						? 'parking/car.png'
						: place.type === 'Bike'
						? 'parking/bike.png'
						: 'parking/truck.png';

				if (i > 7) {
					secondColumn.innerHTML += `
					<div class="place">
						<h1>${place.name}</h1>
						${place.car === null ? '' : `<img src='./src/images/${imgSrc}' alt='car' />`}
					</div>`;
				} else {
					firstColumn.innerHTML += `
					<div class="place">
						<h1>${place.name}</h1>
						${place.car === null ? '' : `<img src='./src/images/${imgSrc}' alt='car' />`}
					</div>`;
				}
			}
		}

		//ListOfCars
		const listCars = document.createElement('div');
		listCars.setAttribute('class', 'listOfCars');
		wrapper.appendChild(listCars);

		if (this.sortedList.length <= 0) {
			listCars.innerHTML = `<h1>There are no parked vehicles!</h1>`;
			return;
		}

		listCars.innerHTML = `<h1>List of Cars | ${this.sortedList.length} cars are parked</h1>`;

		listCars.innerHTML += `<div class="sortSelect">
			<p>Сортування: </p>
			<button id="btnByAbc">За алфавітом</button>
			<button id="btnByYear">За роком</button>
			<button id="btnByType">За типом</button>
		</div>`;

		const allCars = document.createElement('div');
		allCars.setAttribute('class', 'allCars');
		listCars.appendChild(allCars);

		for (let i = 0; i < this.sortedList.length; i++) {
			const place = this.sortedList[i];

			const img =
				place.type === 'Car'
					? 'car.png'
					: place.type === 'Bike'
					? 'mini-bike.png'
					: 'mini-truck.png';

			const hours = place.entryTime.getHours().toString().padStart(2, '0');
			const minutes = place.entryTime.getMinutes().toString().padStart(2, '0');
			const formattedTime = `${hours}:${minutes}`;

			allCars.innerHTML += `<div class='localCarFromList'>
				<div class="nameLocalCar">
					<img src="./src/images/find/${img}" alt="transport" />
					<p>${place.car.brand}</p>
					<p>${place.car.model}</p>
					<p>${place.car.year}</p>
				</div>

				<div class='miniInfoLocalCar'>
					<p className="timeLocalCar">Тип транспорту: <span>${place.type}</span></p>
					<p className="typeLocalCar">Час вїзду: <span>${formattedTime}</span></p>
				</div>
			</div>`;

			document.querySelector('#btnByAbc').onclick = () =>
				parking.getSortedParking('abc');
			document.querySelector('#btnByYear').onclick = () =>
				parking.getSortedParking('year');
			document.querySelector('#btnByType').onclick = () =>
				parking.getSortedParking('type');
		}
	}
}

class Car {
	constructor(number, brand, model, year) {
		this.number = number;
		this.brand = brand;
		this.model = model;
		this.year = year;
	}
}
