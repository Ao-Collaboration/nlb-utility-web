import Balance from '../../components/Balance/Balance'
import Header from '../../components/Header/Header'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import Staking from '../../components/Staking/Staking'
import Text from '../../components/Text/Text'
import useStyles from './Profile.styles'

const Profile: React.FC = () => {
	const classes = useStyles()

	return (
		<PageWrapper hasHeader={false}>
			<div className={classes.page}>
				<div className={classes.titleSection}>
					<Header />
					<Text variant="h1">Stake your Battalion!</Text>
					<Text variant="body-blue">
						Earn $CHOW by staking your Nine lives battalion NFTs.
					</Text>
					<Text variant="body-blue">
						Each NLB token will earn you $CHOW over time.
						<br />
						Use your $chow tokens to unlock benefits and features only
						accessible by using $CHOW.
					</Text>
					<Balance />
					<div className={classes.fadedBlack}></div>
				</div>
				<Staking />
			</div>
		</PageWrapper>
	)
}

export default Profile
