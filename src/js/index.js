const parking = new Parking(48, listPark);
const paying = new Pay();

parking.render();

const handleRegisterCar = () => {
	const number = document.querySelector('#number-car').value;
	const brand = document.querySelector('#brand-car').value;
	const model = document.querySelector('#model-car').value;
	const year = document.querySelector('#year-car').value;

	if (parking.validateRegister(number, brand, model, year)) {
		findPlace.validateSlot(new Car(number, brand, model, year));
	}
};

//Event for render page (parking, find, pay)
document.querySelector('#parking-nav').onclick = () => parking.render();
document.querySelector('#find-nav').onclick = () => findPlace.render();
document.querySelector('#pay-nav').onclick = () => paying.render();
