import { Link } from 'react-router-dom'
import { HomeRoute } from '../../pages/routes'
import ConnectButton from '../Button/ConnectButton'
import Logo from '../Logo/NLBLogo'
import useStyles from './Header.styles'

const Header: React.FC = () => {
	const classes = useStyles()

	return (
		<header className={classes.header}>
			<Link to={HomeRoute.path}>
				<Logo />
			</Link>
			<div className={classes.rightContent}>
				<ConnectButton />
			</div>
		</header>
	)
}

export default Header
