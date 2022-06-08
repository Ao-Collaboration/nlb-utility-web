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
		margin: '0.8em 0',
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
		color: white,
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
		color: white,
		textShadow,
	},
	bodyPurple: {
		composes: '$body',
		textShadow: 'none',
		color: purple,
	},
	bodyBlue: {
		composes: '$body',
		color: light_blue,
	},
	small: {
		composes: '$body',
		fontSize: '0.8em',
	},
}

export default createUseStyles(styles)
