import React, { Component } from "react";

import { TimelineLite, TweenLite } from 'gsap';

import { compose } from "../../services/functional"

import SolarSystem from "./svg/solar-system.svg";

export default class AboveTheFold extends Component {

	constructor(props) {
		super(props);
		this.solarSystemSvgRef = React.createRef();
	}

	componentDidMount() {
		const getSvgById = id => this.solarSystemSvgRef.current.querySelector(id);
		const domToElementsObject = attribute => domElement => domElement.querySelectorAll(attribute);
		const objectToArray = object => typeof object === 'object' ? Object.values(object) : {};
		const findItemById = id => array => array.filter(element => element.dataset.id === id)[0];

		const svgItems = compose(
			getSvgById,
			domToElementsObject("[data-id]"),
			objectToArray
		)("#solar-system");

		const sun = findItemById('sun')(svgItems);
		const animation = new TimelineLite();
		animation.to(sun, 10, {x: 300, y: 300});
	}

	render() {
		return (
			<div id={"above-the-fold"} ref={this.solarSystemSvgRef}>
				<SolarSystem id={"solar-system"}/>
			</div>
		);
	}
}