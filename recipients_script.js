const baseUrl = `http://flip3.engr.oregonstate.edu:31546/`;

document.addEventListener('DOMContentLoaded',init);

function init(){

	var req = new XMLHttpRequest();
        req.open('GET', baseUrl, false);
	req.send(null);
	var vals = JSON.parse(req.responseText);
	for (var key in vals) {
	  if(vals.hasOwnProperty(key)){
	    var response = JSON.stringify(vals[key]);
	    response = JSON.parse(response);
	    var table = document.createElement('table');
	    table.id = 'table1'
	    table.style.width = '50%';
	    table.style.border = '1';
	    table.cellspacing = '0';
	    table.cellpadding = '5';
	    
	    var col = [];
	    for(var i=0; i < response.length; i++) {
	      for (var key in response[i]) {
		if (col.indexOf(key) === -1) {
		  col.push(key);

		}	
	      } 
	    }
	    var tHead = document.createElement('thead');
	    var hRow = document.createElement('tr');
	    var th = document.createElement('th')
	    for (var i=0; i < col.length; i++) {
	      var th = document.createElement('th');
	      th.innerHTML = col[i];
	      hRow.appendChild(th);
	    }
	    tHead.appendChild(hRow);
	    table.appendChild(tHead);
	    var tBody = document.createElement('tbody');
	    for (var i=0; i < response.length; i++) {
	      var bRow = document.createElement('tr');
	      var td = document.createElement('td');
	      var td1 = document.createElement('td');
	      td.innerHTML = '<input type = "number" value = ' + response[i][col[0]] + ' disabled>';
              bRow.appendChild(td);
	      td1.innerHTML = '<input type = "email" value = ' + response[i][col[1]] + ' disabled>';
	      bRow.appendChild(td1);
	      bRow.id = response[i][col[0]]
	      var btn = document.createElement('button');
	      btn.innerHTML = 'Edit';
	      btn.value = 'Edit';
	      var btn2 = document.createElement('button');
	      btn2.innerHTML = 'Delete';
	      btn2.value = 'Delete';
	      bRow.appendChild(btn);
	      bRow.appendChild(btn2);
	      tBody.appendChild(bRow);
	  }	
	    table.appendChild(tBody);
	    var divContainer = document.getElementById('recipientResults');
	    divContainer.innerHTML = '';
	    divContainer.appendChild(table);

	  }
	}
}

document.getElementById("deleteBtn").addEventListener("click", function(button) {
	document.getElementById("deleteNotice").innerHTML = "Delete Row"
});