ad_container_top = document.getElementById('ad_container_top')
ad_container_bottom  = document.getElementById('ad_container_bottom')


// Redirect to https
// if (window.location.href.startsWith("http://"))
//	window.location.replace(window.location.href.replace("http://", "https://"))

if (window.location.hostname == 'snugglethemonsters.com') {
	ad_container_top.innerHTML = `
<iframe
	src="https://viewm.moonicorn.network/#%7B%22options%22%3A%7B%22publisherAddr%22%3A%220x4E52fdC71D360F4c6494267687aECc7Ea39bca03%22%2C%22whitelistedTokens%22%3A%5B%220x6B175474E89094C44Da98b954EedeAC495271d0F%22%5D%2C%22whitelistedType%22%3A%22legacy_728x90%22%2C%22randomize%22%3Atrue%2C%22targeting%22%3A%5B%5D%2C%22width%22%3A%22728%22%2C%22height%22%3A%2290%22%2C%22minPerImpression%22%3A%220%22%2C%22fallbackUnit%22%3Anull%2C%22marketSlot%22%3A%22QmZxA5hdvqPTLVWHgAN49D8v4xLXBaiKBAy36KDDyPiyrf%22%7D%7D"
	width="728"
	height="90"
	scrolling="no"
	frameborder="0"
	style="border: 0;"
	onload="window.addEventListener('message', function(ev) { 
		if (ev.data.hasOwnProperty('adexHeight') && ('https://viewm.moonicorn.network' === ev.origin)) {
			for (let f of document.getElementsByTagName('iframe')) {
				if (f.contentWindow === ev.source) {
					f.height = ev.data.adexHeight;
				}
			}	
		}
	}, false)"
></iframe>
`

	ad_container_bottom.innerHTML = `
<iframe
	src="https://viewm.moonicorn.network/#%7B%22options%22%3A%7B%22publisherAddr%22%3A%220x4E52fdC71D360F4c6494267687aECc7Ea39bca03%22%2C%22whitelistedTokens%22%3A%5B%220x6B175474E89094C44Da98b954EedeAC495271d0F%22%5D%2C%22whitelistedType%22%3A%22legacy_468x60%22%2C%22randomize%22%3Atrue%2C%22targeting%22%3A%5B%5D%2C%22width%22%3A%22468%22%2C%22height%22%3A%2260%22%2C%22minPerImpression%22%3A%220%22%2C%22fallbackUnit%22%3Anull%2C%22marketSlot%22%3A%22Qmew2zBKrXt4k1jDHAos6BCsDYDgRDUPFTngRbBwjK1P3B%22%7D%7D"
	width="468"
	height="60"
	scrolling="no"
	frameborder="0"
	style="border: 0;"
	onload="window.addEventListener('message', function(ev) { 
		if (ev.data.hasOwnProperty('adexHeight') && ('https://viewm.moonicorn.network' === ev.origin)) {
			for (let f of document.getElementsByTagName('iframe')) {	
				if (f.contentWindow === ev.source) {
					f.height = ev.data.adexHeight;
				}
			}	
		}
	}, false)"
></iframe>
`
} else if (window.location.hostname == 'www.snugglethemonsters.com') {
	ad_container_top.innerHTML = `
<iframe
	src="https://viewm.moonicorn.network/#%7B%22options%22%3A%7B%22publisherAddr%22%3A%220x4E52fdC71D360F4c6494267687aECc7Ea39bca03%22%2C%22whitelistedTokens%22%3A%5B%220x6B175474E89094C44Da98b954EedeAC495271d0F%22%5D%2C%22whitelistedType%22%3A%22legacy_728x90%22%2C%22randomize%22%3Atrue%2C%22targeting%22%3A%5B%5D%2C%22width%22%3A%22728%22%2C%22height%22%3A%2290%22%2C%22minPerImpression%22%3A%220%22%2C%22fallbackUnit%22%3Anull%2C%22marketSlot%22%3A%22QmQU3vhbJQ9D1zxqjuNSu6kq1zYj89RwcEgjRoTNW14Lx1%22%7D%7D"
	width="728"
	height="90"
	scrolling="no"
	frameborder="0"
	style="border: 0;"
	onload="window.addEventListener('message', function(ev) { 
		if (ev.data.hasOwnProperty('adexHeight') && ('https://viewm.moonicorn.network' === ev.origin)) {
			for (let f of document.getElementsByTagName('iframe')) {	
				if (f.contentWindow === ev.source) {
					f.height = ev.data.adexHeight;
				}
			}	
		}
	}, false)"
></iframe>
`

	ad_container_bottom.innerHTML = `
<iframe
	src="https://viewm.moonicorn.network/#%7B%22options%22%3A%7B%22publisherAddr%22%3A%220x4E52fdC71D360F4c6494267687aECc7Ea39bca03%22%2C%22whitelistedTokens%22%3A%5B%220x6B175474E89094C44Da98b954EedeAC495271d0F%22%5D%2C%22whitelistedType%22%3A%22legacy_468x60%22%2C%22randomize%22%3Atrue%2C%22targeting%22%3A%5B%5D%2C%22width%22%3A%22468%22%2C%22height%22%3A%2260%22%2C%22minPerImpression%22%3A%220%22%2C%22fallbackUnit%22%3Anull%2C%22marketSlot%22%3A%22QmRAWRDG3rc2ig14v6K8kEsV8aFqk9SMtzbqtXzAkPErRX%22%7D%7D"
	width="468"
	height="60"
	scrolling="no"
	frameborder="0"
	style="border: 0;"
	onload="window.addEventListener('message', function(ev) { 
		if (ev.data.hasOwnProperty('adexHeight') && ('https://viewm.moonicorn.network' === ev.origin)) {
			for (let f of document.getElementsByTagName('iframe')) {	
				if (f.contentWindow === ev.source) {
					f.height = ev.data.adexHeight;
				}
			}	
		}
	}, false)"
></iframe>
`
} else if (window.location.hostname == 'snuggle-the-monsters.com') {
	ad_container_top.innerHTML = `
<iframe
	src="https://viewm.moonicorn.network/#%7B%22options%22%3A%7B%22publisherAddr%22%3A%220x4E52fdC71D360F4c6494267687aECc7Ea39bca03%22%2C%22whitelistedTokens%22%3A%5B%220x6B175474E89094C44Da98b954EedeAC495271d0F%22%5D%2C%22whitelistedType%22%3A%22legacy_728x90%22%2C%22randomize%22%3Atrue%2C%22targeting%22%3A%5B%5D%2C%22width%22%3A%22728%22%2C%22height%22%3A%2290%22%2C%22minPerImpression%22%3A%220%22%2C%22fallbackUnit%22%3Anull%2C%22marketSlot%22%3A%22QmSApnG2T89bZzzWTjzrTZpM8Fyb3zZMJPiKRuPDedLPQ1%22%7D%7D"
	width="728"
	height="90"
	scrolling="no"
	frameborder="0"
	style="border: 0;"
	onload="window.addEventListener('message', function(ev) { 
		if (ev.data.hasOwnProperty('adexHeight') && ('https://viewm.moonicorn.network' === ev.origin)) {
			for (let f of document.getElementsByTagName('iframe')) {	
				if (f.contentWindow === ev.source) {
					f.height = ev.data.adexHeight;
				}
			}	
		}
	}, false)"
></iframe>
`

	ad_container_bottom.innerHTML = `
<iframe
	src="https://viewm.moonicorn.network/#%7B%22options%22%3A%7B%22publisherAddr%22%3A%220x4E52fdC71D360F4c6494267687aECc7Ea39bca03%22%2C%22whitelistedTokens%22%3A%5B%220x6B175474E89094C44Da98b954EedeAC495271d0F%22%5D%2C%22whitelistedType%22%3A%22legacy_468x60%22%2C%22randomize%22%3Atrue%2C%22targeting%22%3A%5B%5D%2C%22width%22%3A%22468%22%2C%22height%22%3A%2260%22%2C%22minPerImpression%22%3A%220%22%2C%22fallbackUnit%22%3Anull%2C%22marketSlot%22%3A%22QmeEN1SDyhTdTXCk31mKEnPHZrqYb4pfhWuSK5xkdXtTgC%22%7D%7D"
	width="468"
	height="60"
	scrolling="no"
	frameborder="0"
	style="border: 0;"
	onload="window.addEventListener('message', function(ev) { 
		if (ev.data.hasOwnProperty('adexHeight') && ('https://viewm.moonicorn.network' === ev.origin)) {
			for (let f of document.getElementsByTagName('iframe')) {	
				if (f.contentWindow === ev.source) {
					f.height = ev.data.adexHeight;
				}
			}	
		}
	}, false)"
></iframe>
`
} else if (window.location.hostname == 'www.snuggle-the-monsters.com') {
	ad_container_top.innerHTML = `
<iframe
	src="https://viewm.moonicorn.network/#%7B%22options%22%3A%7B%22publisherAddr%22%3A%220x4E52fdC71D360F4c6494267687aECc7Ea39bca03%22%2C%22whitelistedTokens%22%3A%5B%220x6B175474E89094C44Da98b954EedeAC495271d0F%22%5D%2C%22whitelistedType%22%3A%22legacy_728x90%22%2C%22randomize%22%3Atrue%2C%22targeting%22%3A%5B%5D%2C%22width%22%3A%22728%22%2C%22height%22%3A%2290%22%2C%22minPerImpression%22%3A%220%22%2C%22fallbackUnit%22%3Anull%2C%22marketSlot%22%3A%22QmQUSUKirYR7EJYPGKUGAQGFXJyJAqBnNJY85cZZf9H4BS%22%7D%7D"
	width="728"
	height="90"
	scrolling="no"
	frameborder="0"
	style="border: 0;"
	onload="window.addEventListener('message', function(ev) { 
		if (ev.data.hasOwnProperty('adexHeight') && ('https://viewm.moonicorn.network' === ev.origin)) {
			for (let f of document.getElementsByTagName('iframe')) {	
				if (f.contentWindow === ev.source) {
					f.height = ev.data.adexHeight;
				}
			}	
		}
	}, false)"
></iframe>
`

	ad_container_bottom.innerHTML = `
<iframe
	src="https://viewm.moonicorn.network/#%7B%22options%22%3A%7B%22publisherAddr%22%3A%220x4E52fdC71D360F4c6494267687aECc7Ea39bca03%22%2C%22whitelistedTokens%22%3A%5B%220x6B175474E89094C44Da98b954EedeAC495271d0F%22%5D%2C%22whitelistedType%22%3A%22legacy_468x60%22%2C%22randomize%22%3Atrue%2C%22targeting%22%3A%5B%5D%2C%22width%22%3A%22468%22%2C%22height%22%3A%2260%22%2C%22minPerImpression%22%3A%220%22%2C%22fallbackUnit%22%3Anull%2C%22marketSlot%22%3A%22QmXKwQwo5pihuJJSABu6SEHqjjFhGH8yEEvUp7Tp9AcFEw%22%7D%7D"
	width="468"
	height="60"
	scrolling="no"
	frameborder="0"
	style="border: 0;"
	onload="window.addEventListener('message', function(ev) { 
		if (ev.data.hasOwnProperty('adexHeight') && ('https://viewm.moonicorn.network' === ev.origin)) {
			for (let f of document.getElementsByTagName('iframe')) {	
				if (f.contentWindow === ev.source) {
					f.height = ev.data.adexHeight;
				}
			}	
		}
	}, false)"
></iframe>
`
}