import useStyles, { ClassNames } from './Logo.styles'

const { PUBLIC_URL } = process.env

interface Props {
	className?: ClassNames;
}

const OpenseaLogo: React.FC<Props> = ({className}) => {
	const classes = useStyles()

	return (
		<img
			className={classes[className || 'default']}
			src={`${PUBLIC_URL}/img/logo_opensea.svg`}
			alt="Opensea Logo"
		/>
	)
}

export default OpenseaLogo
