import {asApp} from './module/start_as_app';
import {loadSVG} from './helpers/svg_loader';
import './styles/basic_styles.scss';

const startModule = 'module/start_as_app';

loadSVG();  // will add some svg resources to page

switch(startModule) {
	case 'module/start_as_app': asApp(); break;
	default: asApp();
}