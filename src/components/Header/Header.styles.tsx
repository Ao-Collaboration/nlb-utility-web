import { createUseStyles } from 'react-jss'
import { black, teal } from '../../config/colors'
import { weightSemiBold } from '../../config/jss-vars'

const styles = {
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: '1em',
		padding: '1em',
	},
	rightContent: {
		marginLeft: 'auto',
		display: 'flex',
		alignItems: 'center',
	},
	link: {
		textTransform: 'uppercase',
		color: black,
		fontSize: '1.5em',
		fontWeight: weightSemiBold,
		textDecoration: 'none',
		'&:hover': {
			color: teal,
		}
	},
}

export default createUseStyles(styles)
