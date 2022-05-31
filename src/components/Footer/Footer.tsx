import AoLogo from '../Logo/AoLogo'
import NLBLogo from '../Logo/NLBLogo'
import useStyles from './Footer.styles'

const Footer: React.FC = () => {
	const classes = useStyles()

	return (
		<footer className={classes.footer}>
			<div className={classes.inner}>
				<NLBLogo />
				<a href='https://block.aocollab.tech'>
					<AoLogo />
				</a>
			</div>
		</footer>
	)
}

export default Footer
