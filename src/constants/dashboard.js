const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const generateSlots = () => {
	const slots = {};
	for (let d = 1; d <= 31; d++) {
		const daySlots = [];
		["08:00", "10:00", "13:00", "15:00", "17:00"].forEach((time) => {
			const rand = Math.random();
			const status =
				rand < 0.35
					? "booked"
					: rand < 0.55
						? "reserved"
						: rand < 0.65
							? "blocked"
							: "open";
			const price = [275, 295, 320, 340, 360][Math.floor(Math.random() * 5)];
			daySlots.push({
				time,
				status,
				price,
				driver:
					status === "booked"
						? ["Alex M.", "Carlos R.", "Sergio P.", "Laura T.", "Marco V."][
								Math.floor(Math.random() * 5)
							]
						: null,
			});
		});
		slots[d] = daySlots;
	}
	return slots;
};

const SLOTS = generateSlots();

const BOOKINGS = [
	{
		id: "TS-2847",
		driver: "Alex Martín",
		vehicle: "BMW M3 GT",
		date: "Sat 1 Mar",
		time: "09:00",
		duration: "2h",
		price: 320,
		insurance: true,
		status: "confirmed",
		avatar: "AM",
	},
	{
		id: "TS-2846",
		driver: "Carlos Ruiz",
		vehicle: "Porsche 911 GT3",
		date: "Sat 1 Mar",
		time: "13:00",
		duration: "2h",
		price: 320,
		insurance: true,
		status: "confirmed",
		avatar: "CR",
	},
	{
		id: "TS-2845",
		driver: "Sergio Pérez Jr.",
		vehicle: "Audi R8",
		date: "Sun 2 Mar",
		time: "10:00",
		duration: "2h",
		price: 295,
		insurance: false,
		status: "pending",
		avatar: "SP",
	},
	{
		id: "TS-2844",
		driver: "Laura Torres",
		vehicle: "Ferrari 488",
		date: "Sun 2 Mar",
		time: "15:00",
		duration: "2h",
		price: 340,
		insurance: true,
		status: "confirmed",
		avatar: "LT",
	},
	{
		id: "TS-2843",
		driver: "Marco Vitale",
		vehicle: "Lamborghini Huracán",
		date: "Mon 3 Mar",
		time: "09:00",
		duration: "3h",
		price: 480,
		insurance: true,
		status: "confirmed",
		avatar: "MV",
	},
	{
		id: "TS-2842",
		driver: "Sophie Laurent",
		vehicle: "McLaren 720S",
		date: "Mon 3 Mar",
		time: "13:00",
		duration: "2h",
		price: 320,
		insurance: true,
		status: "cancelled",
		avatar: "SL",
	},
];

const NOISE_DATA = [
	62, 65, 68, 71, 74, 78, 82, 85, 88, 86, 83, 79, 84, 89, 91, 88, 85, 82, 79,
	75, 72, 68, 65, 62,
];
const REVENUE_DATA = [
	{ month: "Sep", v: 4200 },
	{ month: "Oct", v: 5800 },
	{ month: "Nov", v: 4900 },
	{ month: "Dec", v: 3200 },
	{ month: "Jan", v: 6100 },
	{ month: "Feb", v: 7400 },
];
const UTIL_DATA = [
	{ day: "Mon", v: 40 },
	{ day: "Tue", v: 55 },
	{ day: "Wed", v: 35 },
	{ day: "Thu", v: 65 },
	{ day: "Fri", v: 75 },
	{ day: "Sat", v: 92 },
	{ day: "Sun", v: 88 },
];

export { DAYS, MONTHS, generateSlots, SLOTS, BOOKINGS, NOISE_DATA, REVENUE_DATA, UTIL_DATA };
