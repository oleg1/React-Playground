import * as React from 'react'
import * as BPromise from 'bluebird'

import {AU_STATES} from "../../data/data";

import {Button} from "../../components/button/button"
import {ComboBox} from "../../components/combobox/combobox";

import '../../styles/b_page_container.scss'

export interface ApplicationViewState {
	buttonState: {
		isLoading: boolean
	},
	comboboxState: {
		selectedItem: any
	}
}

export class ApplicationView extends React.Component<{}, ApplicationViewState> {
	componentWillMount() {
		this.setState({
			buttonState: {
				isLoading: false
			},
			comboboxState: {
				selectedItem: AU_STATES[0]
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
	searchState(text) {
		let result = [];

		if(text.trim() !== '') {
			AU_STATES.forEach(state => {
				if(state.label.search(text) !== -1) {
					result.push(state);
				}
			});
		} else {
			result = AU_STATES;
		}

		return BPromise.resolve(result);
	}
	searchFunctionForCombobox(text) {
		return {
			sync: [],
			async: this.searchState(text)
		}
	}
	handleSelectComboboxItem(item) {
		this.setState({
			comboboxState: {
				selectedItem: item
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
				<div>
					<h4>
						ComboBox(Australian states)
					</h4>
					<ComboBox
						placeholder			= {'State name'}
						searchFunction		= {this.searchFunctionForCombobox.bind(this)}
						onSelect			= {(item) => this.handleSelectComboboxItem(item)}
						getElementTitle		= {(item) => item.label}
						clearAfterSelect    = {false}
					/>
				</div>
			</div>
		);
	}
};