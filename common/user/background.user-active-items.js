var userStaff = new userActiveItems('http://rock-citadel.ru/ratings/items.php', messagingEnum);
//var userStaff = new userActiveItems('http://188.226.128.79/items.php', messagingEnum);
kango.addMessageListener(messagingEnum.userItemsBackground, function(event) {
	userStaff.getItems(event.data.userName, event.data.hash);
});
