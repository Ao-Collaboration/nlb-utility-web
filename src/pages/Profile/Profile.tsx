import PageWrapper from '../../components/PageWrapper/PageWrapper'
import Staking from '../../components/Staking/Staking'
import useStyles from './Profile.styles'

const Profile: React.FC = () => {
	const classes = useStyles()

	return (
		<PageWrapper>
			<div className={classes.page}>
				<Staking />
			</div>
		</PageWrapper>
	)
}

export default Profile
