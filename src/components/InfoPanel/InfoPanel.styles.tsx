import { createUseStyles } from 'react-jss'
import { black, white } from '../../config/colors'
import { weightSemiBold } from '../../config/jss-vars'

const styles = {
	card: {
		display: 'flex',
		flexDirection: 'column',
		gap: '0.5em',
		padding: '1.5em 4em',
		backgroundColor: white,
		borderRadius: '20px',
		cursor: 'pointer',
		color: black,
	},
	title: {
		fontSize: '1.2em',
		textTransform: 'uppercase',
		fontWeight: weightSemiBold,
	},
	content: {
		fontSize: '1.5em',
	},
}

export default createUseStyles(styles)
