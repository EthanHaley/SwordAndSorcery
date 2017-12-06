function loadPage() {
	$('body').load('/view.html');
}

function editWeapon(weaponID) {
	$('body').load('/editWeapon.html', weaponID);
}

loadPage();