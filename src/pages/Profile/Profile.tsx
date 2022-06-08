import PageWrapper from '../../components/PageWrapper/PageWrapper'
import Staking from '../../components/Staking/Staking'
import Text from '../../components/Text/Text'
import useStyles from './Profile.styles'

const Profile: React.FC = () => {
	const classes = useStyles()

	return (
		<PageWrapper>
			<div className={classes.page}>
				<div className={classes.titleSection}>
					<Text variant="h1">Stake your Battalion!</Text>
					<Text variant="body">
						Earn $CHOW by staking your Nine lives battalion NFTs.
					</Text>
					<Text variant="body">
						Each NLB token will earn you $CHOW over time.
						<br />
						Use your $chow tokens to unlock benefits and features only
						accessible by using $CHOW.
					</Text>
				</div>
				<Staking />
			</div>
		</PageWrapper>
	)
}

export default Profile
