document.addEventListener('DOMContentLoaded', (event) => {
	initButtons();
});

function initButtons() {
	document.getElementById('addLines').addEventListener('click', function () {
		document.getElementById("newLines").textContent = 'Add Lines';
	});
}