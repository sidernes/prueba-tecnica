/** @format */

declare module "react-qr-scanner" {
	import * as React from "react";

	// Definimos el tipo para los datos escaneados (pueden ser nulos)
	export type QrScanData = {
		text: string;
	} | null;

	export interface QrReaderProps {
		delay?: number | false;
		onError?: (error: Error) => void;
		onScan?: (data: QrScanData) => void;
		facingMode?: "user" | "environment";
		style?: React.CSSProperties;
		className?: string;
		constraints?: MediaStreamConstraints;
		chooseDeviceId?: (devices: MediaDeviceInfo[]) => string | Promise<string>;
		legacyMode?: boolean;
		maxImageSize?: number;
		onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
		resolution?: number;
		showViewFinder?: boolean;
	}

	// Definimos el componente como un Functional Component con props tipadas
	const QrReader: React.FC<QrReaderProps>;

	export default QrReader;
}
