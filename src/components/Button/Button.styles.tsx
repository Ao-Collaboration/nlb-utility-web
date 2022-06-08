import { createUseStyles } from 'react-jss'
import { standardFontFamily, weightSemiBold } from '../../config/jss-vars'
import {
	white,
	off_black,
	off_white,
	cyan,
	teal,
	purple,
	off_purple,
	black,
} from '../../config/colors'

export type ClassNames = 'primary' | 'primaryInverted' | 'primaryBlack' | 'link' | 'success' | 'error' | 'info'

const styles = {
	base: {
		cursor: 'pointer',
		fontFamily: standardFontFamily,
		fontSize: '1rem',
		lineHeight: '1rem',
		textAlign: 'center',
		display: 'inline-block',
		outline: 'none',
	},
	button: {
		composes: '$base',
		border: 'none',
		borderRadius: '0.35em',
		padding: '0.75rem 4rem',
		letterSpacing: 0,
		textTransform: 'uppercase',
		fontWeight: weightSemiBold,
		boxShadow: `0em 0.15em 0.65em 0em ${off_black}`,
		'&:disabled': {
			cursor: 'default',
			opacity: 0.5,
			pointerEvents: 'none',
		},
	},
	primary: {
		composes: '$button',
		background: purple,
		color: off_white,
		'&:hover': {
			color: white,
		}
	},
	primaryInverted: {
		composes: '$button',
		background: white,
		color: off_purple,
		'&:hover': {
			color: purple,
		}
	},
	primaryBlack: {
		composes: '$button',
		background: black,
		color: off_white,
		'&:hover': {
			color: white,
		}
	},
	link: {
		composes: '$base',
		border: 0,
		color: cyan,
		cursor: 'pointer',
		display: 'inline-block',
		padding: 0,
		backgroundColor: 'transparent',
		fontWeight: weightSemiBold,
		fontSize: '0.875rem',
		height: '0.875rem',
		lineHeight: '0.875rem',
		letterSpacing: 0.2,
		'&:disabled': {
			cursor: 'default',
			opacity: 0.5,
			pointerEvents: 'none',
		},
		'&:hover': {
			color: teal,
		},
	},
	success: {
		composes: '$primary',
	},
	error: {
		composes: '$primary',
	},
	info: {
		composes: '$primary',
	},
}

export default createUseStyles(styles)
