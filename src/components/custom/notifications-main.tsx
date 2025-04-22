/** @format */

import { BellRing } from "lucide-react";
import { Button } from "../ui/button";

export default function NotificationMain() {
	return (
		<Button className="bg-amber-300 hover:bg-amber-400 dark:bg-amber-300 dark:hover:bg-amber-400 text-zinc-700">
			<BellRing /> 8
		</Button>
	);
}
