import { createUseStyles } from 'react-jss'
import { headingLetterSpacing, standardFontFamily } from '../../config/jss-vars'
import {
	white,
	light_blue,
	text_shadow,
	purple,
	black,
} from '../../config/colors'

const textShadow = `-0.15em -1px 1px ${text_shadow}`

const styles = {
	base: {
		fontFamily: standardFontFamily,
		letterSpacing: headingLetterSpacing,
		color: white,
		margin: 0,
		marginBottom: '1em',
		textTransform: 'uppercase',
	},
	h1: {
		composes: '$base',
		fontSize: '3em',
		color: light_blue,
		textShadow,
	},
	h2: {
		composes: '$base',
		fontSize: '2em',
		color: light_blue,
		textShadow,
	},
	h3: {
		composes: '$base',
		color: black,
	},
	h4: {
		composes: '$base',
		color: light_blue,
	},
	h5: {
		composes: '$base',
		color: light_blue,
	},
	body: {
		composes: '$base',
		color: light_blue,
		textShadow,
	},
	bodyPurple: {
		composes: '$base',
		textShadow: 'none',
		color: purple,
	},
}

export default createUseStyles(styles)
