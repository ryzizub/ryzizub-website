// Stroke icons on a 24px grid, drawn with currentColor (see Icon.astro).
export const ICONS = {
	phone: 'M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM11 18h2',
	web: 'M3 5h18v14H3zM3 9h18M6.5 7h.01M9 7h.01',
	server: 'M4 4.5h16v6H4zM4 13.5h16v6H4zM7.5 7.5h.01M7.5 16.5h.01M11 7.5h6M11 16.5h6',
	code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
	layers: 'M12 3l9 5-9 5-9-5 9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5',
	chevron: 'M9 6l6 6-6 6',
	enter: 'M20 5v6a4 4 0 0 1-4 4H5M9 11l-4 4 4 4',
	arrow: 'M5 12h14M13 6l6 6-6 6',
	up: 'M12 19V5M6 11l6-6 6 6',
	play: 'M8 5.5v13l10.5-6.5z',
	pause: 'M9 6v12M15 6v12',
	doc: 'M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5',
	mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3',
	pin: 'M12 21s6.5-5.7 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15.3 12 21 12 21zM12 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
} as const;

export type IconName = keyof typeof ICONS;
