import useStyles, { ClassNames } from './Logo.styles'

const { PUBLIC_URL } = process.env

interface Props {
	className?: ClassNames;
}

const NLBLogo: React.FC<Props> = ({className}) => {
	const classes = useStyles()

	return (
		<img
			className={classes[className || 'default']}
			src={`${PUBLIC_URL}/img/logo_nlb.png`}
			alt="NLB Logo"
		/>
	)
}

export default NLBLogo
