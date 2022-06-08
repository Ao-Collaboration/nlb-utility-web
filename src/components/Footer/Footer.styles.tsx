import { createUseStyles } from 'react-jss'
import { black } from '../../config/colors'

const styles = {
	footer: {
		background: black,
		marginTop: '2em',
	},
	banner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '2em 5em',
		background: 'transparent linear-gradient(264deg, #6861FE 0%, #0C99FD 43%, #00A7FF 78%, #860FED 100%) 0% 0% no-repeat padding-box',
	},
	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '1em',
	},
}

export default createUseStyles(styles)
