import * as React from 'react';
import * as classNames from 'classnames';
import {Loader} from "../loader/loader";
import 'components/button/styles/b_button.scss';

interface ButtonProps {
    buttonText: string
    handleClick: () => void
	// if one need to add extra styles to button
	extraClassName?: string
    isDisabled?: boolean
    isLoading?: boolean
}

export class Button extends React.Component<ButtonProps> {
    isLoading() {
        let isLoading = false;

        if(typeof this.props.isLoading !== 'undefined') {
            isLoading = this.props.isLoading;
        }

        return isLoading;
    }
    isDisabled() {
        let isDisabled = false;

        if(typeof this.props.isDisabled !== 'undefined') {
            isDisabled = this.props.isDisabled;
        }

        return isDisabled;
    }
    getButtonClassName() {
    	let extraClassName = '';
    	switch (true) {
		    case this.isLoading() || this.isDisabled(): {
		    	extraClassName = 'mDisable';
		    	break;
		    }
		    case typeof this.props.extraClassName !== 'undefined': {
			    extraClassName = this.props.extraClassName;
			    break;
		    }
		    default: {
		    	extraClassName = 'mMain';
		    }
	    }

        return classNames('bButton', extraClassName);
    }
    getView() {
        let view = null;

        switch (true) {
            case this.isLoading(): {
                view = (
                    <div className='eButton_textContainer'>
                        <div className='eButton_loaderContainer'>
                            <Loader extraClassName='mButtonLoader'/>
                        </div>
                        <div className='eButton_text'>
                            {this.props.buttonText}
                        </div>
                    </div>
                );
                break;
            }
            default: {
                view = (
                    <div className='eButton_textContainer'>
                        <div className='eButton_text'>
                            {this.props.buttonText}
                        </div>
                    </div>
                );
                break;
            }
        }

        return view;
    }
    render() {
        return (
            <button
                className={this.getButtonClassName()}
                disabled={this.isDisabled()}
                onClick={this.props.handleClick}
            >
                {this.getView()}
            </button>
        );
    }
}