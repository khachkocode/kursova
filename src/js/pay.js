class Ticket {
	constructor(slot, cost) {
		this.slot = slot;
		this.cost = cost;
	}
}

class Pay {
	constructor() {
		this.tickets = [];
	}

	addTicket(slot, cost) {
		this.tickets.push(new Ticket(slot, cost));
	}

	render() {
		const wrapper = document.querySelector('#wrapper');
		wrapper.innerHTML = '';

		const tickets = document.createElement('div');
		tickets.setAttribute('class', 'tickets');
		wrapper.appendChild(tickets);

		if (this.tickets.length === 0) {
			tickets.innerHTML = `
			<div class="notFoundTickets">
				<img src="./src/images/find/car.png" alt="car" width="500px" />

				<h1>У вас немає жодного припаркованого транспорту!</h1>
				<p>Щоб припаркувати свій транспортний засіб, вам потрібно перейти на сторінку "FIND".</p>

				<button>ПРИПАРКУВАТИ ТРАНСПОРТ</button>
			</div>
			`;
		} else {
			const exitTime = new Date();

			const ticketsList = document.createElement('div');
			ticketsList.setAttribute('class', 'ticketsList');

			ticketsList.innerHTML = `	<h1 class='titleTickets'>List of tickets | ${this.tickets.length} items</h1>`;

			const listOfTickets = document.createElement('div');
			listOfTickets.setAttribute('class', 'listOfTickets');

			ticketsList.appendChild(listOfTickets);

			for (let i = 0; i < this.tickets.length; i++) {
				const ticket = this.tickets[i];

				const ticketDiv = document.createElement('div');
				ticketDiv.setAttribute('class', 'ticket');
				ticketDiv.innerHTML = `<div class="logoTicket">
				<div class="textLogoTicket">
				<h1>Parking receipt</h1>
				<p>This ticket is needed to end the parking lot!</p>
				</div>
				<img src="./src/images/logo.png" alt="logo" />
				</div>
				
				<div class="infoCar">
				<h1>Info about vehicle:</h1>
				<div class="listInfoCar">
				<p>${ticket.slot.car.number}</p>
				<p>${ticket.slot.car.brand}</p>
				<p>${ticket.slot.car.model}</p>
				<p>${ticket.slot.car.year}</p>
				<p>Slot: ${ticket.slot.name}</p>
				</div>
				</div>
				
				
				<div class="timeParkingTikcet">
				<p>From: ${ticket.slot.entryTime.getHours()}:${ticket.slot.entryTime.getMinutes()}</p>
				<p>To: ${exitTime.getHours()}:${exitTime.getMinutes()}</p>
				</div>
				
				<h1 class='paidTicket'>ДО ОПЛАТИ: ${parking.calculateParkingFee(
					ticket.slot.entryTime,
					exitTime,
					ticket.slot.type
				)} UAH</h1>`;

				var timer = setInterval(() => {
					modal.addNotification(
						`У вас є припаркований автомобіль ${ticket.slot.car.brand}!`
					);
				}, 100000);

				const buttonEndParking = document.createElement('button');
				buttonEndParking.innerHTML = 'Закінчити паркування';
				buttonEndParking.onclick = () => {
					this.tickets = this.tickets.filter(
						ticketLocal => ticketLocal.slot.name !== ticket.slot.name
					);

					clearInterval(timer);

					parking.endParking(ticket.slot.car.number, exitTime);
				};

				ticketDiv.appendChild(buttonEndParking);
				listOfTickets.appendChild(ticketDiv);
			}

			tickets.appendChild(ticketsList);
		}
	}
}

const pay = new Pay();
