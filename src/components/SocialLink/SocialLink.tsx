import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
	faDiscord,
	faInstagram,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getNlbContractId, getStakingContractId } from '../../config/chain'
import EtherscanLogo from '../Logo/EtherscanLogo'
import OpenseaLogo from '../Logo/OpenseaLogo'
import useStyles, { ClassNames } from './SocialLink.styles'

interface Props {
	className?: ClassNames
}
interface EtherscanProps extends Props {
	contract: 'NLB' | 'Staking'
	chainId?: number
}

const makeLogoLink = (
	link: string,
	logo: JSX.Element,
	className?: ClassNames,
) => {
	const classes = useStyles()
	return (
		<a href={link} className={classes[className || 'default']}>
			{logo}
		</a>
	)
}

const makeFALink = (link: string, icon: IconProp, className?: ClassNames) => {
	return makeLogoLink(link, <FontAwesomeIcon icon={icon} />, className)
}

export const TwitterLink: React.FC<Props> = ({ className }) => {
	return makeFALink('https://twitter.com/9livesbattalion', faTwitter, className)
}
export const InstagramLink: React.FC<Props> = ({ className }) => {
	return makeFALink(
		'https://www.instagram.com/9livesbattalion',
		faInstagram,
		className,
	)
}
export const DiscordLink: React.FC<Props> = ({ className }) => {
	return makeFALink('https://discord.gg/nlbnft', faDiscord, className)
}

export const OpenseaLink: React.FC<Props> = ({ className }) => {
	const classes = useStyles()
	return makeLogoLink(
		'https://opensea.io/collection/nlbnft',
		<div className={classes.margin}>
			<OpenseaLogo className="small" />
		</div>,
		className,
	)
}
export const EtherscanLink: React.FC<EtherscanProps> = ({
	className,
	contract,
	chainId,
}) => {
	const classes = useStyles()
	const contractId =
		contract === 'NLB'
			? getNlbContractId(chainId || 1)
			: getStakingContractId(chainId || 1)
	return makeLogoLink(
		`https://etherscan.io/address/${contractId}`,
		<div className={classes.margin}>
			<EtherscanLogo className="small" />
		</div>,
		className,
	)
}

export const SocialLinks: React.FC<EtherscanProps> = ({
	className,
	contract,
	chainId,
}) => {
	return (
		<>
			<TwitterLink className={className} />
			<DiscordLink className={className} />
			<InstagramLink className={className} />
			<OpenseaLink className={className} />
			<EtherscanLink
				className={className}
				contract={contract}
				chainId={chainId}
			/>
		</>
	)
}
