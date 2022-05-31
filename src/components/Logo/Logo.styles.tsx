import { createUseStyles } from 'react-jss'

export type ClassNames = 'default' | 'invert' | 'small' | 'large' | 'largeInverted'

const styles = {
	defaultHeight: {
		height: '3em',
	},
	default: {
		height: '3em',
		width: '3em',
	},
	invert: {
		composes: '$default',
		filter: 'invert(1)',
	},
	small: {
		height: '1em',
		width: '1em',
	},
	large: {
		height: '5em',
		width: '5em',
	},
	largeInverted: {
		composes: ['$large', '$invert'],
	},
}

export default createUseStyles(styles)
