import { createUseStyles } from 'react-jss'
import { light_blue, text_shadow, white } from '../../config/colors'
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
	section: {
		marginBottom: '2em',
	},
	titleSection: {
		marginBottom: '3em',
	},
	title: {
		fontFamily: standardFontFamily,
		letterSpacing: headingLetterSpacing,
		fontSize: '3em',
		color: light_blue,
		textShadow: `-5px -1px 0px ${text_shadow}`,
		margin: 0,
		marginBottom: '1em',
		textTransform: 'uppercase',
	},
	heading: {
		fontFamily: standardFontFamily,
		letterSpacing: headingLetterSpacing,
		fontSize: '2em',
		margin: 0,
		textTransform: 'uppercase',
	},
	text: {
		composes: '$title',
		fontSize: '1em',
		color: white,
		marginBottom: '1em',
	},
}

export default createUseStyles(styles)
