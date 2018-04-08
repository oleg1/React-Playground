import * as React from 'react'
import * as ReactDom from 'react-dom'

import {ApplicationView} from 'module/application/application'

export function asApp() {
	ReactDom.render(
		React.createElement(ApplicationView, null),
		document.getElementById('jsMain')
	);
}