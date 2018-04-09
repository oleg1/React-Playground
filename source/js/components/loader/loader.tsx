import * as React from 'react'
import {SVG} from "../svg/svg";

import "components/loader/styles/b_loader.scss";

export interface LoaderProps {
	extraClassName?: string
}

export class Loader extends React.Component<LoaderProps, {}> {
	getClassName() {
		return this.props.extraClassName ? 'bLoader ' + this.props.extraClassName : 'bLoader';
	}
	render() {
        return (
            <div className={this.getClassName()}>
                <SVG
	                icon="icon_spin-loader-black"
	                extraClassName='mBig'
                />
            </div>
        );
    }
}

