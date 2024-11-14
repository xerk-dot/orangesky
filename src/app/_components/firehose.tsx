"use client";

import { Firehose } from "@skyware/firehose";
import { useEffect, useState } from "react";

export function FirehoseComponent() {
	const [messages, setMessages] = useState<string[]>([]);
	
	useEffect(() => {
		const firehose = new Firehose();
		
		firehose.on("commit", (message) => {
			for (const op of message.ops) {
				const uri = "at://" + message.repo + "/" + op.path;
				setMessages(prev => [...prev.slice(-49), uri]); // Keep last 50 messages
			}
		});

		return () => {
			firehose.close();
		};
	}, []);

	return (
		<div className="w-full max-w-2xl font-mono text-sm">
			<h2 className="mb-4 text-xl font-bold">Live Bluesky Activity</h2>
			<div className="h-[500px] overflow-y-auto rounded border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
				{messages.map((msg, i) => (
					<div key={i} className="mb-1 break-all">
						{msg}
					</div>
				))}
			</div>
		</div>
	);
}