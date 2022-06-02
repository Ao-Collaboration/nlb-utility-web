import { createUseStyles } from 'react-jss'
import { off_white, cyan, black } from '../../config/colors'
import { weightRegular, weightSemiBold } from '../../config/jss-vars'

const styles = {
	card: {
		padding: '1em',
		margin: '1em',
		backgroundColor: off_white,
		borderRadius: '20px',
		cursor: 'pointer',
		color: black,
	},
	selectedCard: {
		composes: '$card',
		backgroundColor: cyan,
	},
	image: {
		maxWidth: '200px',
		borderRadius: '6px',
	},
	caption: {
		textAlign: 'left',
		fontWeight: weightSemiBold,
	},
	small: {
		fontWeight: weightRegular,
	}
}

export default createUseStyles(styles)
