export const contentDisplay = (htmlContent: string) => {
	return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
