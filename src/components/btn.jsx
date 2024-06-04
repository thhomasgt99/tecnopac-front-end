import { useState } from "react";

export function Btn() {
	return (
		<>
			<label class="toggle">
				<input type="checkbox" />
				<span class="slider round"></span>
			</label>
		</>
	)
}