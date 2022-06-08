import Button from '../Button/Button'
import AoLogo from '../Logo/AoLogo'
import NLBLogo from '../Logo/NLBLogo'
import Text from '../Text/Text'
import useStyles from './Footer.styles'

const Footer: React.FC = () => {
	const classes = useStyles()

	return (
		<footer className={classes.footer}>
			<div className={classes.banner}>
				<div>
					<Text variant='h2'>Need to recruit your battalion?</Text>
					<Text variant='body'>Purchase more Nine Lives Battalion NFTS on Opensea and build up your Battalion!</Text>
				</div>
				<a href='https://opensea.io/collection/nlbnft'>
					<Button onClick={() => {return true}} className='primaryInverted'>Buy on Opensea</Button>
				</a>
			</div>
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
