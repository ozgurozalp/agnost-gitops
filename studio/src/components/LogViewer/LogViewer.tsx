import { cn } from '@/utils';
import AnsiToHtml from 'ansi-to-html';
import { useEffect, useState, useRef } from 'react';

const LogViewer = ({ logs, className }: { logs: string[]; className?: string }) => {
	const [htmlLogs, setHtmlLogs] = useState('');
	const divElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const convert = new AnsiToHtml();
		const html = logs.map((log) => convert.toHtml(log)).join('<br/>');
		setHtmlLogs(html);
	}, [logs]);

	useEffect(() => {
		if (!divElement.current) return;
		let timeout = setTimeout(() => {
			divElement.current!.scrollTop = divElement.current!.scrollHeight;
		}, 100);

		return () => {
			clearTimeout(timeout);
		};
	}, [htmlLogs]);

	return (
		<div
			className={cn('log-viewer bg-gray-900 text-gray-100 p-4 overflow-auto text-xs', className)}
		>
			<div
				ref={divElement}
				dangerouslySetInnerHTML={{ __html: htmlLogs }}
				className='log-viewer-container whitespace-pre'
			/>
		</div>
	);
};

export default LogViewer;
