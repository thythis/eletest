const BB_DATA="bdata";
export default {
	fetch() {
		return JSON.parse(window.localStorage.getItem(
            BB_DATA||"[]"))
	},
	save(items) {
		window.localStorage.setItem(BB_DATA,JSON.stringify(items))
	},
	changeAge(pgblist) {
		for (var i = 0; i < pgblist.length; i++) {
				var arr = pgblist[i].synld.split('-');
				arr[0] = parseInt(arr[0]);
				arr[1] = parseInt(arr[1]);
				if(arr[0] >= 12) {
					var mon = arr[0] % 12;
					arr[0] = Math.floor(arr[0]/12);
					mon>0?arr[0]=arr[0]+"岁"+mon+"月":arr[0]=arr[0]+"岁";
				} else {
					arr[0] += "月";
				}

				if(arr[1] >= 12) {
					var mon = arr[1] % 12;
					arr[1] = Math.floor(arr[1]/12);
					mon>0?arr[1]=arr[1]+"岁"+mon+"月":arr[1]=arr[1]+"岁";
				} else {
					arr[1] += "月";
				}
				var str = arr[0] + "-" + arr[1];
				pgblist[i].agerange = str;
			}
		return pgblist;
	}
}
