import { toast } from 'react-toastify'

const doFetch = async (
	path: string,
	method: string,
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	body?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
	let didToast = false
	try {
		const res = await fetch(path, {
			method: method,
			body: body && JSON.stringify(body),
			credentials: 'omit',
			headers: {
				'Content-Type': method !== 'GET' ? 'application/json' : 'text/plain',
				Accept: 'application/json',
			},
		})
		if (!res.ok) {
			const msg = `Server error: ${res.status}`
			toast.error(msg)
			didToast = true
			console.error(msg)
			throw Error(msg)
		}
		return await res.json()
	} catch (err) {
		if (!didToast) {
			console.error(err)
			toast.error('Error contacting server')
		}
		throw err
	}
	return
}

export default doFetch
