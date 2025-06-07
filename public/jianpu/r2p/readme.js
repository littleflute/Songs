{
  "metadata": {
    "title": "小星星",
    "composer": "传统儿歌",
    "key": "1=C",
    "timeSignature": "4/4",
    "tempo": 100,
    "version": 1
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
}
/**
做一个网页测试以上数据。在手机上可以完美演示.用纯css实现

画简谱在画布上。
设计一个类 C4JpCanvas 在画布上画简谱。
网页上有一个工具条，工具条上有一个按钮，点这个按钮可以弹出一个可以移动的窗口，窗口里有一个文本框，
文本框上面有一个工具条，工具条上有N个按钮，
第1个按钮点击的时候会导入第一个数据，就是上面给的数据。
第2个按钮，点击的时候导入第二个数据，这个数据是一个两个8度的音阶，8分音符每个音。
第3个按钮，点击的时候导入第3个数据，这个数据是一个4个8度的音阶，16分音符每个音。从低音5开始。


音符下方1个横线表示8分音符，无横线为四分音符
16分音符音符下方2个横线

高8度音在音符上画点表示，低8度在音符下方画点表示。
高2个8度画2个点，低2个8度画2个点，
如果是8分音符，低8度的点画在横线的下方。

不要画5线谱。
同一行乐谱，所有的音都在同一个基线上，没有高低位置之分。

 * 
 */