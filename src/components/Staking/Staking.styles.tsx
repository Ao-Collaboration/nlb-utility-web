import { createUseStyles } from 'react-jss'
import { headingLetterSpacing, standardFontFamily } from '../../config/jss-vars'

const styles = {
	sectionContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		textAlign: 'center',
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		maxWidth: '60em',
	},
	heading: {
		fontFamily: standardFontFamily,
		letterSpacing: headingLetterSpacing,
		fontSize: '2em',
		margin: 0,
		textTransform: 'uppercase',
	},
	subheading: {
		marginBottom: '1em',
	}
}

export default createUseStyles(styles)
