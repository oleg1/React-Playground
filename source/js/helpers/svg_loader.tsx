/** Will add new div with svg icons */
export function loadSVG() {
	const scripts = document.getElementsByTagName('script'),
		script = scripts[scripts.length - 1],
		xhr = new XMLHttpRequest();

	xhr.onload = function () {
		const div = document.createElement('div');
		div.innerHTML = this.responseText;
		div.style.display = 'none';
		script.parentNode.insertBefore(div, script);
	};

	xhr.open('get', '/build/images/icons.svg', true); //for other browser
	xhr.send();
}