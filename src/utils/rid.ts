// 分区数据
export const ridList = [
  {
    label: '全部分区', // 没有全部分区，此处需要判断
    code: 'bilibili',
    isRank: true,
    rid: 0
  },
  {
    label: '动画',
    code: 'douga',
    isRank: true,
    rid: 1
  },
  {
    label: '番剧',
    code: 'anime',
    isRank: false,
    rid: 13
  },
  {
    label: '国创',
    code: 'guochuang',
    isRank: false,
    rid:167
  },
  {
    label: '音乐',
    code: 'music',
    isRank: true,
    rid: 3
  },
  {
    label: '舞蹈',
    code: 'dance',
    isRank: true,
    rid: 129
  },
  {
    label: '游戏',
    code: 'game',
    isRank: true,
    rid: 4
  },
  {
    label: '知识',
    code: 'knowledge',
    isRank: true,
    rid: 36
  },
  {
    label: '科技',
    code: 'tech',
    isRank: true,
    rid: 188
  },
  {
    label: '运动',
    code: 'sports',
    isRank: true,
    rid: 234
  },
  {
    label: '汽车',
    code: 'car',
    isRank: true,
    rid: 223
  },
  {
    label: '生活',
    code: 'life',
    isRank: true,
    rid: 160
  },
  {
    label: '美食',
    code: 'food',
    isRank: true,
    rid: 211
  },
  {
    label: '动物圈',
    code: 'animal',
    isRank: true,
    rid: 217
  },
  {
    label: '鬼畜',
    code: 'kichiku',
    isRank: true,
    rid: 119
  },
  {
    label: '时尚',
    code: 'fashion',
    isRank: true,
    rid: 155
  },
  {
    label: '资讯', // 注：该分区无排名功能
    code: 'information',
    isRank: false,
    rid: 202
  },
  {
    label: '娱乐',
    code: 'ent',
    isRank: true,
    rid: 5
  },
  {
    label: '影视',
    code: 'cinephile',
    isRank: true,
    rid: 181
  },
  {
    label: '纪录片',
    code: 'documentary',
    isRank: true,
    rid: 177
  },
  {
    label: '电影',
    code: 'movie',
    isRank: true,
    rid: 23
  },
  {
    label: '电视剧',
    code: 'tv',
    isRank: true,
    rid: 11
  }
]

// 子分区
export const ridChild = {
  douga: [
    {
      label: "动画",
      code: "douga",
      rid: 1
    },
    {
      label: "MAD·AMV",
      code: "mad",
      rid: 24
    },
    {
      label: "MMD·3D",
      code: "mmd",
      rid: 25
    },
    {
      label: "短片·手书·配音",
      code: "voice",
      rid: 47
    },
    {
      label: "手办·模玩",
      code: "garage_kit",
      rid: 210
    },
    {
      label: "特摄",
      code: "tokusatsu",
      rid: 86
    },
    {
      label: "综合",
      code: "other",
      rid: 27
    }
  ],
  anime: [
    {
      label: "番剧",
      code: "anime",
      rid: 13
    },
    {
      label: "连载动画",
      code: "serial",
      rid: 33
    },
    {
      label: "完结动画",
      code: "finish",
      rid: 32
    },
    {
      label: "资讯",
      code: "information",
      rid: 51
    },
    {
      label: "官方延伸",
      code: "offical",
      rid: 152
    }
  ],
  guochuang: [
    {
      label: "国创",
      code: "guochuang",
      rid: 167
    },
    {
      label: "国产动画",
      code: "chinese",
      rid: 153
    },
    {
      label: "国产原创相关",
      code: "original",
      rid: 168
    },
    {
      label: "布袋戏",
      code: "puppetry",
      rid: 169
    },
    {
      label: "动态漫·广播剧",
      code: "motioncomic",
      rid: 195
    },
    {
      label: "资讯",
      code: "information",
      rid: 170
    }
  ],
  music: [
    {
      label: "音乐",
      code: "music",
      rid: 3
    },
    {
      label: "原创音乐",
      code: "original",
      rid: 28
    },
    {
      label: "翻唱",
      code: "cover",
      rid: 31
    },
    {
      label: "VOCALOID·UTAU",
      code: "vocaloid",
      rid: 30
    },
    {
      label: "电音",
      code: "electronic",
      rid: 194
    },
    {
      label: "演奏",
      code: "perform",
      rid: 59
    },
    {
      label: "MV",
      code: "mv",
      rid: 193
    },
    {
      label: "音乐现场",
      code: "live",
      rid: 29
    },
    {
      label: "音乐综合",
      code: "other",
      rid: 130
    }
  ],
  dance: [
    {
      label: "舞蹈",
      code: "dance",
      rid: 129
    },
    {
      label: "宅舞",
      code: "otaku",
      rid: 20
    },
    {
      label: "街舞",
      code: "hiphop",
      rid: 198
    },
    {
      label: "明星舞蹈",
      code: "star",
      rid: 199
    },
    {
      label: "中国舞",
      code: "china",
      rid: 200
    },
    {
      label: "舞蹈综合",
      code: "three_d",
      rid: 154
    },
    {
      label: "舞蹈教程",
      code: "demo",
      rid: 146
    }
  ],
  game: [
    {
      label: "游戏",
      code: "game",
      rid: 4
    },
    {
      label: "单机游戏",
      code: "stand_alone",
      rid: 17
    },
    {
      label: "电子竞技",
      code: "esports",
      rid: 171
    },
    {
      label: "手机游戏",
      code: "mobile",
      rid: 172
    },
    {
      label: "网络游戏",
      code: "online",
      rid: 65
    },
    {
      label: "桌游棋牌",
      code: "board",
      rid: 173
    },
    {
      label: "GMV",
      code: "gmv",
      rid: 121
    },
    {
      label: "音游",
      code: "music",
      rid: 136
    },
    {
      label: "Mugen",
      code: "mugen",
      rid: 19
    }
  ],
  knowledge: [
    {
      label: "知识",
      code: "knowledge",
      rid: 36
    },
    {
      label: "科学科普",
      code: "science",
      rid: 201
    },
    {
      label: "社科·法律·心理",
      code: "social_science",
      rid: 124
    },
    {
      label: "人文历史",
      code: "humanity_history",
      rid: 228
    },
    {
      label: "财经商业",
      code: "business",
      rid: 207
    },
    {
      label: "校园学习",
      code: "campus",
      rid: 208
    },
    {
      label: "职业职场",
      code: "career",
      rid: 209
    },
    {
      label: "设计·创意",
      code: "design",
      rid: 229
    },
    {
      label: "野生技术协会",
      code: "skill",
      rid: 122
    }
  ],
  tech: [
    {
      label: "科技",
      code: "tech",
      rid: 188
    },
    {
      label: "数码",
      code: "digital",
      rid: 95
    },
    {
      label: "软件应用",
      code: "application",
      rid: 230
    },
    {
      label: "计算机技术",
      code: "computer_tech",
      rid: 231
    },
    {
      label: "工业·工程·机械",
      code: "industry",
      rid: 232
    },
    {
      label: "极客DIY",
      code: "diy",
      rid: 233
    }
  ],
  sports: [
    {
      label: "运动",
      code: "sports",
      rid: 234
    },
    {
      label: "篮球·足球",
      code: "basketballfootball",
      rid: 235
    },
    {
      label: "健身",
      code: "aerobics",
      rid: 164
    },
    {
      label: "竞技体育",
      code: "athletic",
      rid: 236
    },
    {
      label: "运动文化",
      code: "culture",
      rid: 237
    },
    {
      label: "运动综合",
      code: "comprehensive",
      rid: 238
    }
  ],
  car: [
    {
      label: "汽车",
      code: "car",
      rid: 223
    },
    {
      label: "汽车生活",
      code: "life",
      rid: 176
    },
    {
      label: "汽车文化",
      code: "culture",
      rid: 224
    },
    {
      label: "汽车极客",
      code: "geek",
      rid: 225
    },
    {
      label: "智能出行",
      code: "smart",
      rid: 226
    },
    {
      label: "购车攻略",
      code: "strategy",
      rid: 227
    }
  ],
  life: [
    {
      label: "生活",
      code: "life",
      rid: 160
    },
    {
      label: "搞笑",
      code: "funny",
      rid: 138
    },
    {
      label: "家居房产",
      code: "home",
      rid: 239
    },
    {
      label: "手工",
      code: "handmake",
      rid: 161
    },
    {
      label: "绘画",
      code: "painting",
      rid: 162
    },
    {
      label: "日常",
      code: "daily",
      rid: 21
    }
  ],
  food: [
    {
      label: "美食",
      code: "生活",
      rid: 211
    },
    {
      label: "美食制作",
      code: "make",
      rid: 76
    },
    {
      label: "美食侦探",
      code: "detective",
      rid: 212
    },
    {
      label: "美食测评",
      code: "measurement",
      rid: 213
    },
    {
      label: "田园美食",
      code: "rural",
      rid: 214
    },
    {
      label: "美食记录",
      code: "record",
      rid: 215
    }
  ],
  animal: [
    {
      label: "动物圈",
      code: "animal",
      rid: 217
    },
    {
      label: "喵星人",
      code: "cat",
      rid: 218
    },
    {
      label: "汪星人",
      code: "dog",
      rid: 219
    },
    {
      label: "大熊猫",
      code: "panda",
      rid: 220
    },
    {
      label: "野生动物",
      code: "wild_animal",
      rid: 221
    },
    {
      label: "爬宠",
      code: "reptiles",
      rid: 222
    },
    {
      label: "动物综合",
      code: "animal_composite",
      rid: 75
    }
  ],
  kichiku: [
    {
      label: "鬼畜",
      code: "kichiku",
      rid: 119
    },
    {
      label: "鬼畜调教",
      code: "guide",
      rid: 22
    },
    {
      label: "音MAD",
      code: "mad",
      rid: 26
    },
    {
      label: "人力VOCALOID",
      code: "manual_vocaloid",
      rid: 126
    },
    {
      label: "鬼畜剧场",
      code: "theatre",
      rid: 216
    },
    {
      label: "教程演示",
      code: "course",
      rid: 127
    }
  ],
  fashion: [
    {
      label: "时尚",
      code: "fashion",
      rid: 155
    },
    {
      label: "美妆",
      code: "makeup",
      rid: 157
    },
    {
      label: "服饰",
      code: "clothing",
      rid: 158
    },
    {
      label: "T台",
      code: "catwalk",
      rid: 159
    },
    {
      label: "风尚标",
      code: "trends",
      rid: 192
    }
  ],
  information: [
    {
      label: "资讯",
      code: "information",
      rid: 202
    },
    {
      label: "热点",
      code: "hotspot",
      rid: 203
    },
    {
      label: "环球",
      code: "global",
      rid: 204
    },
    {
      label: "社会",
      code: "social",
      rid: 205
    },
    {
      label: "综合",
      code: "multiple",
      rid: 206
    }
  ],
  ent: [
    {
      label: "娱乐",
      code: "ent",
      rid: 5
    },
    {
      label: "综艺",
      code: "variety",
      rid: 71
    },
    {
      label: "明星",
      code: "star",
      rid: 137
    }
  ],
  cinephile: [
    {
      label: "影视",
      code: "cinephile",
      rid: 181
    },
    {
      label: "影视杂谈",
      code: "cinecism",
      rid: 182
    },
    {
      label: "影视剪辑",
      code: "montage",
      rid: 183
    },
    {
      label: "短片",
      code: "shortfilm",
      rid: 85
    },
    {
      label: "预告·资讯",
      code: "trailer_info",
      rid: 184
    }
  ],
  documentary: [
    {
      label: "纪录片",
      code: "documentary",
      rid: 177
    },
    {
      label: "人文·历史",
      code: "history",
      rid: 37
    },
    {
      label: "科学·探索·自然",
      code: "science",
      rid: 178
    },
    {
      label: "军事",
      code: "military",
      rid: 179
    },
    {
      label: "社会·美食·旅行",
      code: "travel",
      rid: 180
    }
  ],
  movie: [
    {
      label: "电影",
      code: "movie",
      rid: 23
    },
    {
      label: "华语电影",
      code: "chinese",
      rid: 147
    },
    {
      label: "欧美电影",
      code: "west",
      rid: 145
    },
    {
      label: "日本电影",
      code: "japan",
      rid: 146
    },
    {
      label: "其他国家",
      code: "movie",
      rid: 83
    }
  ],
  tv: [
    {
      label: "电视剧",
      code: "tv",
      rid: 11
    },
    {
      label: "国产剧",
      code: "mainland",
      rid: 185
    },
    {
      label: "海外剧",
      code: "overseas",
      rid: 187
    }
  ]
}