import { createUseStyles } from 'react-jss'
import { standardFontFamily } from '../../config/jss-vars'

const styles = {
	base: {
		fontFamily: standardFontFamily,
		display: 'inline-block',
		outline: 'none',
		padding: '1em',
		border: 'none',
		borderRadius: '0.35em',
	},
}

export default createUseStyles(styles)
