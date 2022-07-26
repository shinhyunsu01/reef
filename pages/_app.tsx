import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import Router, { useRouter } from "next/router";
import { useEffect } from "react";

Router.events.on("routeChangeError", (err, url, { shallow }) => {
	console.log("Navigating to: " + "url: " + url, { cancelled: err.cancelled });
});

const Init = styled.div`
	width: 100%;
	max-width: 64rem;
	margin-left: auto;
	margin-right: auto;
	padding: 0 0.5em;
`;
const theme = {
	mobile: "768px",
};

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<SWRConfig
				value={{
					fetcher: (url: string) =>
						fetch(url).then((response) => response.json()),
				}}
			>
				<Init>
					<Head>
						<script
							src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js"
							defer
						/>
					</Head>
					<ThemeProvider theme={theme}>
						<Component {...pageProps} />
					</ThemeProvider>
				</Init>
			</SWRConfig>
		</>
	);
}

export default MyApp;
