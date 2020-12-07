export default {
	id: '1',
	users: [{
		id: 'u1',
		name: 'Pentti',
		imageUri: 'https://scontent.fkiv3-1.fna.fbcdn.net/v/t31.0-1/s200x200/22256588_1932617800312085_5686197942193420542_o.jpg?_nc_cat=110&_nc_sid=7206a8&_nc_eui2=AeF3UwtnAs3QLEJRnLSp4-hQxlokCBJZ6JPGWiQIElnok9HafHyjqv9D4bW9zeNFfNJlg5jLsvbewM7j5OD-OFy-&_nc_ohc=IxycgYSpqQEAX8EcTqI&_nc_ht=scontent.fkiv3-1.fna&tp=7&oh=640a83293bb75378958d22b633302f1b&oe=5F9F4BB7',
	}, {
		id: 'u2',
		name: 'Heikki',
		imageUri: 'https://scontent.fkiv3-1.fna.fbcdn.net/v/t1.0-1/p200x200/107443858_3074598385966770_1929559809312242379_n.jpg?_nc_cat=107&_nc_sid=7206a8&_nc_eui2=AeGly5fZLQUfAKei_EiACEq5Dfw2T_M-BQMN_DZP8z4FA_aLEVK_8e0dKvl_5vxVO0Zn-4OPzQ9pKS0c0XeXd898&_nc_ohc=z1ydC_UL4KsAX_tfrbv&_nc_oc=AQknywM4y1IAQaQZaZkPdtkUmaem060LXSByeTx3pdQXWfxW2_tdzfgRsQIXQK_zV94&_nc_ht=scontent.fkiv3-1.fna&tp=6&oh=69508c88f073f64f432fc1f1ab9299e8&oe=5F9C5FD5',
	}],
	messages: [{
		id: 'm1',
		content: 'Actually I am! It will be a chat app',
		createdAt: '2020-12-01T12:48:00.000Z',
		user: {
			id: 'u1',
			name: 'Pentti',
		},
	}, {
		id: 'm3',
		content: 'Not really... are you building one?',
		createdAt: '2020-12-01T14:49:40.000Z',
		user: {
			id: 'u2',
			name: 'Heikki',
		},
	}, {
		id: 'm4',
		content: 'Do you know anything about building mobile apps?',
		createdAt: '2020-12-01T14:50:00.000Z',
		user: {
			id: 'u1',
			name: 'Pentti',
		},
	}, {
		id: 'm5',
		content: 'I`m very good!',
		createdAt: '2020-12-01T14:51:00.000Z',
		user: {
			id: 'u1',
			name: 'Pentti',
		},
	}, {
		id: 'm6',
		content: 'Hi Pentti! How are you?',
		createdAt: '2020-12-01T14:49:00.000Z',
		user: {
			id: 'u2',
			name: 'Heikki',
		},
	}, {
		id: 'm7',
		content: 'Hi!',
		createdAt: '2020-12-01T14:53:00.000Z',
		user: {
			id: 'u1',
			name: 'Pentti',
		},
	}]
}