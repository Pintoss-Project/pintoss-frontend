interface Kakao {
	init(appKey: string): void;
	isInitialized(): boolean;
	Channel: {
		addChannel(options: { channelPublicId: string }): void;
		chat(options: { channelPublicId: string }): void;
	};
}

interface Window {
	Kakao: Kakao;
}
