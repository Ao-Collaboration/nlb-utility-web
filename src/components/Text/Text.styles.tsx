import { createUseStyles } from 'react-jss'
import { headingLetterSpacing, standardFontFamily } from '../../config/jss-vars'
import {
	white,
	light_blue,
	text_shadow,
} from '../../config/colors'

const styles = {
	base: {
		fontFamily: standardFontFamily,
		letterSpacing: headingLetterSpacing,
		color: white,
		textShadow: `-5px -1px 0px ${text_shadow}`,
		margin: 0,
		marginBottom: '1em',
		textTransform: 'uppercase',
	},
	h1: {
		fontSize: '3em',
		composes: '$base',
		color: light_blue,
	},
	h2: {
		fontSize: '2em',
		composes: '$base',
		color: light_blue,
	},
	h3: {
		composes: '$base',
		color: light_blue,
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
	},
}

export default createUseStyles(styles)
