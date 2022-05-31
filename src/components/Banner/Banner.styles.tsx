import { createUseStyles } from 'react-jss'
import { headingLetterSpacing, weightSemiBold } from '../../config/jss-vars'

export type ClassNames = 'default'

const styles = {
	banner: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		background: 'url("/img/background_tree1.png")',
		backgroundSize: 'cover',
		backgroundPosition: 'bottom',
		padding: '5em 0',
	},
	title: {
		maxWidth: 'min(500px, 80vw)',
	},
	subtitle: {
		textTransform: 'uppercase',
		letterSpacing: headingLetterSpacing,
	},
	subtext: {
		fontWeight: weightSemiBold,
		textAlign: 'center',
	},
}

export default createUseStyles(styles)
