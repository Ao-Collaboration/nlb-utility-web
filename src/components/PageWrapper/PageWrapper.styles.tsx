import { createUseStyles } from 'react-jss'
import { white } from '../../config/colors'
import { standardFontFamily } from '../../config/jss-vars'

export type ClassNames = 'default'

const styles = {
	default: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		background: 'url("/img/background_tree1.png")',
		backgroundSize: 'cover',
		backgroundPosition: 'bottom',
	},
	main: {
		flex: 1,
		'& > *': {
			fontFamily: standardFontFamily,
			color: white,
		}
	},
}

export default createUseStyles(styles)
