import * as React from 'react'
import {Button} from "../../components/button/button";

import '../../styles/b_page_container.scss'

export interface ApplicationViewState {
	buttonState: {
		isLoading: boolean
	}
}

export class ApplicationView extends React.Component<{}, ApplicationViewState> {
	componentWillMount() {
		this.setState({
			buttonState: {
				isLoading: false
			}
		});
	}
	handleClickButton() {
		this.setState({
			buttonState: {
				isLoading: true
			}
		});
	}
	render() {
		return (
			<div className='bPageContainer'>
				<div>
					<h4>
						Buttons
					</h4>
					<Button
						buttonText='Submit'
						isLoading={this.state.buttonState.isLoading}
						handleClick={() => this.handleClickButton()}
					/>
					<Button
						buttonText='Remove'
						handleClick={() => []}
						extraClassName='mDanger'
					/>
					<Button
						buttonText='Disabled button'
						isDisabled={true}
						handleClick={() => {}}
					/>
				</div>
			</div>
		);
	}
};