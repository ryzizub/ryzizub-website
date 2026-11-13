import { useEffect, useRef, useState } from 'react';
import styles from './MailFallback.module.css';

/** How long a mail app gets to take focus before we assume none opened. */
const WAIT_MS = 1500;

/** The address a mailto: link points at, without its query. */
const addressOf = (link: HTMLAnchorElement) => decodeURIComponent(link.href.slice('mailto:'.length).split('?')[0]);

const mailLinkOf = (event: MouseEvent) => {
	if (event.defaultPrevented || event.button !== 0 || !(event.target instanceof Element)) return null;
	return event.target.closest<HTMLAnchorElement>('a[href^="mailto:"]');
};

/**
 * A mailto: link does nothing on a computer with no mail app set up. After such a
 * click, if the page keeps focus, offer the address to copy instead.
 */
export default function MailFallback() {
	const [address, setAddress] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	const addressRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		let timer: number | undefined;
		const cancel = () => window.clearTimeout(timer);
		const onHidden = () => document.visibilityState === 'hidden' && cancel();

		const onClick = (event: MouseEvent) => {
			const link = mailLinkOf(event);
			if (!link) return;
			cancel();
			setAddress(null);
			timer = window.setTimeout(() => {
				setCopied(false);
				setAddress(addressOf(link));
			}, WAIT_MS);
		};

		document.addEventListener('click', onClick);
		window.addEventListener('blur', cancel);
		document.addEventListener('visibilitychange', onHidden);
		return () => {
			cancel();
			document.removeEventListener('click', onClick);
			window.removeEventListener('blur', cancel);
			document.removeEventListener('visibilitychange', onHidden);
		};
	}, []);

	useEffect(() => {
		if (!address) return;
		const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setAddress(null);
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [address]);

	// Where the clipboard is off limits, select the address so it can be copied by hand.
	const copy = async () => {
		if (!address) return;
		try {
			await navigator.clipboard.writeText(address);
			setCopied(true);
		} catch {
			if (addressRef.current) window.getSelection()?.selectAllChildren(addressRef.current);
		}
	};

	return (
		<div className={styles.region} role="status" aria-live="polite">
			{address && (
				<div className={styles.toast}>
					<p>
						No mail app opened? Write to <span ref={addressRef} className={styles.addr}>{address}</span>
					</p>
					<div className={styles.actions}>
						<button type="button" className={styles.copy} onClick={copy}>
							{copied ? 'Copied' : 'Copy address'}
						</button>
						<button type="button" className={styles.close} onClick={() => setAddress(null)}>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
