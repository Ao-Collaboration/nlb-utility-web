import { useContext } from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { BREAK_POINT_LARGE, BREAK_POINT_MEDIUM, BREAK_POINT_SMALL, min } from '../../config/mediaQueryHelper'
import { Web3Context } from '../../context/Web3/Web3Context'
import { HomeRoute } from '../../pages/routes'
import ConnectButton from '../Button/ConnectButton'
import Logo from '../Logo/NLBLogo'
import { SocialLinks } from '../SocialLink/SocialLink'
import useStyles from './Header.styles'

const Header: React.FC = () => {
	const classes = useStyles()
	const { web3Provider } = useContext(Web3Context)

	const chainId = web3Provider?.network.chainId

	return (
		<>
			<header className={classes.header}>
				<div className={classes.inner}>
					<div className={classes.group}>
						<Link to={HomeRoute.path}>
							<Logo />
						</Link>
					</div>
					<div className={classes.group}>
						<MediaQuery query={`(${min(BREAK_POINT_LARGE)})`}>
							<a href="https://nlbnft.com/#story" className={classes.link}>Story</a>
							<a href="https://nlbnft.com/#project" className={classes.link}>Project</a>
							<a href="https://nlbnft.com/#gallery" className={classes.link}>Gallery</a>
							<a href="https://nlbnft.com/#faq" className={classes.link}>FAQ</a>
							<a href="https://nlbnft.com/#roadmap" className={classes.link}>Roadmap</a>
							<a href="https://nlbnft.com/#team" className={classes.link}>Team</a>
						</MediaQuery>
						<MediaQuery query={`(${min(BREAK_POINT_SMALL)})`}>
							<a href="https://nlbnft.com/#mint" className={classes.link}>Mint</a>
						</MediaQuery>
					</div>
					<div className={classes.groupClose}>
						<ConnectButton />
						<MediaQuery query={`(${min(BREAK_POINT_MEDIUM)})`}>
							<SocialLinks contract='Staking' chainId={chainId} />
						</MediaQuery>
					</div>
				</div>
			</header>
			<div className={classes.spacer}></div>
		</>
	)
}

export default Header
