import useStyles from './Text.styles'

export type Variants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'body-blue' | 'body-purple' | 'small'

interface Props {
	children?: React.ReactNode
	variant: Variants
}

const Text: React.FC<Props> = ({ children, variant }) => {
	const classes = useStyles()

	if (variant === 'h1') {
		return <h1 className={classes.h1}>{children}</h1>
	} else if (variant === 'h2') {
		return <h2 className={classes.h2}>{children}</h2>
	} else if (variant === 'h3') {
		return <h3 className={classes.h3}>{children}</h3>
	} else if (variant === 'h4') {
		return <h4 className={classes.h4}>{children}</h4>
	} else if (variant === 'h5') {
		return <h5 className={classes.h5}>{children}</h5>
	} else if (variant === 'body') {
		return <p className={classes.body}>{children}</p>
	} else if (variant === 'body-blue') {
		return <p className={classes.bodyBlue}>{children}</p>
	} else if (variant === 'body-purple') {
		return <p className={classes.bodyPurple}>{children}</p>
	} else if (variant === 'small') {
		return <p className={classes.small}>{children}</p>
	} else {
		return null
	}
}

export default Text
