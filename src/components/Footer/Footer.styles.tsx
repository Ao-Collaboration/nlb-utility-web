import { createUseStyles } from 'react-jss'
import { black } from '../../config/colors'

const styles = {
	footer: {
		background: black,
	},
	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '1em',
	},
}

export default createUseStyles(styles)
