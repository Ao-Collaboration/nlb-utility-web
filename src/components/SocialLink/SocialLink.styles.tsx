import { createUseStyles } from 'react-jss'
import { black, white } from '../../config/colors'
import { weightSemiBold } from '../../config/jss-vars'

export type ClassNames = 'default' | 'square'

const styles = {
	default: {
		color: white,
		margin: '0 0.25em',
		fontSize: '1.5em',
		fontWeight: weightSemiBold,
	},
	square: {
		composes: '$default',
		backgroundColor: black,
		borderRadius: '5px',
		padding: '0.2em 0.4em',
	},
	margin: {
		marginTop: '0.4em',
	},
}

export default createUseStyles(styles)
