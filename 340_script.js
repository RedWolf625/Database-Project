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
	    var divContainer = document.getElementById('workoutTable');
	    divContainer.innerHTML = '';
	    divContainer.appendChild(table);

	  }
	}
}

/*
  buttons()
}

function change(target) {
  
  var paren = target.parentElement
  var val = paren.cells[0].querySelector('input').value
  var name = paren.cells[1].querySelector('input').value
  var reps = paren.cells[2].querySelector('input').value
  var weight = paren.cells[3].querySelector('input').value
  var date = paren.cells[4].querySelector('input').value
  var lbs = paren.cells[5].querySelector('input').checked
  if (lbs) {
    lbs = 1
  } else {
    lbs = 0
  }

  var obj = {'name': name, 'reps': reps,'weight': weight,'date': date,'lbs': lbs, 'id': val}

  if (target.value == 'Edit') {
    var elem = document.getElementById(''+ val)
    elem = elem.children
    for(var i = 1; i < 6; i++) {
      var tableChild = elem[i].children[0]
      if (tableChild.tagName == 'INPUT'){
        tableChild.removeAttribute('disabled')
      };
    };
    target.value = 'Done'
    target.innerHTML = 'Done'
    return;
  }  
  if (target.value == 'Done') {
      $.ajax({
        url: baseUrl + '?' + $.param(obj),
        type: 'PUT',
	contentType: 'application/json',
        success: function(result) {
	  init();
	}
      });
      return;
    }
  
  if (target.value == 'Delete') {
    $(document).ready(function() {
      $.ajax({
        url: baseUrl + '?' + $.param({'id': val}),
        type: 'DELETE',
        success: function(result) {
	  init();
        }
      });
    });
    }

}


function buttons() {
	 
	document.getElementById('table1').addEventListener('click', function(event) {
	  let target = event.target;
	  if (target.tagName != 'BUTTON') return;
	  change(target);
	});

}

function insert() {

  var req = new XMLHttpRequest();
  var payload = {name:null,reps:null,weight:null,date:null,lbs:null};
    payload.name = document.getElementById('name').value;
    payload.reps = document.getElementById('reps').value;
    payload.weight = document.getElementById('weight').value;
    payload.date = document.getElementById('date').value;
    if (document.getElementById('lbs').checked){
      payload.lbs = true;
    } else {
        payload.lbs = false;
    }
    if (payload.name !== ''){
      req.open('POST', baseUrl, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load',function(){
      if(req.status >=200 && req.status <400){
        var response = JSON.parse(req.responseText);
        init();
      } else {
        console.log('Error in network request: ' + req.statusText);
      }});
      req.send(JSON.stringify(payload));
      event.preventDefault();
    } else {
      event.preventDefault();
      return;
    }
}

*/