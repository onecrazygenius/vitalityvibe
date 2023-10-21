import { AnimatePresence } from 'framer-motion'
import { AppProps} from 'next/app'
import { useRouter } from 'next/navigation'

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const pageKey = router.asPath

	return (
		<AnimatePresence initial={false} mode="popLayout">
			<Component key={pageKey} {...pageProps} />
		</AnimatePresence>
	)
}