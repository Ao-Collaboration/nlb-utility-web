import { createUseStyles } from 'react-jss'
import { off_grey, white } from '../../config/colors'
import { weightMedium } from '../../config/jss-vars'

const HEADER_HEIGHT = '64px'

const styles = {
	spacer: {
		marginBottom: `calc(${HEADER_HEIGHT} * 2)`,
	},
	header: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: off_grey,
		backdropFilter: 'blur(8px)',
		boxShadow: 'black 0px 2px 16px',
		height: HEADER_HEIGHT,
		minHeight: HEADER_HEIGHT,
		maxHeight: HEADER_HEIGHT,
		boxSizing: 'border-box',
		position: 'fixed',
		padding: '8px 48px',
	},
	inner: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		margin: 'auto',
	},
	group: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '1em',
	},
	groupClose: {
		composes: '$group',
		gap: '0.5em',
	},
	link: {
		color: white,
		fontWeight: weightMedium,
		lineHeight: 1.75,
		letterSpacing: '0.02857em',
		fontSize: '1.25em',
		opacity: 0.9,
		textDecoration: 'none',
		'&:hover': {
			borderBottom: `2px solid ${white}`,
		},
	},
}

export default createUseStyles(styles)
