export default function IconTVItaueira({
	...rest
}: {
	className?: string
	onClick?: (evt: any) => void
}) {
	return (
		<svg
			{...rest}
			xmlns="http://www.w3.org/2000/svg"
			xmlSpace="preserve"
			viewBox="0 0 100 40">
			<path d="M34.94 17.57v13.12H32.4V17.57h2.54zm8.48 5.02h-2.73v4.96c0 .47.11.8.34.97.23.17.52.26.89.26.28 0 .57-.03.87-.08.31-.05.56-.13.77-.23l.38 1.75c-.26.11-.62.22-1.07.32s-.93.16-1.45.16c-1.12 0-1.93-.23-2.43-.69s-.74-1.15-.74-2.06V22.6h-1.5v-1.79h1.5v-3.08h2.44v3.08h2.73v1.78zm2.31-.92c.61-.33 1.23-.59 1.85-.78.62-.19 1.31-.28 2.06-.28.58 0 1.11.07 1.58.2s.88.34 1.23.64c.35.29.62.67.8 1.13.19.46.28 1.03.28 1.7v6.42H51.6l-.25-1.04h-.06c-.71.83-1.72 1.25-3.02 1.25-1.04 0-1.85-.27-2.44-.82-.58-.55-.87-1.26-.87-2.13 0-.56.12-1.03.35-1.44.24-.4.56-.74.97-1 .41-.26.9-.46 1.47-.59.57-.13 1.19-.2 1.85-.2h1.46v-.69c0-.54-.16-.93-.48-1.16-.32-.23-.75-.34-1.29-.34-.39 0-.8.06-1.24.19s-.92.34-1.45.65l-.87-1.71zm5.35 4.6-1.13.04c-.92.03-1.56.18-1.92.47-.36.29-.54.63-.54 1.03 0 .51.15.86.46 1.04.31.18.66.27 1.06.27s.79-.1 1.16-.3.67-.48.91-.84v-1.71zm11.37-5.48h2.46v9.89h-1.85l-.29-1.15h-.08c-.32.33-.74.64-1.27.93-.53.28-1.19.43-1.98.43-1.04 0-1.88-.29-2.5-.88-.63-.57-.94-1.45-.94-2.61v-6.6h2.46v6.35c0 .68.16 1.16.47 1.45.31.28.71.43 1.2.43.51 0 .96-.11 1.34-.32.38-.21.71-.48.99-.8v-7.12zm13.75 5.5h-6.73v.08c0 .9.28 1.58.84 2.02s1.3.67 2.22.67c.54 0 1.02-.05 1.45-.15.42-.1.83-.23 1.22-.4l.48 1.73c-.4.18-.88.33-1.44.46s-1.2.19-1.94.19-1.43-.1-2.07-.29-1.21-.5-1.7-.92c-.49-.42-.87-.94-1.16-1.58-.29-.64-.43-1.4-.43-2.29 0-.78.12-1.49.35-2.12s.57-1.19 1-1.65c.43-.46.95-.81 1.56-1.06.61-.25 1.28-.38 2.02-.38 1.32 0 2.37.4 3.15 1.21.78.81 1.17 1.92 1.17 3.35v1.13zm-2.52-1.7c0-.29-.03-.57-.1-.84s-.18-.51-.33-.72c-.15-.21-.35-.37-.59-.49s-.53-.18-.86-.18c-.62 0-1.14.21-1.54.62-.4.42-.65.96-.73 1.64l4.15-.03zm6.02-6.07c-.43 0-.77-.12-1.01-.38s-.36-.56-.36-.94c0-.36.12-.67.38-.93.25-.26.58-.39 1-.39.4 0 .73.12.98.38s.38.56.38.94-.12.69-.38.94-.59.38-.99.38zm-1.23 12.17V20.8h2.46v9.89h-2.46zm5.29 0V20.8h1.9l.31 1.85c.24-.57.61-1.05 1.12-1.45s1.15-.59 1.92-.59c.33 0 .62.04.88.1s.46.15.62.23l-.42 2c-.15-.08-.34-.16-.56-.22-.22-.06-.49-.09-.81-.09-.71 0-1.3.24-1.79.73s-.73 1.26-.73 2.31v5.02h-2.44zm7.85-9.02c.61-.33 1.23-.59 1.85-.78s1.31-.28 2.06-.28c.58 0 1.11.07 1.58.2s.88.34 1.23.64c.35.29.61.67.8 1.13.19.46.28 1.03.28 1.7v6.42h-1.94l-.25-1.04h-.06c-.71.83-1.72 1.25-3.02 1.25-1.04 0-1.85-.27-2.44-.82-.58-.55-.88-1.26-.88-2.13 0-.56.12-1.03.35-1.44.24-.4.56-.74.97-1 .41-.26.9-.46 1.47-.59.57-.13 1.19-.2 1.85-.2h1.46v-.69c0-.54-.16-.93-.48-1.16-.32-.23-.75-.34-1.29-.34-.39 0-.8.06-1.24.19s-.92.34-1.45.65l-.85-1.71zm5.35 4.6-1.12.04c-.92.03-1.56.18-1.92.47-.36.29-.54.63-.54 1.03 0 .51.15.86.46 1.04s.66.27 1.06.27.79-.1 1.16-.3c.37-.2.67-.48.91-.84v-1.71zM28.91 15.6c-.61-3.22-3.43-5.76-7.07-5.19-.81.13-1.63.2-2.5.31.05-.15.09-.26.13-.36.82-2.11 1.66-4.21 2.47-6.32.12-.32.26-.52.63-.43.09.02.19-.02.28-.05.52-.16.84-.63.82-1.19-.02-.52-.4-.98-.9-1.1-.54-.12-1.11.14-1.34.63-.24.49-.12 1.07.29 1.42.11.1.26.14.15.36-1.18 2.33-2.36 4.67-3.53 7-.06.12-.14.17-.28.19-2.56.31-5.13.61-7.68.95-.41.05-.56-.08-.72-.41C8.37 8.8 7.05 6.2 5.73 3.6c-.12-.25-.17-.38.09-.59.46-.36.51-1.03.19-1.51-.33-.48-.95-.66-1.48-.43-.5.22-.79.81-.66 1.36.13.57.64.96 1.23.89.23-.02.31.04.39.24 1.06 2.73 2.13 5.45 3.2 8.18.08.21.08.28-.17.31-1.01.11-2.02.25-3.03.36-.92.1-1.83.22-2.62.77-2.13 1.48-2.9 3.62-2.73 6.1.24 3.42.6 6.83.91 10.25.08.92.19 1.83.58 2.69.92 2 2.35 3.39 4.64 3.59 2.06.18 4.14.26 6.21.39 3 .18 6 .33 9 .56 3.26.25 6.23-1.96 6.79-5.19.25-1.42.2-2.88.28-4.32.15-2.72.29-5.45.41-8.17.04-1.16.17-2.32-.05-3.48zM8.7 20.43l1.49 11.46-2.63.34-1.49-11.46-3.88.5-.27-2.11 10.49-1.36.27 2.11-3.98.52zm13.53 9.9-2.78.36-6.78-12.92 2.78-.36 3.37 6.88c.12.22.25.48.39.78s.29.61.44.93c.15.32.3.63.44.95.14.32.27.61.38.87l.06-.01c.04-.27.08-.57.13-.9s.11-.67.16-1.01c.06-.34.12-.66.18-.99.06-.32.12-.62.17-.89l1.58-7.56 2.71-.35-3.23 14.22z" />
			<g fill="#020202">
				<path d="M85.75 16.12c-.14.22-.37.35-.68.32-.3-.03-.52-.19-.62-.47-.15-.4-.28-.81-.5-1.18-.34-.58-.77-1.07-1.3-1.47-.97-.72-2.06-1.04-3.26-.97-.35.02-.69.1-1.03.18-.18.04-.36.01-.52-.09-.27-.17-.39-.42-.35-.74.05-.32.24-.53.55-.61 1.08-.29 2.16-.32 3.24-.03 1.94.52 3.35 1.68 4.21 3.5.14.3.25.61.34.93.07.19.05.39-.08.63z" />
				<path d="M81.63 13.79c.95.55 1.56 1.33 1.86 2.35.12.4-.09.79-.48.92-.37.12-.77-.07-.92-.45-.11-.3-.22-.59-.41-.84-.56-.77-1.56-1.15-2.49-.93-.21.05-.41.08-.61-.01-.3-.14-.47-.43-.44-.75.03-.3.26-.56.57-.65.88-.23 1.73-.17 2.57.18.12.06.24.13.35.18zm-.81 4.06c-.36.61-1.13.81-1.73.45-.6-.36-.81-1.14-.45-1.73.37-.62 1.11-.81 1.72-.46.62.36.81 1.14.46 1.74z" />
			</g>
		</svg>
	)
}