export const BREAK_POINT_EXTRA_SMALL = 320
export const BREAK_POINT_SMALL = 568
export const BREAK_POINT_MEDIUM = 768
export const BREAK_POINT_LARGE = 1200
export const BREAK_POINT_EXTRA_LARGE = 1440

export const min = (size: number): string => {
	return `min-width: ${size}px`
}

export const max = (size: number): string => {
	return `max-width: ${size - 1}px`
}

export const down = (size: number): string => {
	return `@media (${max(size)})`
}

export const up = (size: number): string => {
	return `@media (${min(size)})`
}

export const between = (lowerLimit: number, upperLimit: number): string => {
	return `@media (${min(lowerLimit)}) and (${max(upperLimit)})`
}

export const TABLET_DOWN = (): string => down(BREAK_POINT_MEDIUM)
export const MOBILE_DOWN = (): string => down(BREAK_POINT_SMALL)

export const TABLET_ONLY = (): string => between(BREAK_POINT_SMALL, BREAK_POINT_MEDIUM)

export const MOBILE_UP = (): string => up(BREAK_POINT_SMALL)
export const LAPTOP_UP = (): string => up(BREAK_POINT_MEDIUM)
export const SCREEN_UP = (): string => up(BREAK_POINT_LARGE)
export const LARGE_SCREEN_UP = (): string => up(BREAK_POINT_EXTRA_LARGE)
