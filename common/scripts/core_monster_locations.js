var script_monster_locations = "(" +
	(function() {
			var monsters_loc = {
/*Гоблин*/"01":["11:44", "12:44", "13:44", "14:44", "15:44", "16:44", "17:44", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "11:46", "12:46", "13:46", "14:46", "15:46", "16:46", "17:46", "11:47", "12:47", "13:47", "14:47", "15:47", "16:47", "17:47", "11:48", "12:48", "13:48", "14:48", "15:48", "16:48", "17:48", "11:49", "12:49", "13:49", "14:49", "15:49", "16:49", "17:49", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50"],
/*Земляной Червяк*/"02": ["14:36", "15:36", "16:36", "17:36", "18:36", "14:37", "15:37", "16:37", "17:37", "18:37", "14:38", "15:38", "16:38", "17:38", "18:38", "9:39", "10:39", "11:39", "12:39", "14:39", "15:39", "16:39", "17:39", "18:39", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "9:41", "10:41", "11:41", "12:41", "13:41", "14:41", "15:41", "16:41", "17:41", "18:41", "9:42", "10:42", "11:42", "12:42", "13:42", "14:42", "15:42", "16:42", "17:42", "18:42", "9:43", "10:43", "11:43", "12:43", "13:43", "14:43", "15:43", "16:43", "17:43", "18:43", "9:44", "10:44", "11:44", "12:44", "13:44", "14:44", "15:44", "16:44", "17:44", "18:44", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "9:46", "10:46", "11:46", "12:46", "13:46", "14:46", "15:46", "16:46", "17:46", "18:46", "9:47", "10:47", "11:47", "12:47", "13:47", "14:47", "15:47", "16:47", "17:47", "18:47"],
/*Скелет*/"03":["13:49", "14:49", "15:49", "16:49", "17:49", "18:49", "19:49", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "13:51", "14:51", "15:51", "16:51", "17:51", "18:51", "19:51", "13:52", "14:52", "15:52", "16:52", "17:52", "18:52", "19:52", "13:53", "14:53", "15:53", "16:53", "17:53", "18:53", "19:53", "13:54", "14:54", "15:54", "16:54", "17:54", "18:54", "19:54", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55"],
/*Зомби*/"04": ["13:49", "14:49", "15:49", "16:49", "17:49", "18:49", "19:49", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "13:51", "14:51", "15:51", "16:51", "17:51", "18:51", "19:51", "13:52", "14:52", "15:52", "16:52", "17:52", "18:52", "19:52", "13:53", "14:53", "15:53", "16:53", "17:53", "18:53", "19:53", "13:54", "14:54", "15:54", "16:54", "17:54", "18:54", "19:54", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55"],
/*Сумеречный Тэнгу*/"05": ["9:39", "10:39", "11:39", "12:39", "13:39", "14:39", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "9:41", "10:41", "11:41", "12:41", "13:41", "14:41", "15:41", "9:42", "10:42", "11:42", "12:42", "13:42", "14:42", "15:42", "9:43", "10:43", "11:43", "12:43", "13:43", "14:43", "15:43", "9:44", "10:44", "11:44", "12:44", "13:44", "14:44", "15:44", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "9:46", "10:46", "11:46", "12:46", "13:46", "14:46", "15:46"],
/*Хобгоблин*/"06": ["9:46", "10:46", "11:46", "12:46", "13:46", "14:46", "15:46", "9:47", "10:47", "11:47", "12:47", "13:47", "14:47", "15:47", "9:48", "10:48", "11:48", "12:48", "13:48", "14:48", "15:48", "9:49", "10:49", "11:49", "12:49", "13:49", "14:49", "15:49", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "9:51", "10:51", "11:51", "12:51", "13:51", "14:51", "15:51", "9:52", "10:52", "11:52", "12:52", "13:52", "14:52", "15:52"],
/*Беглый Каторжник*/"07":["14:42", "15:42", "16:42", "17:42", "18:42", "19:42", "20:42", "14:43", "15:43", "16:43", "17:43", "18:43", "19:43", "20:43", "14:44", "15:44", "16:44", "17:44", "18:44", "19:44", "20:44", "14:45", "15:45", "16:45", "17:45", "18:45", "20:45", "14:46", "15:46", "16:46", "17:46", "18:46", "19:46", "20:46", "14:47", "15:47", "16:47", "17:47", "18:47", "19:47", "20:47", "14:48", "15:48", "16:48", "17:48", "18:48", "19:48", "20:48"],
/*Орк*/"08":["13:37", "14:37", "15:37", "16:37", "17:37", "18:37", "19:37", "13:38", "14:38", "15:38", "16:38", "17:38", "18:38", "19:38", "13:39", "14:39", "15:39", "16:39", "17:39", "18:39", "19:39", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "13:41", "14:41", "15:41", "16:41", "17:41", "18:41", "19:41", "13:42", "14:42", "15:42", "16:42", "17:42", "18:42", "19:42", "13:43", "14:43", "15:43", "16:43", "17:43", "18:43", "19:43"],
/*Гоблин-Мажор*/"09":["9:46", "10:46", "11:46", "12:46", "13:46", "14:46", "15:46", "9:47", "10:47", "11:47", "12:47", "13:47", "14:47", "15:47", "9:48", "10:48", "11:48", "12:48", "13:48", "14:48", "15:48", "9:49", "10:49", "11:49", "12:49", "13:49", "14:49", "15:49", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "9:51", "10:51", "11:51", "12:51", "13:51", "14:51", "15:51", "9:52", "10:52", "11:52", "12:52", "13:52", "14:52", "15:52"],
/*Скелет Онсдага*/"10":["13:52", "14:52", "15:52", "16:52", "17:52", "18:52", "19:52", "13:53", "14:53", "15:53", "16:53", "17:53", "18:53", "19:53", "13:54", "14:54", "15:54", "16:54", "17:54", "18:54", "19:54", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55", "13:56", "14:56", "15:56", "16:56", "17:56", "18:56", "19:56", "13:57", "14:57", "15:57", "16:57", "17:57", "18:57", "19:57", "13:58", "14:58", "15:58", "16:58", "17:58", "18:58", "19:58"],
/*Хоббит*/"11": ["9:51", "10:51", "11:51", "12:51", "13:51", "14:51", "15:51", "9:52", "10:52", "11:52", "12:52", "13:52", "14:52", "15:52", "9:53", "10:53", "11:53", "12:53", "13:53", "14:53", "15:53", "9:54", "10:54", "11:54", "12:54", "13:54", "14:54", "15:54", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "9:56", "10:56", "11:56", "12:56", "13:56", "14:56", "15:56", "9:57", "10:57", "11:57", "12:57", "13:57", "14:57", "15:57"],
/*Туманный Волк*/"12": ["6:43", "7:43", "8:43", "9:43", "10:43", "11:43", "12:43", "6:44", "7:44", "8:44", "9:44", "10:44", "11:44", "12:44", "6:45", "7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "6:46", "7:46", "8:46", "9:46", "10:46", "11:46", "12:46", "6:47", "7:47", "8:47", "9:47", "10:47", "11:47", "12:47", "6:48", "7:48", "8:48", "9:48", "10:48", "11:48", "12:48", "6:49", "7:49", "8:49", "9:49", "10:49", "11:49", "12:49"],
/*Огр*/"13":["9:32", "10:32", "11:32", "12:32", "13:32", "14:32", "15:32", "9:33", "10:33", "11:33", "12:33", "13:33", "14:33", "15:33", "9:34", "10:34", "11:34", "12:34", "13:34", "14:34", "15:34", "9:35", "10:35", "11:35", "12:35", "13:35", "14:35", "15:35", "9:36", "10:36", "11:36", "12:36", "13:36", "14:36", "15:36", "9:37", "10:37", "11:37", "12:37", "13:37", "14:37", "15:37", "9:38", "10:38", "11:38", "12:38", "13:38", "14:38", "15:38"],
/*Саламандра*/"14": ["7:38", "8:38", "9:38", "10:38", "11:38", "12:38", "13:38", "7:39", "8:39", "9:39", "10:39", "11:39", "12:39", "13:39", "7:40", "8:40", "9:40", "10:40", "11:40", "12:40", "13:40", "7:41", "8:41", "9:41", "10:41", "11:41", "12:41", "13:41", "7:42", "8:42", "9:42", "10:42", "11:42", "12:42", "13:42", "7:43", "8:43", "9:43", "10:43", "11:43", "12:43", "13:43", "7:44", "8:44", "9:44", "10:44", "11:44", "12:44", "13:44"],
/*Мумия*/"15":["7:34", "8:34", "9:34", "10:34", "11:34", "12:34", "13:34", "7:35", "8:35", "9:35", "10:35", "11:35", "12:35", "13:35", "7:36", "8:36", "9:36", "10:36", "11:36", "12:36", "13:36", "7:37", "8:37", "9:37", "10:37", "11:37", "12:37", "13:37", "7:38", "8:38", "9:38", "10:38", "11:38", "12:38", "13:38", "7:39", "8:39", "9:39", "10:39", "11:39", "12:39", "13:39", "7:40", "8:40", "9:40", "10:40", "11:40", "12:40"],
/*Виверна*/"16":["9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "9:56", "10:56", "11:56", "12:56", "13:56", "14:56", "15:56", "9:57", "10:57", "11:57", "12:57", "13:57", "14:57", "15:57", "9:58", "10:58", "11:58", "12:58", "13:58", "14:58", "15:58", "9:59", "10:59", "11:59", "12:59", "13:59", "14:59", "15:59", "9:60", "10:60", "11:60", "12:60", "13:60", "14:60", "15:60", "9:61", "10:61", "11:61", "12:61", "13:61", "14:61", "15:61"],
/*Гнолл-Девиант*/"17": ["8:59", "9:59", "10:59", "11:59", "12:59", "13:59", "14:59", "8:60", "9:60", "10:60", "11:60", "12:60", "13:60", "14:60", "8:61", "9:61", "10:61", "11:61", "12:61", "13:61", "14:61", "8:62", "9:62", "10:62", "11:62", "12:62", "13:62", "14:62", "8:63", "9:63", "10:63", "11:63", "12:63", "13:63", "14:63", "8:64", "9:64", "10:64", "11:64", "12:64", "13:64", "14:64", "8:65", "9:65", "10:65", "11:65", "12:65", "13:65", "14:65"],
/*Падший Чашник*/"18": ["15:53", "16:53", "17:53", "18:53", "19:53", "20:53", "21:53", "15:54", "16:54", "17:54", "18:54", "19:54", "20:54", "21:54", "15:55", "16:55", "17:55", "18:55", "19:55", "20:55", "21:55", "15:56", "16:56", "17:56", "18:56", "19:56", "20:56", "21:56", "15:57", "16:57", "17:57", "18:57", "19:57", "20:57", "21:57", "15:58", "16:58", "17:58", "18:58", "19:58", "20:58", "21:58", "15:59", "16:59", "17:59", "18:59", "19:59", "20:59", "21:59"],
/*Гобиван*/"19": ["12:32", "13:32", "14:32", "15:32", "16:32", "12:33", "13:33", "14:33", "15:33", "12:34", "13:34", "14:34", "15:34", "16:34", "12:35", "13:35", "14:35", "15:35", "12:36", "13:36", "14:36", "15:36", "16:36", "12:37", "13:37", "14:37", "15:37", "12:38", "13:38", "14:38", "15:38", "16:38"],
/*Бурый Медведь*/"20": ["14:57", "15:57", "16:57", "17:57", "18:57", "19:57", "20:57", "14:58", "15:58", "16:58", "17:58", "18:58", "19:58", "20:58", "14:59", "15:59", "16:59", "17:59", "18:59", "19:59", "20:59", "14:60", "15:60", "16:60", "17:60", "18:60", "19:60", "20:60", "14:61", "15:61", "16:61", "17:61", "18:61", "19:61", "20:61", "14:62", "15:62", "16:62", "17:62", "18:62", "19:62", "20:62", "14:63", "15:63", "16:63", "17:63", "18:63", "19:63", "20:63"],
/*Вэйми*/"21": ["6:44", "7:44", "8:44", "9:44", "10:44", "11:44", "5:45", "6:45", "7:45", "8:45", "9:45", "10:45", "11:45", "5:46", "6:46", "7:46", "8:46", "9:46", "10:46", "11:46", "5:47", "6:47", "7:47", "8:47", "9:47", "10:47", "11:47", "5:48", "6:48", "7:48", "8:48", "9:48", "10:48", "11:48", "5:49", "6:49", "7:49", "8:49", "9:49", "10:49", "11:49", "5:50", "6:50", "7:50", "8:50", "9:50", "10:50", "11:50", "5:51", "6:51", "7:51", "8:51", "9:51", "10:51", "11:51", "11:54"],
/*Гарпия*/"22": ["16:60", "17:60", "18:60", "19:60", "20:60", "21:60", "22:60", "16:61", "17:61", "18:61", "19:61", "20:61", "21:61", "22:61", "16:62", "17:62", "18:62", "19:62", "20:62", "21:62", "22:62", "16:63", "17:63", "18:63", "19:63", "20:63", "21:63", "22:63", "16:64", "17:64", "18:64", "19:64", "20:64", "21:64", "22:64", "16:65", "17:65", "18:65", "19:65", "20:65", "21:65", "22:65", "16:66", "17:66", "18:66", "19:66", "20:66", "21:66", "22:66"],
/*Тролль*/"23": ["7:28", "8:28", "9:28", "10:28", "11:28", "12:28", "13:28", "7:29", "8:29", "9:29", "10:29", "11:29", "12:29", "13:29", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "7:31", "8:31", "9:31", "10:31", "11:31", "12:31", "13:31", "7:32", "8:32", "9:32", "10:32", "11:32", "12:32", "13:32", "7:33", "8:33", "9:33", "10:33", "11:33", "12:33", "13:33", "7:34", "8:34", "9:34", "10:34", "11:34", "12:34", "13:34"],
/*Болотный Спектр*/"24": ["17:68", "18:68", "19:68", "20:68", "21:68", "22:68", "23:68", "17:69", "18:69", "19:69", "20:69", "21:69", "22:69", "23:69", "17:70", "18:70", "19:70", "20:70", "21:70", "22:70", "23:70", "17:71", "18:71", "19:71", "20:71", "21:71", "22:71", "23:71", "17:72", "18:72", "19:72", "20:72", "21:72", "22:72", "23:72", "17:73", "18:73", "19:73", "20:73", "21:73", "22:73", "23:73", "17:74", "18:74", "19:74", "20:74", "21:74", "22:74", "23:74"],
/*Воин Демонов*/"25": ["6:26", "7:26", "8:26", "9:26", "10:26", "11:26", "12:26", "6:27", "7:27", "8:27", "9:27", "10:27", "11:27", "12:27", "6:28", "7:28", "8:28", "9:28", "10:28", "11:28", "12:28", "6:29", "7:29", "8:29", "9:29", "10:29", "11:29", "12:29", "6:30", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "6:31", "7:31", "8:31", "9:31", "10:31", "11:31", "12:31", "6:32", "7:32", "8:32", "9:32", "10:32", "11:32", "12:32"], 
/*Саблезубый Тигр*/"26": ["10:67", "11:67", "12:67", "13:67", "14:67", "15:67", "16:67", "10:68", "11:68", "12:68", "13:68", "14:68", "15:68", "16:68", "10:69", "11:69", "12:69", "13:69", "14:69", "15:69", "16:69", "10:70", "11:70", "12:70", "13:70", "14:70", "15:70", "16:70", "10:71", "11:71", "12:71", "13:71", "14:71", "15:71", "16:71", "10:72", "11:72", "12:72", "13:72", "14:72", "15:72", "16:72", "10:73", "11:73", "12:73", "13:73", "14:73", "15:73", "16:73"],
/*Черная Вдова*/"27": ["10:64", "11:64", "12:64", "13:64", "14:64", "15:64", "16:64", "10:65", "11:65", "12:65", "13:65", "14:65", "15:65", "16:65", "10:66", "11:66", "12:66", "13:66", "14:66", "15:66", "16:66", "10:67", "11:67", "12:67", "13:67", "14:67", "15:67", "16:67", "10:68", "11:68", "12:68", "13:68", "14:68", "15:68", "16:68", "10:69", "11:69", "12:69", "13:69", "14:69", "15:69", "16:69", "10:70", "11:70", "12:70", "13:70", "14:70", "15:70", "16:70"], 
/*Великан*/"28": ["20:70", "21:70", "22:70", "23:70", "24:70", "25:70", "26:70", "20:71", "21:71", "22:71", "23:71", "24:71", "25:71", "26:71", "20:72", "21:72", "22:72", "23:72", "24:72", "25:72", "26:72", "20:73", "21:73", "22:73", "23:73", "24:73", "25:73", "26:73", "20:74", "21:74", "22:74", "23:74", "24:74", "25:74", "26:74", "20:75", "21:75", "22:75", "23:75", "24:75", "25:75", "26:75", "20:76", "21:76", "22:76", "23:76", "24:76", "25:76", "26:76"],
/*Гигантский Ящер*/"29": ["13:72", "14:72", "15:72", "16:72", "17:72", "18:72", "19:72", "13:73", "14:73", "15:73", "16:73", "17:73", "18:73", "19:73", "13:74", "14:74", "15:74", "16:74", "17:74", "18:74", "19:74", "13:75", "14:75", "15:75", "16:75", "17:75", "18:75", "19:75", "13:76", "14:76", "15:76", "16:76", "17:76", "18:76", "19:76", "13:77", "14:77", "15:77", "16:77", "17:77", "18:77", "19:77", "13:78", "14:78", "15:78", "16:78", "17:78", "18:78", "19:78"],
/*Ноющая Тень*/"30": ["12:79", "13:79", "14:79", "15:79", "16:79", "17:79", "18:79", "12:80", "13:80", "14:80", "15:80", "16:80", "17:80", "18:80", "12:81", "13:81", "14:81", "15:81", "16:81", "17:81", "18:81", "12:82", "13:82", "14:82", "15:82", "16:82", "17:82", "18:82", "12:83", "13:83", "14:83", "15:83", "16:83", "17:83", "18:83", "12:84", "13:84", "14:84", "15:84", "16:84", "17:84", "18:84", "12:85", "13:85", "14:85", "15:85", "16:85", "17:85", "18:85"],
/*Белый Медведь*/"31": ["15:76", "16:76", "17:76", "18:76", "19:76", "20:76", "21:76", "15:77", "16:77", "17:77", "18:77", "19:77", "20:77", "21:77", "15:78", "16:78", "17:78", "18:78", "19:78", "20:78", "21:78", "15:79", "16:79", "17:79", "18:79", "19:79", "20:79", "21:79", "15:80", "16:80", "17:80", "18:80", "19:80", "20:80", "21:80", "15:81", "16:81", "17:81", "18:81", "19:81", "20:81", "21:81", "15:82", "16:82", "17:82", "18:82", "19:82", "20:82", "21:82"],
/*Кислотный Элементаль*/"32": ["19:63", "20:63", "21:63", "22:63", "23:63", "24:63", "25:63", "19:64", "20:64", "21:64", "22:64", "23:64", "24:64", "25:64", "19:65", "20:65", "21:65", "22:65", "23:65", "24:65", "25:65", "19:66", "20:66", "21:66", "22:66", "23:66", "24:66", "25:66", "19:67", "20:67", "21:67", "22:67", "23:67", "24:67", "25:67", "19:68", "20:68", "22:68", "23:68", "24:68", "25:68", "19:69", "20:69", "21:69", "22:69", "23:69", "24:69", "25:69"],
/*Джаггернаут*/"33":["19:76", "20:76", "21:76", "22:76", "23:76", "24:76", "25:76", "18:77","19:77", "20:77", "21:77", "22:77", "23:77", "24:77", "25:77", "19:78", "20:78", "21:78", "22:78", "23:78", "24:78", "25:78","18:79", "19:79", "20:79", "21:79", "22:79", "23:79", "24:79", "25:79", "19:80", "20:80", "21:80", "22:80", "23:80", "24:80", "25:80", "19:81", "20:81", "21:81", "22:81", "23:81", "24:81", "25:81", "19:82", "20:82", "21:82", "22:82", "23:82", "24:82", "25:82", "19:83", "20:83", "21:83", "22:83", "23:83", "24:83", "25:83"],
/*Мясник Гераша*/"34": ["17:85", "18:85", "19:85", "20:85", "21:85", "22:85", "23:85", "17:86", "18:86", "19:86", "20:86", "21:86", "22:86", "23:86", "17:87", "18:87", "19:87", "20:87", "21:87", "22:87", "23:87", "17:88", "18:88", "19:88", "20:88", "21:88", "22:88", "23:88", "17:89", "18:89", "19:89", "20:89", "21:89", "22:89", "23:89", "17:90", "18:90", "19:90", "20:90", "21:90", "22:90", "23:90", "17:91", "18:91", "19:91", "20:91", "21:91", "22:91", "23:91"],
/*Ассасин*/"35":["19:146", "15:149", "16:149", "12:150", "13:150", "9:151", "11:151", "12:151", "13:151", "10:152", "11:152", "12:152", "13:152", "14:152", "11:153", "12:153", "13:153", "11:154", "12:154", "13:154", "14:154", "11:155", "12:155", "13:155", "12:156", "13:156", "9:158", "14:158", "15:158", "9:159", "13:159", "14:159", "15:159", "13:160", "14:160", "15:160", "16:160", "13:161", "14:161", "15:161", "13:162", "14:162", "15:162", "16:162", "13:163", "14:163", "15:163", "14:164", "15:164", "14:173", "17:175", "18:176", "15:177", "18:177", "18:179", "10:181", "11:181", "9:182", "10:182", "11:182", "12:182", "9:183", "10:183", "11:183", "12:183", "10:184", "11:184", "12:184", "9:185", "10:185", "11:185", "12:185", "10:186", "11:186", "12:186", "10:187", "11:187"], 
/*Тень*/"36":["12:148", "14:149", "14:150", "14:151", "18:154", "18:155", "18:156", "17:157", "19:157", "18:158", "18:159", "11:163", "10:171", "11:171", "10:172", "11:172", "12:172", "9:173", "10:173", "11:173", "12:173", "10:174", "11:174", "12:174", "13:174", "9:175", "10:175", "11:175", "12:175", "13:175", "10:176", "11:176", "12:176", "13:176", "17:176", "10:177", "11:177", "15:179", "16:179", "15:180", "16:180", "17:180", "19:180", "14:181", "15:181", "16:181", "17:181", "15:182", "16:182", "17:182", "14:183", "15:183", "16:183", "17:183", "15:184", "16:184", "17:184", "15:185", "16:185", "11:187", "12:187", "12:188", "12:189", "13:190", "17:193", "18:193", "17:194", "18:194", "19:194", "16:195", "17:195", "18:195", "19:195", "17:196", "18:196", "19:196", "16:197", "17:197", "18:197", "19:197", "17:198", "18:198", "19:198", "17:199", "18:199"],
/*Танцующая с Клинками*/"37":["13:142", "14:142", "12:143", "13:143", "14:143", "12:144", "13:144", "14:144", "15:144", "12:145", "13:145", "14:145", "12:146", "13:146", "14:146", "15:146", "12:147", "13:147", "14:147", "13:148", "14:148", "11:149", "17:152", "19:153", "8:154", "8:155", "8:157", "17:158", "12:162", "11:163", "11:164", "12:164", "13:164", "20:164", "21:164", "11:165", "12:165", "13:165", "19:165", "20:165", "21:165", "11:166", "12:166", "13:166", "14:166", "19:166", "20:166", "21:166", "22:166", "11:167", "12:167", "13:167", "19:167", "20:167", "21:167", "11:168", "12:168", "13:168", "14:168", "19:168", "20:168", "21:168", "11:169", "12:169", "13:169", "19:169", "20:169", "21:169", "12:170", "13:170", "20:170", "21:170", "13:172", "19:176", "18:177", "17:179", "7:184", "7:185", "8:186", "8:187", "15:191", "16:192", "15:193", "15:194", "16:194", "15:195"],
/*Кошмар*/"38":["11:149", "11:156", "12:156", "20:156", "10:157", "11:157", "12:157", "10:158", "11:158", "12:158", "13:158", "10:159", "11:159", "12:159", "10:160", "11:160", "12:160", "13:160", "10:161", "11:161", "12:161", "11:162", "12:162", "20:163", "21:164", "20:165", "20:166", "12:171", "13:172", "21:172", "11:176", "12:176", "10:177", "11:177", "12:177", "7:178", "10:178", "11:178", "12:178", "13:178", "10:179", "11:179", "12:179", "10:180", "11:180", "12:180", "13:180", "10:181", "11:181", "12:181", "11:182", "12:182", "18:182", "19:182", "17:183", "18:183", "19:183", "17:184", "18:184", "19:184", "20:184", "21:184", "17:185", "18:185", "19:185", "17:186", "18:186", "19:186", "20:186", "17:187", "18:187", "19:187", "18:188", "19:188", "13:189", "13:191", "14:192"],
/*Белый Маг*/"39":["12:140", "12:141", "8:142", "7:146", "7:147", "8:148", "8:150", "8:151", "9:151", "11:151", "12:152", "15:152", "8:154", "14:156", "14:157", "15:158", "14:159", "14:161", "17:161", "18:161", "17:162", "18:162", "19:162", "10:163", "16:163", "17:163", "18:163", "19:163", "11:164", "17:164", "18:164", "19:164", "17:165", "18:165", "19:165", "17:166", "18:166", "19:166", "18:167", "22:168", "18:169", "21:169", "22:170", "19:171", "21:171", "18:172", "19:172", "22:172", "16:173", "18:173", "19:173", "17:174", "18:174", "19:174", "20:174", "9:175", "12:175", "17:175", "18:175", "19:175", "17:176", "18:176", "19:176", "20:176", "8:177", "9:177", "12:177", "17:177", "18:177", "19:177", "12:178", "18:178", "19:178", "20:179", "20:180", "8:185", "9:186", "9:187", "13:187", "15:187", "10:188", "14:188", "15:188", "16:188", "17:188", "14:189", "15:189", "16:189", "17:189", "15:190", "16:190", "17:190", "14:191", "15:191", "16:191", "17:191", "15:192", "16:192", "17:192", "15:193", "16:193","16:194","16:195","17:195","18:196","15:197","17:197","16:198"],
/*Боевой Маг*/"40":["11:139", "11:143", "12:143", "8:146", "8:147", "8:148", "19:151", "20:152", "10:155", "20:155", "20:157", "12:165", "13:165", "12:166", "13:166", "14:166", "11:167", "12:167", "13:167", "14:167", "12:168", "13:168", "14:168", "18:168", "19:168", "11:169", "12:169", "13:169", "14:169", "17:169", "18:169", "19:169", "12:170", "13:170", "14:170", "17:170", "18:170", "19:170", "20:170", "12:171", "13:171", "17:171", "18:171", "19:171", "17:172", "18:172", "19:172", "20:172", "17:173", "18:173", "19:173", "9:174", "18:174", "19:174", "20:175", "21:175", "20:176", "21:176", "22:176", "19:177", "20:177", "21:177", "22:177", "20:178", "21:178", "22:178", "19:179", "20:179", "21:179", "22:179", "20:180", "21:180", "20:181", "21:181", "7:186"], 
/*Владычица*/"41":["17:143", "18:143", "17:144", "18:144", "19:144", "16:145", "17:145", "18:145", "19:145", "17:146", "18:146", "19:146", "16:147", "17:147", "19:147", "17:148", "18:148", "19:148", "17:149", "18:149", "15:152", "16:152", "14:153", "15:153", "16:153", "14:154", "15:154", "16:154", "17:154", "20:154", "14:155", "15:155", "16:155", "14:156", "15:156", "16:156", "17:156", "14:157", "15:157", "16:157", "15:158", "16:158", "16:159", "18:159", "19:159", "18:160", "19:160", "20:160", "17:161", "18:161", "19:161", "20:161", "18:162", "19:162", "20:162", "17:163", "18:163", "19:163", "20:163", "18:164", "19:164", "20:164", "18:165", "19:165", "13:173", "15:173", "16:174", "16:175", "7:176", "6:177", "16:177", "6:178", "17:178", "11:179", "12:180", "18:180", "5:181", "6:182", "6:183", "17:185", "18:186", "18:187", "19:188", "20:188", "18:189"],
/*Саммонер*/"42":["16:149", "17:149", "16:150", "17:150", "18:150", "20:150", "15:151", "16:151", "17:151", "18:151", "16:152", "17:152", "18:152", "15:153", "16:153", "17:153", "18:153", "16:154", "17:154", "18:154", "16:155", "17:155", "18:155", "17:157", "14:158", "19:159", "14:160", "15:160", "13:161", "13:162", "14:162", "12:163", "13:163", "14:163", "12:164", "13:164", "14:164", "15:164", "12:165", "13:165", "14:165", "12:166", "13:166", "14:166", "15:166", "12:167", "13:167", "14:167", "20:167", "21:167", "13:168", "14:168", "11:170", "10:172", "10:173", "13:173", "11:174", "8:175", "9:175", "8:176", "9:176", "10:176", "14:176", "7:177", "8:177", "9:177", "10:177", "8:178", "9:178", "10:178", "21:178", "7:179", "8:179", "9:179", "10:179", "8:180", "9:180", "10:180", "8:181", "9:181", "10:183", "11:184", "11:185", "11:186", "9:187", "21:196", "20:197", "20:198"],
/*Экзекутор*/"43":["12:145", "11:146", "12:146", "11:147", "9:148", "10:148", "8:149", "9:149", "10:149", "8:150", "9:150", "10:150", "11:150", "8:151", "9:151", "10:151", "8:152", "9:152", "10:152", "11:152", "8:153", "9:153", "10:153", "9:154", "10:154", "13:157", "18:168", "21:171", "11:172", "14:172", "21:173", "21:174", "8:175", "8:176", "7:177", "18:179", "8:180", "9:180", "13:180", "14:180", "7:181", "8:181", "9:181", "12:181", "13:181", "14:181", "7:182", "8:182", "9:182", "10:182", "12:182", "13:182", "14:182", "15:182", "7:183", "8:183", "9:183", "12:183", "13:183", "14:183", "7:184", "8:184", "9:184", "10:184", "12:184", "13:184", "14:184", "15:184", "7:185", "8:185", "9:185", "12:185", "13:185", "14:185", "8:186", "9:186", "13:186", "14:186", "18:190", "17:192", "19:198", "18:199", "19:199", "18:201"],
/*Звездный Странник*/"44":["15:141", "16:141", "12:142", "15:142", "16:142", "17:142", "14:143", "15:143", "16:143", "17:143", "15:144", "16:144", "17:144", "14:145", "15:145", "16:145", "17:145", "15:146", "16:146", "17:146", "15:147", "16:147", "16:150", "16:151", "17:152", "8:154", "11:154", "12:154", "20:154", "10:155", "11:155", "12:155", "10:156", "11:156", "12:156", "13:156", "10:157", "11:157", "12:157", "10:158", "11:158", "12:158", "13:158", "20:158", "10:159", "11:159", "12:159", "11:160", "12:160", "15:169", "16:169", "11:170", "15:170", "16:170", "17:170", "14:171", "15:171", "16:171", "17:171", "22:171", "15:172", "16:172", "17:172", "14:173", "15:173", "16:173", "17:173", "21:173", "15:174", "16:174", "17:174", "21:174", "14:175", "15:175", "16:175", "20:175", "15:176", "16:177", "15:178", "17:178", "14:179", "17:179", "18:180", "12:187", "16:188", "16:189", "17:190", "16:191"],
/*Берсеркер*/"45":["15:147", "21:152", "20:153", "8:154", "21:154", "19:155", "20:156", "20:157", "16:160", "17:160", "15:161", "16:161", "17:161", "15:162", "16:162", "17:162", "18:162", "15:163", "16:163", "17:163", "15:164", "16:164", "17:164", "18:164", "15:165", "16:165", "17:165", "16:166", "17:166", "22:170", "18:171", "22:173", "13:174", "14:174", "15:174", "22:174", "13:175", "14:175", "15:175", "22:175", "13:176", "14:176", "15:176", "16:176", "13:177", "14:177", "15:177", "22:177", "13:178", "14:178", "15:178", "16:178", "22:178", "6:179", "13:179", "14:179", "15:179", "14:180", "15:180", "7:185", "17:187", "19:189", "20:189", "19:190", "20:190", "21:190", "18:191", "19:191", "20:191", "21:191", "19:192", "20:192", "21:192", "18:193", "19:193", "20:193", "21:193", "19:194", "20:194", "21:194", "19:195", "20:195"],
/*Валькирия*/"46":["11:140", "8:148", "7:149", "8:150", "8:154", "8:155", "9:156", "9:157", "15:165", "16:165", "15:166", "16:166", "17:166", "14:167", "15:167", "16:167", "17:167", "15:168", "16:168", "17:168", "14:169", "15:169", "16:169", "17:169", "15:170", "16:170", "17:170", "11:171", "15:171", "16:171", "16:176", "7:180", "6:181", "7:181", "14:181", "15:181", "7:182", "8:182", "14:182", "15:182", "16:182", "6:183", "8:183", "13:183", "14:183", "15:183", "16:183", "14:184", "15:184", "16:184", "13:185", "14:185", "15:185", "16:185", "14:186", "15:186", "16:186", "14:187", "15:187", "13:188", "13:189", "14:190", "19:190", "20:190", "14:191", "18:191", "19:191", "20:191", "18:192", "19:192", "20:192", "21:192", "14:193", "18:193", "19:193", "20:193", "18:194", "19:194", "20:194", "18:195", "19:195", "20:195", "19:196", "20:196"],
/*Скорбящий*/"47":["9:139", "10:139", "9:140", "10:140", "11:140", "8:141", "9:141", "10:141", "11:141", "9:142", "10:142", "11:142", "8:143", "9:143", "10:143", "11:143", "9:144", "10:144", "11:144", "9:145", "10:145", "13:145", "14:145", "13:146", "14:146", "15:146", "12:147", "13:147", "14:147", "15:147", "18:147", "19:147", "13:148", "14:148", "15:148", "18:148", "19:148", "20:148", "12:149", "13:149", "14:149", "15:149", "17:149", "18:149", "19:149", "20:149", "13:150", "14:150", "15:150", "18:150", "19:150", "20:150", "13:151", "14:151", "17:151", "18:151", "19:151", "20:151", "9:152", "18:152", "19:152", "20:152", "9:153", "18:153", "19:153", "10:154", "15:154", "15:156", "15:157", "16:158", "18:164", "20:169", "14:171", "20:171", "20:173", "21:173", "18:181", "19:181", "20:182", "20:183", "18:189"],
/*Носферату*/"48":["12:142", "15:142", "16:142", "9:143", "10:143", "14:143", "15:143", "16:143", "9:144", "10:144", "11:144", "14:144", "15:144", "16:144", "17:144", "8:145", "9:145", "10:145", "11:145", "14:145", "15:145", "16:145", "9:146", "10:146", "11:146", "14:146", "15:146", "16:146", "17:146", "8:147", "9:147", "10:147", "11:147", "14:147", "15:147", "16:147", "9:148", "10:148", "11:148", "15:148", "16:148", "9:149", "10:149", "12:151", "13:153", "17:153", "18:153", "17:154", "18:154", "19:154", "9:155", "16:155", "17:155", "18:155", "19:155", "9:156", "17:156", "18:156", "19:156", "16:157", "17:157", "18:157", "19:157", "17:158", "18:158", "19:158", "15:159", "16:159", "17:159", "18:159", "19:159", "17:160", "19:160", "16:161", "19:161", "12:174", "7:180", "17:180", "6:181", "18:185", "17:188", "18:188", "17:189", "18:190"],
/*Свободный Гоблин*/"49":["15:193", "16:194", "15:195", "16:195", "16:196", "16:197", "17:197", "18:197", "19:197", "20:197", "21:197", "16:198", "17:198", "18:198", "19:198", "20:198", "21:198", "22:198", "16:199", "17:199", "18:199", "19:199", "20:199", "21:199", "17:200", "18:200", "19:200", "20:200", "21:200", "22:200", "16:201", "17:201", "18:201", "19:201", "20:201", "21:201", "22:201", "17:202", "18:202", "19:202", "20:202", "21:202", "22:202", "17:203", "19:203", "20:203", "21:203", "17:204", "18:204", "19:204", "20:204", "17:205", "18:205", "19:205", "18:206", "19:206", "18:207", "18:208", "19:208"],
/*Погонщик Скарабеев*/"50":["17:189", "18:189", "17:190", "18:190", "19:190", "16:191", "17:191", "18:191", "19:191", "16:192", "17:192", "18:192", "19:192", "20:192", "15:193", "16:193", "17:193", "18:193", "19:193", "20:193", "21:193", "16:194", "17:194", "18:194", "19:194", "20:194", "21:194", "22:194", "15:195", "16:195", "17:195", "18:195", "19:195", "20:195", "21:195", "22:195", "16:196", "17:196", "18:196", "19:196", "20:196", "21:196", "22:196", "23:196", "15:197", "16:197", "17:197", "18:197", "19:197", "20:197", "21:197", "22:197", "16:198", "17:198", "18:198", "19:198", "20:198", "21:198", "22:198", "23:198", "15:199", "16:199", "17:199", "19:199", "20:199", "21:199", "22:199", "16:200", "17:200", "18:200", "19:200", "20:200", "21:200", "22:200", "16:201", "17:201", "19:201", "20:201", "21:201", "22:201", "17:202", "19:202", "20:202", "21:202", "22:202", "17:203", "18:203", "19:203", "20:203", "21:203", "22:203", "17:204", "18:204", "19:204", "20:204", "21:204", "22:204", "17:205", "18:205", "19:205","17:206","18:206","19:206","20:206","17:207","18:207","19:207","18:208","19:208","18:209"],
/*ФГ-07*/"51":["10:172", "9:173", "10:173", "9:174", "10:174", "11:174", "8:175", "9:175", "10:175", "11:175", "7:176", "8:176", "9:176", "10:176", "11:176", "6:177", "7:177", "8:177", "9:177", "10:177", "11:177", "6:178", "7:178", "8:178", "9:178", "10:178", "11:178", "5:179", "6:179", "7:179", "8:179", "9:179", "10:179", "11:179", "5:180", "6:180", "7:180", "8:180", "9:180", "10:180", "11:180", "5:181", "6:181", "7:181", "8:181", "9:181", "10:181", "11:181", "5:182", "6:182", "7:182", "8:182", "9:182", "10:182", "11:182", "12:182", "5:183", "6:183", "7:183", "8:183", "9:183", "10:183", "11:183", "5:184", "6:184", "7:184", "8:184", "9:184", "10:184", "11:184", "12:184", "6:185", "8:185", "9:185", "10:185", "11:185", "6:186", "7:186", "8:186", "9:186", "10:186", "11:186", "6:187", "7:187", "8:187", "9:187", "10:187", "11:187", "7:188", "8:188", "9:188", "10:188", "11:188", "7:189", "8:189", "9:189"],
/*МВР-5М*/"52":["17:151", "20:168", "21:168", "19:169", "20:169", "21:169", "19:170", "20:170", "21:170", "18:171", "19:171", "20:171", "21:171", "22:171", "18:172", "19:172", "20:172", "21:172", "22:172", "18:173", "19:173", "20:173", "21:173", "22:173", "18:174", "19:174", "20:174", "21:174", "22:174", "18:175", "19:175", "20:175", "21:175", "22:175", "18:176", "19:176", "20:176", "21:176", "22:176", "18:177", "19:177", "20:177", "21:177", "22:177", "18:178", "19:178", "20:178", "21:178", "22:178", "18:179", "19:179", "20:179", "21:179", "22:179", "18:180", "19:180", "20:180", "21:180", "22:180", "18:181", "19:181", "20:181", "21:181", "18:182", "19:182", "20:182", "21:182", "22:182", "18:183", "19:183", "20:183", "21:183", "19:184", "20:184", "21:184", "22:184", "19:185", "20:185", "21:185", "20:186", "21:186", "22:186"],
/*Техас-73*/"53":["16:141", "14:142", "15:142", "16:142", "17:142", "13:143", "14:143", "15:143", "16:143", "17:143", "18:143", "13:144", "14:144", "15:144", "16:144", "17:144", "18:144", "19:144", "13:145", "14:145", "15:145", "16:145", "17:145", "18:145", "13:146", "14:146", "15:146", "16:146", "17:146", "18:146", "19:146", "13:147", "14:147", "15:147", "16:147", "17:147", "18:147", "14:148", "15:148", "16:148", "17:148", "18:148", "19:148", "14:149", "15:149", "16:149", "17:149", "18:149", "15:150", "16:150", "17:150", "18:150", "15:151", "16:151", "17:151","15:141","12:146"] 
 		}
		

	getSectorPosition = function(x, y) {
		Point = main.Map.globalCoordsToRelative(main.Map.getCellGlobalCoords(x, y))
		PointX = Point.x;
		PointY = Point.y;
		return 'top:' + PointY + 'px; left:' + PointX + 'px;';
	}

	draw = function() {
		var map_div = top.main.$("#mapContent");
		if (map_div && main.Map) {
			var overlay = $('<div id="overlay_monsters"></div>');

			overlay.attr('style', map_div.find('div:first').attr('style')).css({
				zIndex: '3'
			});

			$.each($(".mur_active_img"), function(key, val) {
				var id = val.src.match(/monster_(\d{2})/)[1];
				var areal = monsters_loc[id];
				for (i = 0; i < areal.length; i++) {
					sector = areal[i].match(/(\d{1,}):(\d{1,})/);
					overlay.append('<div class="point activ" style="position:absolute; ' + getSectorPosition(sector[1], sector[2]) + '"><span>' + areal[i] + '</span></div>');
				}
			});
			overlay.find('.point.activ').css({
				height: '32px',
				width: '64px',
				lineHeight: '32px',
				textAlign: 'center',
				zIndex: '10',
				fontSize: '10px',
				fontWeight: 'bold',
				opacity: '0.6',
				color: '#222',
				textShadow: '0 0 5px #eee'
			}).css('background-image', 'url(monster_fon.png)');
			if (top.main.$("#overlay_monsters").length == 0) {
				map_div.append(overlay);
			}
		}
	}

	$('#main').on('load.monstr', function() {
		if (user.place2 == 1 || user.place2 == 3) {
			if (top.main.$) {
				var map_div = top.main.$("#mapContent");
				if (map_div.attr("id") == undefined) setTimeout(
					function() {
						map_div = top.main.$("#mapContent");
						draw();
					}, 100)
				else draw();
			}
		}
	});
}).toString() + ")();";