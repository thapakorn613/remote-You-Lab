module.exports = function (app){
	app.get('/get', function (req, res) {
	  console.log('get data');
	  res.send(app.data);
	});
	 
	app.post('/add', function (req, res) {
		console.log('add data');
		req.body.id = app.data.length +1;
		app.data.push(req.body);
		res.send(app.data);
	});
	 
	app.put('/edit', function (req, res) {
	  if(req.body.id)
		app.data[req.body.id-1] = req.body;
	  console.log("edit data!");
	  res.send(app.data);
	});
	 
	app.delete('/delete', function (req, res) {
	  if(req.body.id)
		app.data.splice(req.body.id-1,1);
	  console.log("delete data!");
	  res.send(app.data);
	});
}