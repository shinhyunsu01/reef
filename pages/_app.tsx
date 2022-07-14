import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styled from "styled-components";
import { SWRConfig } from "swr";

const Init = styled.div`
	width: 100%;
	max-width: 64rem;
	margin-left: auto;
	margin-right: auto;
`;
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
							src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
							defer
						/>
					</Head>
					<Component {...pageProps} />
				</Init>
			</SWRConfig>
		</>
	);
}

export default MyApp;
