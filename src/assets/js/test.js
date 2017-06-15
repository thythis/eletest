const BB_DATA="bdata";
export default {
	fetch() {
		return JSON.parse(window.localStorage.getItem(
            BB_DATA||"[]"))
	},
	save(items) {
		window.localStorage.setItem(BB_DATA,JSON.stringify(items))
	}
}
