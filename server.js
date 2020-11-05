const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.listen(port, (error) => {
	if (error) throw error;
	console.log('Server running on port ' + port);
})