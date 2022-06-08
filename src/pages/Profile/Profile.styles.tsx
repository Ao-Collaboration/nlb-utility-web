import { createUseStyles } from 'react-jss'
import { headingLetterSpacing, standardFontFamily } from '../../config/jss-vars'

const fadedBlackHeight = 10

const styles = {
	page: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleSection: {
		background: 'url("/img/background_mountains.jpg")',
		backgroundSize: 'cover',
		backgroundPosition: 'bottom',
		backgroundRepeat: 'no-repeat',
		textAlign: 'center',
		marginBottom: `${fadedBlackHeight/2 + 2}em`,
		width: '100%',
	},
	heading: {
		fontFamily: standardFontFamily,
		letterSpacing: headingLetterSpacing,
		textTransform: 'uppercase',
	},
	fadedBlack: {
		height: `${fadedBlackHeight}em`,
		marginBottom: `-${fadedBlackHeight/2}em`,
		backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,1.0) 50%, rgba(0,0,0,0.0) 100%)',
	},
}

export default createUseStyles(styles)
