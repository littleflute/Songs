// 乐谱数据
        const scoreData = [
            // test1: 
            {
                "metadata": {
                    "title": "test1",
                    "composer": "littleflute",
                    "key": "1=C",
                    "timeSignature": "4/4",
                    "tempo": 100
                },
                "measures": [
                    {
                        "index": 1,
                        "notes": [
                            {"type": "note", "pitch": 1, "octaveShift": 0, "duration": 4, "dotted": false, "lyric": "测"}, 
                        ]
                    },
                    {
                        "index": 2,
                        "notes": [
                            {"type": "note", "pitch": 2, "octaveShift": 0, "duration": 2, "dotted": false, "lyric": "测"},
                            {"type": "note", "pitch": 2, "octaveShift": 0, "duration": 2, "dotted": false, "lyric": "试"}, 
                        ]
                    },
                    {
                        "index": 3,
                        "notes": [
                            {"type": "note", "pitch": 3, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "测"},
                            {"type": "note", "pitch": 3, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "试"}, 
                            {"type": "note", "pitch": 3, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "测"},
                            {"type": "note", "pitch": 3, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "试"}, 
                        ]
                    },
                    {
                        "index": 4,
                        "notes": [
                            {"type": "note", "pitch": 1, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": "测"},
                            {"type": "note", "pitch": 2, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": "试"}, 
                            {"type": "note", "pitch": 3, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": "测"},
                            {"type": "note", "pitch": 4, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": "试"}, 
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": "测"},
                            {"type": "note", "pitch": 6, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": "试"}, 
                            {"type": "note", "pitch": 7, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": "测"},
                            {"type": "note", "pitch": 1, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": "试"}, 
                        ]
                    },
                    {
                        "index": 5,
                        "notes": [
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": "16"},
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": "分"},
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": "音"},
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": "符"},
                        ]
                    }
                ]
            },
            
            // 数据1: 小星星
            {
                "metadata": {
                    "title": "小星星",
                    "composer": "传统儿歌",
                    "key": "1=C",
                    "timeSignature": "4/4",
                    "tempo": 100
                },
                "measures": [
                    {
                        "index": 1,
                        "notes": [
                            {"type": "note", "pitch": 1, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "一"},
                            {"type": "note", "pitch": 1, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "闪"},
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "一"},
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "闪"}
                        ]
                    },
                    {
                        "index": 2,
                        "notes": [
                            {"type": "note", "pitch": 6, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "亮"},
                            {"type": "note", "pitch": 6, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "晶"},
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 2, "dotted": false, "lyric": "晶"}
                        ]
                    },
                    {
                        "index": 3,
                        "notes": [
                            {"type": "note", "pitch": 4, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "满"},
                            {"type": "note", "pitch": 4, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "天"},
                            {"type": "note", "pitch": 3, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "都"},
                            {"type": "note", "pitch": 3, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "是"}
                        ]
                    },
                    {
                        "index": 4,
                        "notes": [
                            {"type": "note", "pitch": 2, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "小"},
                            {"type": "note", "pitch": 2, "octaveShift": 0, "duration": 1, "dotted": false, "lyric": "星"},
                            {"type": "note", "pitch": 1, "octaveShift": 0, "duration": 2, "dotted": false, "lyric": "星"}
                        ]
                    }
                ]
            },

            // 数据2: 两个8度的音阶，8分音符每个音
            {
                "metadata": {
                    "title": "两八度音阶",
                    "composer": "示例",
                    "key": "1=C",
                    "timeSignature": "4/4",
                    "tempo": 120
                },
                "measures": [
                    {
                        "index": 1,
                        "notes": [
                            {"type": "note", "pitch": 1, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 7, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""}
                        ]
                    },
                    {
                        "index": 2,
                        "notes": [
                            {"type": "note", "pitch": 7, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": 0, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": 0, "duration": 2, "dotted": false, "lyric": ""}
                        ]
                    },
                    {
                        "index": 3,
                        "notes": [
                            {"type": "note", "pitch": 1, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 7, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": 2, "duration": 0.5, "dotted": false, "lyric": ""}
                        ]
                    },
                    {
                        "index": 4,
                        "notes": [
                            {"type": "note", "pitch": 7, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": 1, "duration": 0.5, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": 1, "duration": 2, "dotted": false, "lyric": ""}
                        ]
                    }
                ]
            },
            // 数据3: 四个8度的音阶，16分音符每个音，从低音5开始
            {
                "metadata": {
                    "title": "四八度音阶",
                    "composer": "示例",
                    "key": "1=C",
                    "timeSignature": "4/4",
                    "tempo": 140
                },
                "measures": [
                    {
                        "index": 1,
                        "notes": [
                            {"type": "note", "pitch": 5, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 7, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 7, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""}
                        ]
                    },
                    {
                        "index": 2,
                        "notes": [
                            {"type": "note", "pitch": 7, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 7, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": 3, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 7, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": 2, "duration": 0.25, "dotted": false, "lyric": ""}
                        ]
                    },
                    {
                        "index": 3,
                        "notes": [
                            {"type": "note", "pitch": 7, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": 1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 7, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": 0, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 7, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""}
                        ]
                    },
                    {
                        "index": 4,
                        "notes": [
                            {"type": "note", "pitch": 5, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 1, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 3, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 6, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 4, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 2, "octaveShift": -1, "duration": 0.25, "dotted": false, "lyric": ""},
                            {"type": "note", "pitch": 5, "octaveShift": -1, "duration": 1, "dotted": false, "lyric": ""}
                        ]
                    }
                ]
            }
        ];
