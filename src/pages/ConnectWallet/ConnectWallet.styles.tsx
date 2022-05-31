import { createUseStyles } from 'react-jss'

const styles = {
	page: {
		minHeight: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'url("/img/background_tree1.png")',
		backgroundSize: 'cover',
		backgroundPosition: 'bottom',
	},
}

export default createUseStyles(styles)
