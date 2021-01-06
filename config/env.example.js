const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const db_name = 'delta_oauth'; // REPLACE WITH YOUR DB NAME
const ip_address = ''; // REPLACE WITH YOUR IP ADDRESS
module.exports = {
	server: server,
	db_name: db_name,
	ip: ip_address,
	boolIp: false,
	port: 3000,
	backendUrl: 'http://localhost:3000', //REPLACE WITH YOUR BACKEND URL
	dbUrl: `mongodb://${server}/${db_name}`, //REPLACE WITH YOUR DB URL
};
