import useStyles, { ClassNames } from './Banner.styles'

const { PUBLIC_URL } = process.env

interface Props {
	className?: ClassNames
}

export const MarketplaceBanner: React.FC<Props> = () => {
	const classes = useStyles()

	return (
		<div className={classes.banner}>
			<img
				className={classes.title}
				src={`${PUBLIC_URL}/img/text_marketplace.png`}
				alt="Marketplace"
			/>
			<h2 className={classes.subtitle}>Coming soon!</h2>
			<p className={classes.subtext}>
				Use your $CHANGE for merch, wellness courses, and donations.
				<br />
				You will accumulate $CHANGE while you wait.
			</p>
		</div>
	)
}

export default MarketplaceBanner
