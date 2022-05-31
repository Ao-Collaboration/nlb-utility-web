import { createUseStyles } from 'react-jss'
import { weightSemiBold } from '../../config/jss-vars'

const styles = {
	section: {
		margin: '2em 0',
	},
	text: {
		fontSize: '1.2em',
		textTransform: 'uppercase',
		fontWeight: weightSemiBold,
	},
	textSpecial: {
		fontSize: '1.5em',
	},
}

export default createUseStyles(styles)
