import { useState, useEffect } from 'react'

import useStyles from './Balance.styles'

import Button from '../Button/Button'
import Spinner from '../Spinner/Spinner'

const Balance: React.FC = () => {
	const [balance, setBalance] = useState(0)
	const [isLoading, setIsLoading] = useState(true)

	const classes = useStyles()

	const getBalance = async () => {
		//FIXME Call contract
		setBalance(0)
		setIsLoading(false)
	}

	useEffect(() => {
		getBalance()
	}, [])

	const claimTokens = async () => {
		setIsLoading(true)
		//FIXME Call contract
		getBalance()
	}

	return (
		<div className={classes.section}>
			{isLoading ?
				<Spinner /> :
				<>
					<Button onClick={claimTokens} disabled={isLoading}>
						<>
							Claim $CHANGE
						</>
					</Button>
					<p className={classes.text}>Total claimed: <span className={classes.textSpecial}>{balance} $CHANGE</span></p> :
					<p className={classes.text}>Claiming available when marketplace opens.</p>
				</>
			}
		</div>
	)
}

export default Balance
