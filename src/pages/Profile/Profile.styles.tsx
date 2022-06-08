import { createUseStyles } from 'react-jss'
import { headingLetterSpacing, standardFontFamily } from '../../config/jss-vars'

const styles = {
	page: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleSection: {
		textAlign: 'center',
		marginBottom: '3em',
	},
	heading: {
		fontFamily: standardFontFamily,
		letterSpacing: headingLetterSpacing,
		textTransform: 'uppercase',
	},
}

export default createUseStyles(styles)
