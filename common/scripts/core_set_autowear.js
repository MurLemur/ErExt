var script_set_autowear = "(" +
    (function() {

        var erExtSetAutowearClass = function(mainFraime, user, inventory, clock, chat, heroPanel) {
            this.user = user;
            this.mainFraime = mainFraime;
            this.inventory = inventory;
            this.clock = clock;
            this.chat = chat;
            this.heroPanel = heroPanel;

            this.currentSetID = null;

            this.setsSelect = null;
            this.mapsSelect = null;

            var self = this;

            this.setsMap = {}

            this.setsBuff = {
                'ovl': {
                    'setId': 0,
                    'setName': ''
                },
                'opp': {
                    'setId': 0,
                    'setName': ''
                },
                'to': {
                    'setId': 0,
                    'setName': ''
                },
                'ok': {
                    'setId': 0,
                    'setName': ''
                },
                'aliens': {
                    'setId': 0,
                    'setName': ''
                },
                'mine' : {
                    'setId': 0,
                    'setName': ''
                },
                'fogcity' : {
                    'setId': 0,
                    'setName': ''
                },
                "ctournament":  {
                    'setId': 0,
                    'setName': ''
                },
                "seatrip":  {
                    'setId': 0,
                    'setName': ''
                }
            }

            this.ilands = {
                "ovl": "Остров Весеннего Листа",
                "opp": "Остров Покинутых Песков",
                "to": "Темный остров",
                "ok": "Остров Крови",
                "aliens": "Остров Альёнов",
                "mine": "Подземный мир",
                "fogcity": "Туманный город",
                "ctournament": "Клановый турнир",
                "seatrip": "Морские путешествия"
            };

            this.init = function() {
                self.loadFromStorage();
                self.loadCurrentSetID();

                self.initShowSetsForm();
                self.initActionDeleteSet();

                self.initFrameLoadListener();
            }

            this.initFrameLoadListener = function() {
                self.mainFraime.on('load', self.frameLoaded);
            }

            this.initActionDeleteSet = function() {
                self.oldActionDeleteSet = self.inventory.actionDeleteSet;
                self.inventory.actionDeleteSet = function(data) {
                    self.oldActionDeleteSet.apply(self.inventory, [data]);

                    self.removeFromSetForSetMap(data.setId);
                }
            }

            this.initShowSetsForm = function() {
                self.oldActionSaveSet = self.heroPanel.showSetsForm

                self.heroPanel.showSetsForm = function() {
                    self.oldActionSaveSet.apply(self.heroPanel, []);

                    self.initSetSelects();
                }
            }

            this.loadFromStorage = function() {
                if (typeof localStorage['ErExtSetMaps'] != 'undefined') {
                    self.setsMap = self.mergeIslandData(self.setsBuff, JSON.parse(localStorage['ErExtSetMaps']));
                    self.setsBuff = self.mergeIslandData(self.setsBuff,JSON.parse(localStorage['ErExtSetMaps']));
                }
                else {
                    self.setsMap = JSON.parse(JSON.stringify(self.setsBuff));
                }
            }

            this.initMapsSelect = function() {
                self.mapsSelect = $('<select></select>')
                    .append(
                        '<option value="-1"></option>' +
                        '<option value="-1" selected>Выберите остров:</option>' +
                        '<option value="-1" class="line">-----------------------------</option>'
                    );

                for (var i in self.ilands) {
                    self.mapsSelect.append('<option value="' + i + '">' + self.ilands[i] + '</option>');
                }

                self.mapsSelect.on('change', function() {
                    self.mapsSelectListener();
                });
            };

            this.initSetsSelect = function() {
                self.setsSelect = $('<select></select>').append($("#selectSet").children().clone())
                    .on('change', function() {
                        self.setsSelectListener();
                    });
            }

            this.initSetSelects = function() {
                this.initMapsSelect();
                this.initSetsSelect();

                var kits = $('<div class="Kits"></div>').append(self.mapsSelect)
                    .append(' ')
                    .append(self.setsSelect);

                var saveButton = $('<a href="#" name="Save" class="btn_save_new">&nbsp;</a>').on('click', function() {
                    self.saveSetsBuff();
                });

                var mainPopup = $('#MainPopup');
                var holder = $('<div></div>').css({"overflow": "auto", "height": "100%"});
                holder.append(mainPopup.children())
                    .append('<div class="Separator"></div>' +
                        '<div class="popupTitle">Автосмена комплекта</div>' +
                        '<p class="DescriptionCenter">' +
                            'Комплект будет автоматически одеваться при переходе на остров' +
                    '   </p>')
                    .append(kits)
                    .append($('<div class="btn_Kits"></div>').append(saveButton));

                mainPopup.append(holder);
            }

            this.saveSetsBuff = function() {
                localStorage['ErExtSetMaps'] = JSON.stringify(self.setsBuff);
                self.setsMap = JSON.parse(localStorage['ErExtSetMaps']);
            }

            this.setsSelectListener = function() {
                var mapID = self.mapsSelect.val();
                var setID = self.setsSelect.val();

                if (typeof self.setsBuff[mapID] == 'undefined' || setID < 0) {
                    return;
                }

                self.setsBuff[mapID]['setId'] = setID;
                self.setsBuff[mapID]['setName'] = self.setsSelect.find('option:selected').text();
            }

            this.mapsSelectListener = function() {
                var mapID = self.mapsSelect.val();
                var setID = 0;

                if (typeof self.setsBuff[mapID] != 'undefined') {
                    setID = self.setsBuff[mapID]['setId'];
                }

                self.setsSelect.val(setID);
            }

            this.mergeIslandData = function(defaultIsland, customIslands) {
                var merged = {};

                for (i in defaultIsland) {
                    if (typeof customIslands[i] == 'undefined') {
                        merged[i] = defaultIsland[i];
                    }
                    else {
                        merged[i] = customIslands[i];
                    }
                }

                return merged;
            }

            this.removeFromSetForSetMap = function(setId) {
                for (var i in self.setsMap) {
                    if (self.setsMap[i]['setId'] == setId) {
                        self.setsMap[i]['setId'] = 0;
                        self.setsMap[i]['setName'] = '';
                    }
                }

                for (var i in self.setsBuff) {
                    if (self.setsBuff[i]['setId'] == setId) {
                        self.setsBuff[i]['setId'] = 0;
                        self.setsBuff[i]['setName'] = '';
                    }
                }

                self.setsSelect.find('option[value="' + setId + '"]').remove();
                localStorage['ErExtSetMaps'] = JSON.stringify(self.setsMap);
            }

            this.frameLoaded = function() {
                var mapID = self.detectMapID();

                if (mapID == null || !self.isSetNeedToWear(mapID)) {
                    return;
                }

                if (self.wearSet(mapID)) {
                    self.notifyAboutWearing(mapID);
                }
            }

            this.loadCurrentSetID = function() {
                if (typeof localStorage['ErExtSetCurrentSetID'] != 'undefined') {
                    self.currentSetID = localStorage['ErExtSetCurrentSetID'];
                    return;
                }

                self.currentSetID = null;
            }

            this.notifyAboutWearing = function(mapID) {
                self.chat.html(0, "1", "0", self.clock.timeStr(), "Смотритель", self.user.name,  "666666",
                    "Комплект <b>" + self.setsMap[mapID]['setName'] + "</b> надет!  :240: ");

                self.chat.scrollDown();
            }

            this.wearSet = function(mapID) {
                var setID = self.setsMap[mapID]['setId'];

                if (setID <= 0) {
                    return false;
                }

                self.inventory.actionUpSet({'setId': setID});
                self.currentSetID = setID;
                localStorage['ErExtSetCurrentSetID'] = setID;

                return true;
            }

            this.detectMapID = function() {
                var mapID = null;

                if (self.user.place2 == 8) {
                    mapID = 'ok';
                } else if (self.user.place2 == 1) {
                    mapID = 'ovl';
                } else if (self.user.place2 == 2) {
                    mapID = 'mine';
                } else if (self.user.place2 == 3) {
                    mapID = 'opp';
                } else if (self.user.place2 == 14) {
                    mapID = 'to';
                }
                else if (self.user.place2 >= 25 && self.user.place2 <= 29) {
                    mapID = 'seatrip';
                } else if (self.user.place2 >= 201 && self.user.place2 <= 340) {
                    mapID = 'aliens';
                } else if (self.user.place2 == 0) {
                    mapID = 'fogcity';
                } else if (self.user.place2 >= 125 && self.user.place2 <= 186) {
                    mapID = 'ctournament';
                }

                return mapID;
            }

            this.isSetNeedToWear = function(mapID) {
                return self.setsMap[mapID]['setId'] != self.currentSetID;
            }
        }

        new erExtSetAutowearClass($('#main'), user, inventory, clock, chat, heroPanel).init();
    }).toString() + ")();";